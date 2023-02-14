/* eslint-disable no-prototype-builtins */
import {
	ContractorColumMap,
	ContractorFilterparm,
	ContractorSearchRequestBody,
	DataColumnMap,
	ProjectFilterParam,
	SearchRequestBody,
} from "../types/projects";

export const paramsToSQL = (filterParams: SearchRequestBody["filter"]) => {
	const whereClauses = [];

	for (let key in filterParams) {
		if (Object.prototype.hasOwnProperty.call(filterParams, key)) {
			key = key as ProjectFilterParam;
			const params = filterParams[key as ProjectFilterParam];
			if (params) {
				const query =
                    params.length > 1 ?
                    	` ${
                    		DataColumnMap[key as ProjectFilterParam]
                    	} IN (${params.
                    		map((value)=> `'${value}'`).join(",")}) ` :
                    	`${DataColumnMap[key as ProjectFilterParam]}
                         = '${params[0]}' `;
				whereClauses.push(query);
			}
		}
	}
	return whereClauses.length ? whereClauses.join(" AND ") : "";
};
export const paramsToSQLContractors = (
	filterParams: ContractorSearchRequestBody["filter"]
) => {
	const whereClauses = [];

	for (const key in filterParams) {
		if (Object.prototype.hasOwnProperty.call(filterParams, key)) {
			const params = filterParams[key as ContractorFilterparm];
			if (params) {
				const query =
                    params.length > 1 ?
                    	` ${
                    		ContractorColumMap[key as ContractorFilterparm]
                    	} IN (${params
                    		.map((value) => `'${value}'`)
                    		.join(",")}) ` :
                    	`${ContractorColumMap[key as ContractorFilterparm]}
                         = '${params[0]}' `;
				whereClauses.push(query);
			}
		}
	}
	return whereClauses.length ? whereClauses.join(" AND ") : "";
};

