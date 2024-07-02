"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(route_1.default);
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.status(200).send('Welcome');
});
app.get('register', (req, res) => {
    const formPath = path_1.default.join(__dirname, '../form/form.html');
    res.status(200).sendFile(formPath);
});
