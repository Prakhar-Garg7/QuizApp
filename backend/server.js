const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling uncaught exception
process.on("uncaughtException", (err) => {
          console.log(`Error is: ${err.message}`);
          console.log("Shutting down the server due to uncaught exception");
          process.exit(1);
})

//config
dotenv.config({path:"./config/config.env"});

//Connecting database
connectDatabase();

const server =  app.listen(process.env.PORT, ()=>{
          console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
          console.log(`Error is: ${err.message}`);
          console.log("Shutting down the server due to Unhandled promise rejection");

          server.close(() => {
                    process.exit(1);
          })
})