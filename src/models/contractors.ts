import {paramsToSQLContractors} from "../helpers/query";
import {
	ContractorColumMap,
	// ContractorFilterparm,
	ContractorSearchRequestBody,
} from "../types/projects";
import db from "../config/db";

export const searchContractors = (
	filters: ContractorSearchRequestBody,
	success: (result: any) => void,
	error: (err: any) => void = (err) => console.log(err)
) => {
	const filterQuery = paramsToSQLContractors(filters.filter);
	let {limit = 10, page = 1, orderby, dir="desc"} = filters;
	page = page < 1 ? 1: page;
	const order = orderby ? ContractorColumMap[orderby] : "p.id";
	const start = (page - 1) * limit;
	const where = filterQuery.length ? ` WHERE ${filterQuery}` : "";
	const query = `SELECT SQL_CALC_FOUND_ROWS i.name, SUM(a.amount) as total, 
   COUNT(DISTINCT(p.mda_id)) as serviced, COUNT(p.id) as project_count FROM 
   contractors ct LEFT JOIN projects p ON p.id = ct.project_id LEFT JOIN 
   institutions i ON i.id = ct.contractor_id LEFT JOIN award a ON 
   a.project_id = ct.project_id   
   ${where} GROUP BY ct.contractor_id ORDER BY ${order} ${dir} LIMIT ${limit}
    OFFSET ${start}; SELECT FOUND_ROWS() as total`;
	db.query(query, (err, results:any)=>{
		if (err) {
			error(err);
			return;
		}
		const response = {
			data: results[0],
			total: results[1][0]?.total,
		};
		success(response);
	});
};
