const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./.env" });

process.on("uncaughtException", error => {
  console.log("unhandledRejection shutting down the application");
  console.log(error.name, error.message);
  process.exit(1);
});

// Replace process.env.DATABASE with your MongoDB connection string
const DB = "mongodb://localhost:27017/your-database-name";

// Establish a connection to the MongoDB database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully");
    console.log(process.env.NODE_ENV);

    // Defineing the 'db' variable here after a successful connection
    const db = mongoose.connection;

    // Now we can use 'db' to access your collections
    const collection = db.collection('my_collection');

    // Continue with server setup or other operations
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
      console.log(`You are listening to the port ${port}`);
    });

    process.on("unhandledRejection", err => {
      console.log("UnhandleRejection Shutting down the application");
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });
