import express from 'express'; 
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import db from './models/index.js';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';

dotenv.config();

// ! init app
const app = express(); 
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
 
app.use(cors({
    origin: true, 
    credentials: true, 
}));

// ! middleware
app.use((req, res, next) => {
    console.log( req.method, req.path);
    next();
});

// ! routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);


// ! start server
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
})

