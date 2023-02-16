"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://adamawa-ocds.web.app/"); // change to http://localhost:3001 for testing
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// admin.initializeApp();
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        if (req.headers["x-forwarded-proto"] !== "https") {
            return res.redirect("https://" + req.headers.host + req.url);
        }
        else
            return next();
    }
    else
        return next();
});
app.use("/api", api_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Adamawa OCDS API");
});
// exports.app = functions.https.onRequest(app);
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map