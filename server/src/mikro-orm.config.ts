import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";
require("dotenv").config();


export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: "redditcl",
  debug: !__prod__,
  type: "postgresql",
  entities: [Post, User],
  user: process.env.DBUSER,
  password: process.env.DBPASS,
} as Parameters<typeof MikroORM.init>[0];
