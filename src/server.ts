import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import UserRoute from "./Http/Controllers/Users/Routes";
import {
  InvalidCredentialsError,
  InvalidPasswordError,
  ResourceNotFoundError,
  UserAlreadyExistsError,
} from "./UseCases/Errors";

require("dotenv").config();

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

app.use("/users", UserRoute);

// AppError middleware + lib express-async-errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let errorMessage = "Internal server error";

  if (err instanceof ResourceNotFoundError) {
    statusCode = 404;
  } else if (
    err instanceof UserAlreadyExistsError ||
    err instanceof InvalidCredentialsError ||
    err instanceof InvalidPasswordError
  ) {
    statusCode = 400;
  }

  if (statusCode !== 500) {
    errorMessage = err.message;
  }

  console.log(err);
  return res.status(statusCode).json({ message: errorMessage });
});

app.listen(port, () => {
  console.log("Server is running");
});
