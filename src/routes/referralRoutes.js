import express from "express";
import { createReferral } from "../controllers/referralController.js"; // Ensure correct path

const router = express.Router();

router.post("/", createReferral);

export default router; // Export using ES Module syntax

