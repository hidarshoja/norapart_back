import jwt from "jsonwebtoken";
import db from "../models/index.js";
import bcrypt from "bcryptjs";

export const generateTokens = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	return { accessToken, refreshToken };
};

export const storeRefreshToken = async (userId, refreshToken) => {
    const refreshExist = await db.RefreshToken.findOne({ where: { user_id:userId }});
    if (refreshExist) {
        await db.RefreshToken.update(
            { token: refreshToken , expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, 
            { where: { user_id:userId } }
        );
        return
    }
	await db.RefreshToken.create({ token: refreshToken, user_id:userId });
};

export const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

export const comparePassword = async function (password,user_password) {
	return bcrypt.compare(password,user_password);
};