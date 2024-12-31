import db from "../models/index.js";

export const create = async(req,res)=>{
    const {formData} = req.body
   try{
      const total_price_db = await db.TotalPrice.create({total_price:req.body.total_price})
       for (const cart of req.body.cart) {
            await db.Order.create({
               user_id:req.body.user_id,
               product_id:cart.product_id,
                amount : cart.amount,
               total_price_id:total_price_db.id,
               price:cart.price
           })
       }

       const address= await db.Address.create({
           user_id : req.body.user_id,
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

       return res.status(201).json({message: 'سفارش شما ثبت شد'})

   }catch (e) {
       console.log(e)
   }
}