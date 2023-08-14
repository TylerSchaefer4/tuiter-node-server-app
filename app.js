import express from "express";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from "cors";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import "dotenv/config";
import mongoose from "mongoose";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/tuiter-su2-23";
mongoose.connect(CONNECTION_STRING);
// mongoose.connect("mongodb://localhost:27017/tuiter-su2-23");
// mongoose.connect(process.env.MONGODB_URI);
const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
  },
  { collection: "users" }
);

const tuitsSchema = new mongoose.Schema(
  {
    tuit: String,
    liked: Boolean,
    likes: Number,
  },
  { collection: "tuits" }
);
const Tuit = mongoose.model("Tuit", tuitsSchema);

const User = mongoose.model("User", userSchema);

// const promise = Tuit.find().exec();
// promise.then((tuits) => {
//   console.log(tuits);
// });

//

// const promise = User.find().exec();
//promise.then((users) => console.log(users));

const app = express();
app.use(express.json());
console.log("NODE ENV: ", process.env.NODE_ENV);

console.log("FRONTEND ENV: ", process.env.FRONTEND_URL);
app.use(
  cors({
    credentials: true,
    origin: "https://a6--curious-malasada-b46fc0.netlify.app",
    // origin: "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

TuitsController(app);
AuthController(app);

HelloController(app);
UserController(app);

app.listen(process.env.PORT || 4000);
