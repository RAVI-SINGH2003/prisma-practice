import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "@/controllers/blogControllers";
import { Router } from "express";

const router = Router();

router.route("/blog/all").get(getAllBlogs);
router.route("/blog").post(createBlog);
router.route("/blog/:id").delete(deleteBlog).put(updateBlog).get(getBlog);

export default router;
