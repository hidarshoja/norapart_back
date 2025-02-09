import db from '../models/index.js'
import bcrypt from "bcryptjs";
import {userExistById} from "../services/user.service.js";
import {Op} from "sequelize";

// ! get all users info
export const index = async (req, res) => {
    console.log(req.query)
    const { page=1,limit=10,all=false } = req.query;

    const user_id = req.user.id;
    const attributes = { exclude: ['password','createdAt','updatedAt'] };
    try{
        if (all === 'true') {
            const users = await db.User.findAll({where:{id: {[Op.ne]: user_id}},attributes}); // Fetch all users
            return res.status(200).send(users);
        }

        const offset = (page - 1) * limit;

        const { rows: users, count: total } = await db.User.findAndCountAll({
            order: [['id', 'DESC']],
            offset: parseInt(offset, 10),
            limit: parseInt(limit, 10),
            where:{id: {[Op.ne]: user_id}},
            attributes
        });

        // Send paginated response
        res.status(200).send({
            data: users,
            pagination: {
                currentPage: parseInt(page, 10),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
            },
        });
    }catch(err){
        console.log(err);
        res.status(500).send({error:err.message});
    }
}

// ! get single user
export const show = async (req, res) => {
    try{
        const {user_id} = req.params;
        const user= await db.User.findByPk(user_id);

        if (!user) {
            return res.status(404).send({error:"کاربری یافت نشد"});
        }
        return res.status(200).json(user)
    }catch(err){
        console.log(err);
        res.status(500).send({error:err.message});
    }
}

// ! change active or inactive a user
export const changeStatus = async (req, res) => {
    const {user_id} = req.params;
    try{
        const user = await userExistById(user_id)
        if (!user) {
            return  res.status(401).send({error:"کاربری یافت نشد"});
        }

        if (user.statuse === 'active'){
            await user.update({statuse: 'inactive'});
            return  res.status(200).send({message:'وضعیت با موفقیت تغییر کرد',user});
        }
        await user.update({statuse: 'active'});
        return  res.status(200).send({message:'وضعیت با موفقیت تغییر کرد',user});
    }catch(err){
        console.log(err);
       return res.status(500).send({error:err.message});
    }
}

// ! change password of account
export const changePassword = async (req, res) => {
    const {user_id} = req.params;
    try{
        const user = await userExistById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'کاربری یافت نشد' });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(402).json({ message: 'رمز فعلی نادرست است' });
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        await user.update({password: req.body.password});
        return  res.status(200).send({message:'پسوورد با موفقیت تغییر کرد'});

    }catch (err){
        console.log(err)
        return res.status(500).send({error:err.message});
    }
}

// ! change users profile
export const changeProfile = async (req, res) => {
    const {user_id} = req.params;
    try{
        const user = await userExistById(user_id)
        if (!user) {
            return res.status(404).json({message: 'کاربری یافت نشد'})
        }
        await user.update(req.body);
        return res.status(200).json({message:'اطلاعات با موفقیت ویرایش گردید',user})
    }catch(err){
        console.log(err);
        return res.status(500).send({error:err.message});
    }
}

// ! make a user role as admin or user
export const changeRole = async (req, res) => {
    const {user_id} = req.params;
    try{
        const user = await userExistById(user_id)
        if (!user) {
            return res.status(404).json({message: 'کاربری یافت نشد'})
        }


        if (user.role === 'admin'){
            await user.update({role: 'user'});
            return  res.status(200).send({message:'نقش کاربر  با موفقیت تغییر کرد'});
        }
        await user.update({role: 'admin'});
        return  res.status(200).send({message:'نقش کاربر با موفقیت تغییر کرد'});

    }catch (err){
        console.log(err)
        return res.status(500).send({error:err.message});
    }
}
