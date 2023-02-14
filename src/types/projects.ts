export enum ProjectFilterParam {
   ProcurementMethod="procurement_method",
   Category="category",
   Year="year",
   Status="status",
   Contractor="contractor",
   LGA="lga",
   MDA="mda"
}

export type SearchRequestBody = {
   filter: Record<ProjectFilterParam, undefined | string[]>
   orderby?: ProjectFilterParam
   dir?: "asc" | "desc";
   page?: number;
   limit?: number;
}
export enum ContractorFilterparm {
   Total="totalContract",
   NoMDAs="serviced",
   NoProjects="projects"
}
export type ContractorSearchRequestBody = {
   filter: Record<ContractorFilterparm, undefined | string[]>;
   orderby?: ContractorFilterparm,
   dir?: "asc" | "desc";
   page?: number;
   limit?: number;
}
export const ContractorColumMap: Record<ContractorFilterparm, string> = {
	projects: "project_count",
	serviced: "serviced",
	totalContract: "total",
};
export const DataColumnMap: Record<ProjectFilterParam, string> = {
	procurement_method: "t.procurement_method",
	category: "p.category",
	year: "p.year",
	contractor: "ct.contractor_id",
	lga: "p.lga",
	mda: "p.mda_id",
	status: "p.status",
};
