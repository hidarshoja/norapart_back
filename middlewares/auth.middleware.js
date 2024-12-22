import jwt from "jsonwebtoken";
import db from "../models/index.js";

export const protectRoute = async (req, res, next) => {
	try {
		//const accessToken = req.cookies.accessToken;

		const authorization = req.header('Authorization');
    
		const accessToken = authorization && authorization.split(' ')[1];

		if (!accessToken) {
			return res.status(401).json({ message: "توکن ارسالی نامعتبر است" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
			const user = await db.User.findOne({
                where: {phone: decoded.userId},
                attributes: { exclude: ['password']}
            });

			if (!user) {
				return res.status(401).json({ message: "کاربری با این مشخصات یافت نشد" });
			}

			req.user = user;

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "توکن منقضی شده است" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "توکن نامعتبر است" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "سطح دسترسی شما تعریف نشده است" });
	}
};