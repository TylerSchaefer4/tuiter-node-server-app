import express from "express";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from "cors";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import "dotenv/config";
const app = express();
app.use(express.json());
console.log("NODE ENV: ", process.env.NODE_ENV);

console.log("FRONTEND ENV: ", process.env.FRONTEND_URL);
app.use(
  cors({
    credentials: true,
    origin: "https://a5--curious-malasada-b46fc0.netlify.app",
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
