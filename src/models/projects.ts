/* eslint-disable import/namespace */
import db from "../config/db";
import {paramsToSQL} from "../helpers/query";
import {DataColumnMap, SearchRequestBody} from "../types/projects";

export const projectsStats = (
	success: (result: any) => void,
	error: (err: any) => void = (err) => console.log(err)
) => {
	db.query(
		`SELECT COUNT (p.id) as num, SUM(a.amount) as value FROM projects 
      p LEFT JOIN award a ON a.project_id = p.id; 
   SELECT COUNT (p.id) as num, SUM(a.amount) as value FROM projects p 
   LEFT JOIN award a ON a.project_id = p.id WHERE
    p.date_added < DATE_SUB(NOW(), INTERVAL 1 MONTH); 
   `,
		(err, results: any) => {
			if (err) {
				error(err);
				return;
			}
			const projectData = results[0][0];
			const prevData = results[1][0];
			const response = {
				totalProjects: projectData.num,
				difference:
                    parseFloat(projectData.num) - parseFloat(prevData.num),
				totalValue: parseFloat(projectData.value),
				valueDiff:
                    parseFloat(projectData.value) -
                    parseFloat(prevData.value),
			};
			success(response);
		}
	);
};

export const searchProjects = (
	filters: SearchRequestBody,
	success: (result: any) => void,
	error: (err: any) => void = (err) => console.log(err)
) => {
	const filterQuery = paramsToSQL(filters.filter);
	let {limit = 10, page = 1, orderby, dir="desc"} = filters;
	page = page < 1 ? 1: page;
	const order = orderby ? DataColumnMap[orderby] : "p.id";
	const start = (page - 1) * limit;
	const where = filterQuery.length ? ` WHERE ${filterQuery}` : "";
	const query = `SELECT SQL_CALC_FOUND_ROWS p.id, p.title, p.lga, p.year, 
  a.amount, b.budget_amount,
   i.name as contractor, m.name as mda FROM projects p LEFT JOIN planning b 
   ON b.project_id = p.id LEFT JOIN award a ON a.project_id = p.id LEFT JOIN
    mdas m ON p.mda_id = m.id LEFT JOIN contractors ct ON 
    ct.project_id = p.id LEFT JOIN institutions i ON ct.contractor_id = i.id 
    LEFT JOIN tender t ON t.project_id = p.id 
    ${where} ORDER BY ${order} ${dir} LIMIT ${limit}
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

export const selectProject = (
	projectId: string,
	success: (results: any) => void,
	error: (err: any) => void
) => {
	const query = `SELECT p.title, p.date_added, p.date_updated,
   p.id, p.lga, m.name as mda,
   i.name as contractor, 
  a.amount, b.budget_amount, ct.contractor_id FROM projects p LEFT JOIN 
  mdas m ON m.id = p.mda_id LEFT JOIN contractors ct ON ct.project_id = p.id 
  LEFT JOIN institutions i ON ct.contractor_id = i.id LEFT JOIN planning b ON 
  b.project_id = p.id LEFT JOIN award a ON a.project_id = p.id 
   WHERE p.id = '${projectId}'`;
	db.query(query, (err, results: any) => {
		if (err) {
			error(err);
			return;
		}
		success(results);
	});
};
