import express from "express"
import { addNewAdmin, getAllDoctors, login, patientregister } from "../controller/userController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/patient/register", patientregister)
router.post("/login", login)
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin) 
router.get("/doctors",  getAllDoctors) 

export default router;