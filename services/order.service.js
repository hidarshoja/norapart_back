import db from "../models/index.js";

export const getAllOrders = async(db)=>{
    const totalPrices = await db.TotalPrice.findAll({
        include: [
            {
                model: db.Address,
                as: 'address', // Alias for the Address model
                attributes: ['id', 'address', 'phone', 'postal_code'], // Select specific address fields
                include: [
                    {
                        model: db.City, // City model
                        as: 'city', // Alias for City
                        attributes: ['id', 'name'], // Include city name
                    },
                    {
                        model: db.Province, // Province model
                        as: 'province', // Alias for Province
                        attributes: [ 'name'], // Include province name
                    },
                    {
                        model: db.User, // User model
                        as: 'user', // Alias for User
                        attributes: [ 'first_name', 'last_name', 'phone'], // Include user details
                    },
                ],
            },
            {
                model: db.Order,
                as: 'orders', // Alias for the Order model
                attributes: [ 'amount', 'price', 'statuse'], // Include order fields
                include: [
                    {
                        model: db.Product, // Product model
                        as: 'product', // Alias for Product
                        attributes: ['id', 'name'], // Include product fields
                        include: [
                            {
                                model: db.Category,
                                as: 'categories',
                                attributes: ['name']
                            },
                        ]
                    },
                ],
            },
        ],
        attributes: ['id', 'total_price']
    });

    return totalPrices
}

//! create an orders
export const createOrders = async (db,body) =>{
    const {formData,cart:carts,total_price,user_id} = body

    const total_price_db = await db.TotalPrice.create({total_price:total_price})
    for (const cart of carts) {
        await db.Order.create({
            user_id:user_id,
            product_id:cart.product_id,
            amount : cart.amount,
            total_price_id:total_price_db.id,
            price:cart.price
        })
    }

    const address= await db.Address.create({
        user_id : user_id,
        province_id : formData.province_id,
        city_id : formData.city_id,
        address : formData.address,
        phone : formData.phone === '' ? null : formData.phone,
        postal_code : formData.postal_code
    })

    await  db.TotalPrice.update({address_id:address.id},{
        where:{
            id : total_price_db.id
        }
    })
}