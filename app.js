import express from 'express'; 
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from 'path';
import dotenv from 'dotenv';
import db from './models/index.js';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import provinceRoutes from './routes/province.routes.js';
import orderRoutes from './routes/order.routes.js';
import settingRoutes from './routes/setting.routes.js';
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import ProductCommentRoutes from "./routes/product-comment.routes.js";
import contactRoutes from "./routes/contact.routes.js";



dotenv.config();

// ! init app
const app = express(); 
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
 
app.use(cors({
    origin: true, 
    credentials: true, 
}));

// ! static
const storagePath = path.join('storage', 'products');
const categoryPath = path.join('storage', 'categories');
const blogPath = path.join('storage', 'blogs');

app.use('/products', express.static(storagePath));
app.use('/categories', express.static(categoryPath));
app.use('/blogs', express.static(blogPath));

// ! middleware
app.use((req, res, next) => {
    console.log( req.method, req.path);
    next();
});

// ! routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/province", provinceRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/product-comment", ProductCommentRoutes);
app.use("/api/contact", contactRoutes);

// ! start server
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
})

