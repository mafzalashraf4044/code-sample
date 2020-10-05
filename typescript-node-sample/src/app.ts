/** @format */

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import morgan from "morgan";

import { jwtStrategy } from "./config/passport";
import { handleNotFound, handleError } from "./middlewares/error-handler";

//  routes
import routes from "./routes";

// creating express server
const app = express();

//  express security using helmet
app.use(helmet());

//  parsing body params
app.use(bodyParser.json());

//  cors
app.use(cors());

//  logger
app.use(morgan("tiny"));

//  passport jwt setup
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

//  routes
app.use("/api", routes);

//  error handling
app.use(handleNotFound);
app.use(handleError);

export default app;
