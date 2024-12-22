import db from "../models/index.js";
import { comparePassword, generateTokens, setCookies, storeRefreshToken } from "../services/token.service.js";
import { createNewUser, userExist } from "../services/user.service.js";
import jwt from "jsonwebtoken";

// ! register a new user
export const signup = async (req, res) => {
    try {
        const userExists = await userExist(req.body.phone);

        if (userExists) {
            return res.status(400).json({ message: "کاربری با این شماره قبلا ثبت شده است" });
        }

        const user = await createNewUser(req.body);

        // authenticate
        const { accessToken, refreshToken } = generateTokens(user.phone);
        // await storeRefreshToken(user.id, refreshToken);

        // setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            message: "کاربر با موفقیت ایجاد شد",
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            token:accessToken
        });

    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: error.message });
    }
};

// ! login a user
export const login = async (req, res) => {
    try {
        const user = await userExist(req.body.phone);

        if (user && (await comparePassword(req.body.password, user.password))) {
            const { accessToken, refreshToken } = generateTokens(user.phone);
            // await storeRefreshToken(user.id, refreshToken);
            // setCookies(res, accessToken, refreshToken);

            res.json({
                message: 'ورود با موفقیت انجام شد', user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                },
                token:accessToken
            });
        } else {
            res.status(400).json({ message: "شماره تلفن یا رمز عبور اشتباه است" });
        }
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: error.message });
    }
};

// ! logout a user
export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {

            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await userExist(decoded.userId);
            await db.RefreshToken.destroy({ where: { user_id: user.id } });

            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.json({ message: "خروج موفقیت آمیز بود" });
        }
        return res.status(401).json({ message: "شما قبلا خارج شده اید" });

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//! this will refresh the access token
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "توکنی یافت نشد" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await userExist(decoded.userId);
        const storedToken = await db.RefreshToken.findOne({ where: { user_id: user.id } });

        if (storedToken?.token !== refreshToken) {
            return res.status(401).json({ message: "توکن نامعتبر است" });
        }

        if (storedToken.expiresAt < new Date()) {
            await storedToken.destroy();
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(401).json({ message: "توکن منقضی شده است" });
        }


        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        return res.json({ message: "توکن جدید بازیابی شد" });

    } catch (error) {
        console.log("Error in refreshToken controller", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ! get user profile
export const getProfile = async (req, res) => {
    try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};