import db from "../models/index.js";

export const index = async(req, res) => {
    const { page=1 , limit=100 } = req.query;
    const offset = (page - 1) * limit;
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
        current_price: product.price_with_off ?? product.price,
        old_price: product.price,
        availability: product.amount > 0 ? "instock" : "outofstock",
        category_name:  product.categories.name,
        image_link: `${process.env.BACKEND_URL}` + product.images[0].image_url,
        image_links: product.images.map(image => `${process.env.BACKEND_URL}` + image.image_url),
        page_url: `${process.env.BACKEND_URL}` + `/api/v1/torob/product/${product.slug}`,
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
        current_price: product.price_with_off ?? product.price,
        old_price: product.price,
        availability: product.amount > 0 ? "instock" : "outofstock",
        category_name:  product.categories.name,
        image_link: `${process.env.BACKEND_URL}` + product.images[0].image_url,
        image_links: product.images.map(image => `${process.env.BACKEND_URL}` + image.image_url),
        page_url: `${process.env.BACKEND_URL}` + `/api/v1/torob/product/${product.slug}`,
    });
};

// {
//     "count": "150",
//         "max_pages": "2",
//             "products": [
//                 {
//                     "title": "گوشی موبایل شائومی Note 10 Pro",
//                     "subtitle": "Xiaomi Mi Note 10 Pro"
//             "page_unique": "12412",
//                     "current_price": "5000000",
//                     "old_price": "5500000",
//                     "availability": "instock",
//                     "category_name": "mobile",
//                     "image_link": "https://domain.com/images/test.jpg",
//                     "image_links": [
//                         "https://domain.com/images/test.jpg",
//                         "https://domain.com/images/test-2.jpg",
//                     ],
//                     "page_url": "https://domain.com/product/34/",
//                     "short_desc": "دارای سنسور تشخیص چهره",
//                     "spec": {
//                         "memory": "4GB",
//                         "camera": "12 مگاپیکسل",
//                         "color": "سفید",
//                         ...
//             },
//                     "registry": "رجیستر شده",
//                     "guarantee": "گارانتی 24 ماه سازگار"
//                 },
//                 ... 
// }