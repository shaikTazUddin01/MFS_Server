// import package
import express, { Request, Response } from "express";
import cors from 'cors'
import router from "./app/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";

const app = express();
//middleware
app.use(cors({origin:["https://mfs-client-alpha.vercel.app","http://localhost:5173"],credentials:true}));
app.use(express.json()); 
app.use(cookieParser())

//router
app.use("/api",router)

//global error middleware
app.use(globalErrorHandler);

// check server conncetion
app.get("/", (req: Request, res: Response) => {
  res.send("The server is connect successfully");
});




export default app;