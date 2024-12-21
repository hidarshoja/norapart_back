import { v4 as uuidv4 } from 'uuid';
import db from '../models/index.js';

export const generateSlug = async(name) => {
    let slug = name
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^آ-یa-zA-Z0-9-]/g, '');

    
    const existingProduct = await db.Product.findOne({ where: { slug } });
    if (existingProduct) {
        slug = `${slug}-${uuidv4().slice(0, 8)}`; // Append a unique identifier
    }

    return slug;
};

