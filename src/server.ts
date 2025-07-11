import express from "express";
import connectDb from "./config/dbConnection";
import errorHandler from "../middlewares/errorHandler";
import dotenv from "dotenv";

dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", require("../routes/user.route"));
app.use("/api/contacts", require("../routes/contact.route"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
