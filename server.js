const express = require("express");
const connectDb = require("./config/dbConecction");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("dotenv").config();


connectDb();
const app = express();
console.log(20)
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", require("./routes/user.route"));
app.use("/api/contacts", require("./routes/contact.route"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
