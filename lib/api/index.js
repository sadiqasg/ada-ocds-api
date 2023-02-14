"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contractors_1 = require("../models/contractors");
const home_1 = require("../models/home");
const projects_1 = require("../models/projects");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.status(200).send("API v2.0");
});
router.get("/stats", (req, res) => {
    (0, home_1.fetchHomepageStats)((results) => res.send(results));
});
router.get("/projects-stats", (req, res) => {
    (0, projects_1.projectsStats)((results) => res.send(results), (err) => res.status(500).send({ err: err === null || err === void 0 ? void 0 : err.toString() }));
});
router.post("/search-project", (req, res) => {
    const body = req.body;
    (0, projects_1.searchProjects)(body, (result) => {
        res.send(result);
    }, (err) => res.status(400).send({ err: err === null || err === void 0 ? void 0 : err.toString() }));
});
router.get("/project/:id", (req, res) => {
    var _a;
    const projectId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    console.log({ projectId });
    if (!projectId || isNaN(parseInt(projectId))) {
        res.status(400).send({ err: "project id invalid" });
        return;
    }
    (0, projects_1.selectProject)(projectId, (results) => {
        res.send(results);
    }, (err) => res.status(500).send({ err: err === null || err === void 0 ? void 0 : err.toString() }));
});
router.post("/contractors", (req, res) => {
    const body = req.body;
    (0, contractors_1.searchContractors)(body, (results) => {
        res.send(results);
    }, (err) => res.status(500).send({ err: err === null || err === void 0 ? void 0 : err.toString() }));
});
exports.default = router;
//# sourceMappingURL=index.js.map