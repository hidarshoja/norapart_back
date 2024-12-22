import fs from 'fs';
import path from 'path';

async function saveImageCategory(base64Image, productName) {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const normalizedDirname = __dirname.startsWith('/') ? __dirname.slice(2) : __dirname;
    const storagePath = path.resolve(normalizedDirname, '..', 'storage', 'categories');

    // Ensure the 'storage/products' directory exists
    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath, { recursive: true });
    }

    const timestamp = Date.now();
    const imageName = `${productName.replace(/\s+/g, '_')}_${timestamp}.png`;

    const matches = base64Image.match(/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/);
    if (matches && matches.length === 3) {
        const imageBuffer = Buffer.from(matches[2], 'base64');
        const imagePath = path.join(storagePath, imageName);

        // Return a promise that resolves with the image path
        return new Promise((resolve, reject) => {
            fs.writeFile(imagePath, imageBuffer, (err) => {
                if (err) {
                    console.error('Error saving image:', err);
                    reject(err);
                } else {
                    console.log('Image saved:', imagePath);
                    resolve(`/categories/${imageName}`); // Return the relative image path as a string
                }
            });
        });
    } else {
        console.error('Invalid base64 string:', base64Image);
        return null;
    }
}

export default saveImageCategory;
