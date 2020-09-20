"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const path_1 = __importDefault(require("path"));
require("dotenv").config();
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: "redditcl",
    debug: !constants_1.__prod__,
    type: "postgresql",
    entities: [Post_1.Post],
    user: process.env.DBUSER,
    password: process.env.DBPASS,
};
//# sourceMappingURL=mikro-orm.config.js.map