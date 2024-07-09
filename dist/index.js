"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const express_session_1 = __importDefault(require("express-session"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoconfig_1 = require("./Models/mongoconfig");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("*", body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: 'ismydev',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    },
    genid: () => (0, uuid_1.v4)()
}));
app.use(route_1.default);
(0, mongoconfig_1.connectToDB)();
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get('/home', (req, res) => {
    const formPath = path_1.default.join(__dirname, '../public', 'home.html');
    res.status(200).sendFile(formPath);
});
