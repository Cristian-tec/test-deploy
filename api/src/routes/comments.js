const { Router } = require("express");
const commentController = require("../controllers/CommentController");
const router = Router();

router.get("/", commentController.getComment);

router.get("/product/:id", commentController.getProductComments);

router.get("/user/:id", commentController.getUserComments);

router.post("/", commentController.postComment);

router.put("/", commentController.putComment);

router.delete("/", commentController.deleteComment);

module.exports = router;
