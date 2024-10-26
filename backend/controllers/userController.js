const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
          const { name, email, password, role } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		role,
	});

	sendToken(user, res, 201);
});

// Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
	const { name, password } = req.body;

	if (!name || !password) {
		return next(
			new ErrorHandler(
				"Please provide name and password",
				400
			)
		);
	}

	const user = await User.findOne({ name }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid name or password", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid name or password", 401));
	}

	sendToken(user, res, 200);
});

//Logout user
exports.logOut = catchAsyncError(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});
	res.status(200).json({
		success: true,
		message: "logged out successfully",
	});
});

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	// Get ResetPassword Token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		"host"
	)}/password/reset/${resetToken}`;

	const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: `Quiz App Password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

//Reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
	//creating hash token from req.token
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken: resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				"Reset token is invalid or has expired",
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler("Passwords do not match", 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, res, 200);
});

//get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

// update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	const isPasswordMatched = await user.comparePassword(
		req.body.oldPassword
	);
	if (!isPasswordMatched) {
		return next(new ErrorHandler("Old password is incorrect", 401));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHandler("Passwords do not match", 401));
	}

	user.password = req.body.newPassword;
	await user.save();

	sendToken(user, res, 200);
});

// update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		message: "Profile updated successfully",
	});
});

//get All Users -- admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
	const allUsers = await User.find();
	res.status(200).json({
		success: true,
		allUsers,
	});
});

//get Single User -- admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
	const requestedUser = await User.findById(req.params.id);
	if (!requestedUser)
		return next(new ErrorHandler("User not found", 400));
	res.status(200).json({
		success: true,
		requestedUser,
	});
});

// update user role -- admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		message: "User role updated successfully",
	});
});

// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(
				`User does not exist with Id: ${req.params.id}`,
				400
			)
		);
	}

	await user.deleteOne();

	res.status(200).json({
		success: true,
		message: "User Deleted Successfully",
	});
});