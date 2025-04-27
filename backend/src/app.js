import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { corsOptions } from "./constants.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import adminRoute from "./routes/admin.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import distributorRoutes from "./routes/distributor.routes.js";
import { AVATAR_TEMP_PATH } from "./constants.js";
import fs from "fs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure temp directory exists
if (!fs.existsSync(AVATAR_TEMP_PATH)) {
    fs.mkdirSync(AVATAR_TEMP_PATH, { recursive: true });
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/test", (req, res) => {
    res.send("Home route active!");
});

app.use("/provider", providerRoutes);
app.use("/distributor", distributorRoutes);
app.use("/distributor", distributorRoutes);
app.use("/admin", adminRoute);

app.use(errorHandler);

export default app;
