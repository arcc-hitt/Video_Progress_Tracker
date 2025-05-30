// Description: Cloudinary configuration for video uploads and management
import { v2 as cloudinary } from 'cloudinary';
import env from './env';

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME || '',
    api_key: env.CLOUDINARY_API_KEY || '',
    api_secret: env.CLOUDINARY_API_SECRET || '',
    secure: true,
});

export default cloudinary;
