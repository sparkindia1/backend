"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var appConfig_1 = require("./utils/appConfig");
var routes_1 = require("./utils/routes");
var users_1 = __importDefault(require("./routes/users"));
var orders_1 = __importDefault(require("./routes/orders"));
var products_1 = __importDefault(require("./routes/products"));
var app = (0, express_1["default"])();
app.use((0, helmet_1["default"])());
app.use((0, cors_1["default"])((0, appConfig_1.corsConfig)()));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.all('/health', routes_1.healthCheck);
app.use('/user', users_1["default"]);
app.use('/orders', orders_1["default"]);
app.use('/products', products_1["default"]);
/**
 * More Routes here
 */
app.use(routes_1.globalErrorHandler);
process.on('uncaughtException', function (error) {
    console.error(error);
    process.exit(1);
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Server is running on port ' + port);
});
