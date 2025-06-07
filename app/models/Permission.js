import mongoose from 'mongoose';
import slugify from 'slugify';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: value => /^[a-z0-9\-]+$/.test(value),
            message: props => `${props.value} is not a valid slug`,
        }
    },
}, {
    timestamps: true,
});

schema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Permission = mongoose.model('Permission', schema);
export default Permission;