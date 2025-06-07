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
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }],
}, {
    timestamps: true,
});

schema.pre('save', function (next) {
    this.name = slugify(this.name, { lower: true });
    next();
});

const Role = mongoose.model('Role', schema);
export default Role;