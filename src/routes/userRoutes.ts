import {
  createOrUpdateUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "@/controllers/userControllers";
import { Router } from "express";

const router = Router();

router.route("/user/all").get(getAllUsers);
router.route("/user").post(createUser).post(createOrUpdateUser);
router.route("/user/:id").delete(deleteUser).put(updateUser).get(getUser);

export default router;
