"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchContractors = void 0;
const query_1 = require("../helpers/query");
const projects_1 = require("../types/projects");
const db_1 = __importDefault(require("../config/db"));
const searchContractors = (filters, success, error = (err) => console.log(err)) => {
    const filterQuery = (0, query_1.paramsToSQLContractors)(filters.filter);
    let { limit = 10, page = 1, orderby, dir = "desc" } = filters;
    page = page < 1 ? 1 : page;
    const order = orderby ? projects_1.ContractorColumMap[orderby] : "p.id";
    const start = (page - 1) * limit;
    const where = filterQuery.length ? ` WHERE ${filterQuery}` : "";
    const query = `SELECT SQL_CALC_FOUND_ROWS i.name, SUM(a.amount) as total, 
   COUNT(DISTINCT(p.mda_id)) as serviced, COUNT(p.id) as project_count FROM 
   contractors ct LEFT JOIN projects p ON p.id = ct.project_id LEFT JOIN 
   institutions i ON i.id = ct.contractor_id LEFT JOIN award a ON 
   a.project_id = ct.project_id   
   ${where} GROUP BY ct.contractor_id ORDER BY ${order} ${dir} LIMIT ${limit}
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
exports.searchContractors = searchContractors;
//# sourceMappingURL=contractors.js.map