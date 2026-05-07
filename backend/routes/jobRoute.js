import express from "express";
import { addJob, listJobs } from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.post("/add", addJob);

jobRouter.get("/list", listJobs);

export default jobRouter;