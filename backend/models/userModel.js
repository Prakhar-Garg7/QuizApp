const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name"],
		minLength: [4, "Name should be at least 3 characters long"],
		maxLength: [30, "Name should not exceed 50 characters"],
	},
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		validate: [validator.isEmail, "Please enter a valid email"],
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minLength: [8, "Password should be at least 8 characters long"],
		select: false,
	},
	role: {
		type: String,
		default: "user",
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

//JWT token
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

//creating password reset token
userSchema.methods.getResetPasswordToken = function () {
	//generating token
	const resetToken = crypto.randomBytes(20).toString("hex");

	//Hashing and adding resetPasswordToken to userSchema
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
	return resetToken;
};

module.exports = mongoose.model("User", userSchema);
