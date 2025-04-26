import dotenv from "dotenv";
import path from "path";
//
import { fileURLToPath } from "url";

import http from "http";
import app from "./app.js";
import DBConnection from "./config/db.js";

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
dotenv.config({ path: path.resolve(__dirname, ".env") });

// dotenv.config({ path: path.resolve(process.cwd(), ".env") });

DBConnection()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        const server = http.createServer(app);

        server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
    })
    .catch((err) =>
        console.error("Error connecting to database:", err.message),
    );
