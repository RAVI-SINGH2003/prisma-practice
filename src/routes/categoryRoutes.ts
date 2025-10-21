import { createCategory } from "@/controllers/categoryControllers";
import { Router } from "express";

const router = Router();

router.route("/category").post(createCategory);

export default router;
