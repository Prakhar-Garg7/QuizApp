const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	//Wrong mongodb error
	if (err.name === "CastError") {
		const message = `Resource not found. Invalid: ${err.path}`;
		err = new errorHandler(message, 400);
	}

	//Mongoose duplicate key error
	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(
			err.keyValue
		)} entered`;
		err = new errorHandler(message, 400);
	}

	//JsonWebTokenError
	if (err.code === "JsonWebTokenError") {
		const message = `Json Web Token is invalid, try again`;
		err = new errorHandler(message, 400);
	}

	//JWT Expire error
	if (err.code === "TokenExpiredError") {
		const message = `Json Web Token is expired, try again`;
		err = new errorHandler(message, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};
