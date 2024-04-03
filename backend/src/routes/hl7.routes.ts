import express from "express";
import multer from "multer";
import { getHighRiskRecords } from "../controllers/hl7.controller";

const hl7Routes = express.Router();

const upload = multer();

hl7Routes.post("/", upload.single("oruFile"), getHighRiskRecords);

export default hl7Routes;
