import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { corsOptions } from "./constants.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import adminRoute from "./routes/admin.routes.js";

import providerRoutes from "./routes/provider.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/test", (req, res) => {
    res.send("Home route active!");
});


app.use("/provider", providerRoutes);

app.use("/admin", adminRoute);


app.use(errorHandler);

export default app;
