import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new mongoose.Schema({
    ref_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    ref_model: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

schema.plugin(mongoosePaginate);

const Media = mongoose.model('Media', schema);
export default Media;