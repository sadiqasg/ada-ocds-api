"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsToSQLContractors = exports.paramsToSQL = void 0;
/* eslint-disable no-prototype-builtins */
const projects_1 = require("../types/projects");
const paramsToSQL = (filterParams) => {
    const whereClauses = [];
    for (let key in filterParams) {
        if (Object.prototype.hasOwnProperty.call(filterParams, key)) {
            key = key;
            const params = filterParams[key];
            if (params) {
                const query = params.length > 1 ?
                    ` ${projects_1.DataColumnMap[key]} IN (${params.
                        map((value) => `'${value}'`).join(",")}) ` :
                    `${projects_1.DataColumnMap[key]}
                         = '${params[0]}' `;
                whereClauses.push(query);
            }
        }
    }
    return whereClauses.length ? whereClauses.join(" AND ") : "";
};
exports.paramsToSQL = paramsToSQL;
const paramsToSQLContractors = (filterParams) => {
    const whereClauses = [];
    for (const key in filterParams) {
        if (Object.prototype.hasOwnProperty.call(filterParams, key)) {
            const params = filterParams[key];
            if (params) {
                const query = params.length > 1 ?
                    ` ${projects_1.ContractorColumMap[key]} IN (${params
                        .map((value) => `'${value}'`)
                        .join(",")}) ` :
                    `${projects_1.ContractorColumMap[key]}
                         = '${params[0]}' `;
                whereClauses.push(query);
            }
        }
    }
    return whereClauses.length ? whereClauses.join(" AND ") : "";
};
exports.paramsToSQLContractors = paramsToSQLContractors;
//# sourceMappingURL=query.js.map