require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
// const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes");

app.use(cors());
// app.set('trust proxy', 1);
// app.use(session({
//   secret: `${process.env.SESSION_SECRET}`,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: false,
//     secure: true,
//     sameSite: 'none',
//   }
// }));

app.use(passport.initialize());
require("./services/googleStrategy");

const dbConnection =
  process.env.MONGO_URI_DEV || "mongodb://127.0.0.1:27017/mernboilerplate";

mongoose
  .connect(dbConnection)
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
