import db from "../models/index.js";

export const index = async(req,res) => {
  try{
      const province = await db.Province.findAll({
          include: [
              {
                  model: db.City,
                  as: 'cities',
                  attributes: ['id', 'name']
              },
          ]
      })
      return res.status(200).json({message: '',province})
  }catch (e) {
      console.log(e)
  }
}
