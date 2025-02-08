import express from "express";
import { ApplyInternship, CreateStudProfile, UpdateStudProfile } from "../webapi/controllers/StudentController";

const studroute = express.Router();

studroute.post('/CreateStudProfile', CreateStudProfile)
studroute.put('/UpdateStudProfile', UpdateStudProfile)
studroute.post('/ApplyInternship', ApplyInternship)

export default studroute;