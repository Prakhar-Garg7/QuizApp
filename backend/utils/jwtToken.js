// create token and saving in cookie

const sendToken = (user, res, statusCode) => {
	const token = user.getJWTToken();
	const options = {
		expires: new Date(
			Date.now() +
				process.env.COOKIE_EXPIRE * 1000 * 24 * 60 * 60
		),
		httpOnly: true,
	};

	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
		user,
	});
};

module.exports = sendToken;
