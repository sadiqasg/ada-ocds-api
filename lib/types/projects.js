"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataColumnMap = exports.ContractorColumMap = exports.ContractorFilterparm = exports.ProjectFilterParam = void 0;
var ProjectFilterParam;
(function (ProjectFilterParam) {
    ProjectFilterParam["ProcurementMethod"] = "procurement_method";
    ProjectFilterParam["Category"] = "category";
    ProjectFilterParam["Year"] = "year";
    ProjectFilterParam["Status"] = "status";
    ProjectFilterParam["Contractor"] = "contractor";
    ProjectFilterParam["LGA"] = "lga";
    ProjectFilterParam["MDA"] = "mda";
})(ProjectFilterParam = exports.ProjectFilterParam || (exports.ProjectFilterParam = {}));
var ContractorFilterparm;
(function (ContractorFilterparm) {
    ContractorFilterparm["Total"] = "totalContract";
    ContractorFilterparm["NoMDAs"] = "serviced";
    ContractorFilterparm["NoProjects"] = "projects";
})(ContractorFilterparm = exports.ContractorFilterparm || (exports.ContractorFilterparm = {}));
exports.ContractorColumMap = {
    projects: "project_count",
    serviced: "serviced",
    totalContract: "total",
};
exports.DataColumnMap = {
    procurement_method: "t.procurement_method",
    category: "p.category",
    year: "p.year",
    contractor: "ct.contractor_id",
    lga: "p.lga",
    mda: "p.mda_id",
    status: "p.status",
};
//# sourceMappingURL=projects.js.map