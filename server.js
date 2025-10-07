import app from "./app.js";
import { config } from "./config/config.js";
import { createHttpsServer } from './httpsServer.js';

createHttpsServer(app, config.port);
