const express = require("express");
const {
	createQuiz,
} = require("../controllers/quizControllers");
const router = express.Router();

router.route("/quiz/new").post(createQuiz);

module.exports = router;