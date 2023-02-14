"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProject = exports.searchProjects = exports.projectsStats = void 0;
/* eslint-disable import/namespace */
const db_1 = __importDefault(require("../config/db"));
const query_1 = require("../helpers/query");
const projects_1 = require("../types/projects");
const projectsStats = (success, error = (err) => console.log(err)) => {
    db_1.default.query(`SELECT COUNT (p.id) as num, SUM(a.amount) as value FROM projects 
      p LEFT JOIN award a ON a.project_id = p.id; 
   SELECT COUNT (p.id) as num, SUM(a.amount) as value FROM projects p 
   LEFT JOIN award a ON a.project_id = p.id WHERE
    p.date_added < DATE_SUB(NOW(), INTERVAL 1 MONTH); 
   `, (err, results) => {
        if (err) {
            error(err);
            return;
        }
        const projectData = results[0][0];
        const prevData = results[1][0];
        const response = {
            totalProjects: projectData.num,
            difference: parseFloat(projectData.num) - parseFloat(prevData.num),
            totalValue: parseFloat(projectData.value),
            valueDiff: parseFloat(projectData.value) -
                parseFloat(prevData.value),
        };
        success(response);
    });
};
exports.projectsStats = projectsStats;
const searchProjects = (filters, success, error = (err) => console.log(err)) => {
    const filterQuery = (0, query_1.paramsToSQL)(filters.filter);
    let { limit = 10, page = 1, orderby, dir = "desc" } = filters;
    page = page < 1 ? 1 : page;
    const order = orderby ? projects_1.DataColumnMap[orderby] : "p.id";
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
    db_1.default.query(query, (err, results) => {
        var _a;
        if (err) {
            error(err);
            return;
        }
        const response = {
            data: results[0],
            total: (_a = results[1][0]) === null || _a === void 0 ? void 0 : _a.total,
        };
        success(response);
    });
};
exports.searchProjects = searchProjects;
const selectProject = (projectId, success, error) => {
    const query = `SELECT p.title, p.date_added, p.date_updated,
   p.id, p.lga, m.name as mda,
   i.name as contractor, 
  a.amount, b.budget_amount, ct.contractor_id FROM projects p LEFT JOIN 
  mdas m ON m.id = p.mda_id LEFT JOIN contractors ct ON ct.project_id = p.id 
  LEFT JOIN institutions i ON ct.contractor_id = i.id LEFT JOIN planning b ON 
  b.project_id = p.id LEFT JOIN award a ON a.project_id = p.id 
   WHERE p.id = '${projectId}'`;
    db_1.default.query(query, (err, results) => {
        if (err) {
            error(err);
            return;
        }
        success(results);
    });
};
exports.selectProject = selectProject;
//# sourceMappingURL=projects.js.map