"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db/db"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const AuthRouter_1 = require("./routes/AuthRouter");
const CompanyAuthRouter_1 = require("./routes/CompanyAuthRouter");
const CompanyRouter_1 = require("./routes/CompanyRouter");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send("Ionic Backend Working Correctly");
});
app.use('/auth', AuthRouter_1.AuthRouter);
app.use('/auth-company', CompanyAuthRouter_1.CompanyAuthRouter);
app.use('/company', CompanyRouter_1.CompanyRouter);
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
