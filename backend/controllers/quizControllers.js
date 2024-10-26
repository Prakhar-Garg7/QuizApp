const quizModel = require("../models/quizModel");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create quiz
exports.createQuiz = catchAsyncError(async (req, res, next) => {

	const quiz = await quizModel.create({
		sections: req.body.sections
	});

	res.status(201).json({
		success: true,
		message: "Quiz created successfully",
		quiz,
	});
});