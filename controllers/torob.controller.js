import db from "../models/index.js";

export const index = async (req, res) => {
    const { page = 1, limit = 100, page_unique, page_url } = req.body;
    const offset = (page - 1) * limit;
    let productCondition = null;

    // بررسی حالت تک محصول
    if (page_unique) {
        productCondition = { id: page_unique };
    } else if (page_url) {
        const slug = page_url.split('/').filter(part => part).pop(); // آخرین بخش URL
        productCondition = { slug: slug };
    }

    // اگر درخواست تک محصول باشد
    if (productCondition) {
        const product = await db.Product.findOne({
            where: productCondition,
            include: [
                {
                    model: db.Category,
                    as: "categories",
                    attributes: ["name"],
                },
                {
                    model: db.ProductImage,
                    as: "images",
                    attributes: ["image_url"],
                },
            ],
        });

        if (!product) {
            return res.status(404).json({ message: "محصول پیدا نشد." });
        }

        const newProduct = {
            title: product.name,
            page_unique: product.id,
            current_price: !product.price_with_off || product.price_with_off === ''
                ? product.price
                : product.price_with_off,
            old_price: product.price,
            availability: product.amount > 0 ? "instock" : "outofstock",
            category_name: product.categories.name || "",
            image_link: `${process.env.BACKEND_URL}${product.images[0].image_url}`,
            image_links: product.images.map(image => `${process.env.BACKEND_URL}${image.image_url}`),
            page_url: `${process.env.FRONTEND_URL}/product/${product.slug}/`,
        };

        return res.status(200).json({
            count: 1,
            max_pages: 1,
            products: [newProduct], // به‌صورت لیستی با یک محصول
        });
    }

    // اگر درخواست لیست محصولات باشد
    const products = await db.Product.findAll({
        offset,
        limit,
        include: [
            {
                model: db.Category,
                as: "categories",
                attributes: ["name"],
            },
            {
                model: db.ProductImage,
                as: "images",
                attributes: ["image_url"],
            },
        ],
        order: [["createdAt", "DESC"]],
    });

    const newProducts = products.map(product => ({
        title: product.name,
        page_unique: product.id,
        current_price: !product.price_with_off || product.price_with_off === ''
            ? product.price
            : product.price_with_off,
        old_price: product.price,
        availability: product.amount > 0 ? "instock" : "outofstock",
        category_name: product.categories.name || "",
        image_link: `${process.env.BACKEND_URL}${product.images[0].image_url}`,
        image_links: product.images.map(image => `${process.env.BACKEND_URL}${image.image_url}`),
        page_url: `${process.env.FRONTEND_URL}/product/${product.slug}/`,
    }));

    res.status(200).json({
        count: products.length,
        max_pages: Math.ceil(products.length / limit),
        products: newProducts,
    });
};


export const show = async(req, res) => {
    const { slug } = req.params;
    const product = await db.Product.findOne({ 
        where: { slug } ,
        include: [
            {
                model: db.Category,
                as: "categories",
                attributes: ["name"],
            },
            {
                model: db.ProductImage,
                as: "images",
                attributes: ["image_url"],
            },
        ],
    });
    res.status(200).json({
        title: product.name,
        subtitle: product.name,
        page_unique: product.id,
        current_price: !product.price_with_off || product.price_with_off === '' ? product.price : product.price_with_off,
        old_price: product.price,
        availability: product.amount > 0 ? "instock" : "outofstock",
        category_name:  product.categories.name,
        image_link: `${process.env.BACKEND_URL}` + product.images[0].image_url,
        image_links: product.images.map(image => `${process.env.BACKEND_URL}` + image.image_url),
        page_url: `${process.env.BACKEND_URL}` + `/api/v1/torob/product/${product.slug}`,
    });
};
