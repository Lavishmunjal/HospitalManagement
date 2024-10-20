import express from "express"
import { patientregister } from "../controller/userController.js";

const router = express.Router();

router.post("/patient/register", patientregister)

export default router;