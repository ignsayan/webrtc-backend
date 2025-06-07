import cloudinary from '../../configs/cloudinary.js';
import { MEDIA } from '../../configs/constants.js';
import Media from '../models/Media.js';

const upload = async ({
    buffer,
    folder = 'uploads',
    refId,
    refModel,
    type = MEDIA.TYPE.GENERAL,
    user,
}) => {
    if (!buffer || !refId || !refModel || !user) {
        throw new Error('Missing required parameters for media upload.');
    }
    const file = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader
            .upload_stream({ folder }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        stream.end(buffer);
    });
    const media = await Media.create({
        ref_id: refId,
        ref_model: refModel,
        type,
        user,
        url: file.secure_url,
        public_id: file.public_id,
    });
    return media
};

const remove = async (publicIds) => {
    if (!Array.isArray(publicIds) || publicIds.length === 0) {
        throw new Error('Missing or invalid public IDs');
    }
    await Media.deleteMany({ public_id: { $in: publicIds } });
    await cloudinary.api.delete_resources(publicIds);
};

export default { upload, remove };