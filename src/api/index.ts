import express from "express";
import {searchContractors} from "../models/contractors";
import {fetchHomepageStats} from "../models/home";
import {
	projectsStats,
	searchProjects,
	selectProject,
} from "../models/projects";
import {
	ContractorSearchRequestBody,
	SearchRequestBody,
} from "../types/projects";

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).send("API v2.0");
});

router.get("/stats", (req, res) => {
	fetchHomepageStats((results) => res.send(results));
});

router.get("/projects-stats", (req, res) => {
	projectsStats(
		(results) => res.send(results),
		(err) => res.status(500).send({err: err?.toString()})
	);
});

router.post("/search-project", (req, res) => {
	const body = req.body as SearchRequestBody;
	searchProjects(
		body,
		(result) => {
			res.send(result);
		},
		(err) => res.status(400).send({err: err?.toString()})
	);
});
router.get("/project/:id", (req, res) => {
	const projectId = req.params?.id as string;
	console.log({projectId});
	if (!projectId || isNaN(parseInt(projectId))) {
		res.status(400).send({err: "project id invalid"});
		return;
	}
	selectProject(
		projectId,
		(results) => {
			res.send(results);
		},
		(err) => res.status(500).send({err: err?.toString()})
	);
});
router.post("/contractors", (req, res) => {
	const body = req.body as ContractorSearchRequestBody;
	searchContractors(
		body,
		(results) => {
			res.send(results);
		},
		(err) => res.status(500).send({err: err?.toString()})
	);
});
export default router;
