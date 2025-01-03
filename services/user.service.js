import db from "../models/index.js"
import bcrypt from "bcryptjs";


export const userExist = async (phone) => {
    const user = await db.User.findOne({ where: { phone } });
    return user;
}

export const userExistById = async (id) => {
    const user = await db.User.findOne({ where: { id }, attributes: {exclude:['password','createdAt','updatedAt']} });
    return user;
}

export const createNewUser = async (body) => {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    const user = await db.User.create({ 
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone,
        password: body.password
     });
    return user;
}