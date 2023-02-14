import db from "../config/db";
export const fetchHomepageStats = (success: (result:any)=>void) => {
	const queryString = `SELECT COUNT(amount) as  contract_amount from contract WHERE amount = '0.00'; 
   SELECT COUNT(budget_amount) as budget_amount FROM planning WHERE budget_amount = '0.00';
    SELECT COUNT(lga) as location FROM projects WHERE lga='' OR lga = NULL;
    SELECT ROUND(((c.amount - b.budget_amount)/b.budget_amount)*100) as diff, b.budget_amount as budget_amount, c.amount as contract_amount, p.title FROM projects p LEFT JOIN planning b ON p.id = b.project_id LEFT JOIN award c ON p.id = c.project_id WHERE c.amount != '0.00' AND b.budget_amount != '0.00' ORDER BY diff DESC LIMIT 3;
    SELECT COUNT(c.contractor_id) AS count, i.name FROM contractors c LEFT JOIN institutions i ON i.id = c.contractor_id GROUP BY c.contractor_id ORDER BY count DESC LIMIT 3;
    SELECT COUNT(c.contractor_id) as count, COUNT(p.mda_id) as mda_count, i.name FROM projects p LEFT JOIN contractors c ON p.id = c.project_id LEFT JOIN institutions i ON i.id = c.contractor_id  GROUP BY (p.mda_id) ORDER BY count DESC LIMIT 3;
    `;
	db.query(queryString, (err, results:any, field)=> {
		if (!err) {
			const response = {
				missing_data: {
					contractAmount: results[0][0].contract_amount,
					budgetAmount: results[1][0].budget_amount,
					location: results[2][0].location,
				},
				contractVaraitions: results[3],
				topContractors: results[4],
				topMDAContractors: results[5],
			};
			success(response);
		}
		console.log(err);
	});
};
