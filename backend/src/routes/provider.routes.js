import express from 'express';
import upload from '../middlewares/multer.middleware.js';
import { loginProvider, logoutProvider, registerProvider } from '../controllers/provider.controller.js';

const app = express.Router();

app.post("/register", upload.single("avatar"), registerProvider);
app.post("/login", loginProvider);
app.get("/logout", logoutProvider);


export default app;