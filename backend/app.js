const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");          // create a Error class Object
const cookieParser = require("cookie-parser");            // for parsing auth cookie
const bodyParser = require("body-parser");                  // for parsing req body

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

// route imports (all routes will be added here)
const quizRoutes = require("./routes/quizRoutes");

app.use("/api/v1", quizRoutes);

//Middleware for error
app.use(errorMiddleware);

module.exports = app