// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";
import cors from "cors";
import apiRoutes from "./api";
import bodyParser from "body-parser";
import path from "path";

const app = express();

// app.use(cors({credentials: true, origin: "*"}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

admin.initializeApp();

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        if (req.headers["x-forwarded-proto"] !== "https") {
            return res.redirect("https://" + req.headers.host + req.url);
        } else return next();
    } else return next();
});

app.use("/api", apiRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to Adamawa OCDS API");
});

// exports.app = functions.https.onRequest(app);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
