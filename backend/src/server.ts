import { config } from "dotenv";

import express from "express";
import http from "http";
import apiRoutes from "./routes";

config();

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(apiRoutes);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
