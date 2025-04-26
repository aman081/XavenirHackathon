import { asyncHandler } from "../utils/AsyncHandler.js";

const isAuthenticated = asyncHandler((req, res, next) => {
    const token = req.cookies["token"];

    if (!token) throw new Error(403, "Not authenticated");

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedData._id;
    next();
});

export default isAuthenticated;
