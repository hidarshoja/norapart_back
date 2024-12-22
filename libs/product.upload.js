import fs from 'fs';
import path from 'path';

async function saveImages(base64Images, productName) {
    const imagePromises = [];

    const storagePath = path.resolve(process.cwd(), 'storage', 'products');

    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath, { recursive: true });
    }


    for (let index = 0; index < base64Images.length; index++) {
        const base64String = base64Images[index];
        const timestamp = Date.now();
        const imageName = `${productName.replace(/\s+/g, '_')}_${timestamp}_${index}.png`;

        const matches = base64String.match(/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/);
        if (matches && matches.length === 3) {
            const imageBuffer = Buffer.from(matches[2], 'base64');
            const imagePath = path.join(storagePath, imageName);


            const imageSavePromise = new Promise((resolve, reject) => {
                fs.writeFile(imagePath, imageBuffer, (err) => {
                    if (err) {
                        console.error('Error saving image:', err);
                        reject(err);
                    } else {
                        console.log('Image saved:', imagePath);
                        resolve(`/products/${imageName}`);
                    }
                });
            });


            imagePromises.push(imageSavePromise);
        } else {
            console.error('Invalid base64 string:', base64String);
        }
    }


    const savedImagePaths = await Promise.all(imagePromises);

    return savedImagePaths;
}

export default saveImages;
