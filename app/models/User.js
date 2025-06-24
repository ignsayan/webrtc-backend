import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import Permission from './Permission.js';
import Role from './Role.js';
import emailVerification from './plugins/emailVerification.js';
import phoneVerification from './plugins/phoneVerification.js';
import tokenGenerator from './plugins/tokenGenerator.js';
import { PROVIDER } from '../../configs/constants.js';
import bcrypt from 'bcrypt';

const transform = (doc, rec) => {
    delete rec.password;
    delete rec.id;

    const attributes = (arr) =>
        Array.isArray(arr) ? arr.map(item => item.name) : [];

    if (rec.roles) {
        rec.roles = attributes(rec.roles);
    }
    if (rec.permissions) {
        rec.permissions = attributes(rec.permissions);
    }
    return rec;
};

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        index: true,
        sparse: true,
        unique: null,
    },
    password: {
        type: String,
    },
    email_verified_at: {
        type: Date,
        default: null,
    },
    phone_verified_at: {
        type: Date,
        default: null,
    },
    auth_provider: {
        type: String,
        default: PROVIDER.LOCAL,
    },
    remember_token: {
        type: String,
        default: null,
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Role
    }],
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Permission
    }],
}, {
    timestamps: true,
    toJSON: { virtuals: true, transform },
    toObject: { virtuals: true, transform },
});

schema.pre(/^find/, function () {
    this.populate('roles', 'name -_id')
        .populate('permissions', 'name -_id');
});

schema.pre('save', async function (next) {
    if (this.isModified('password') && this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

schema.plugin(mongoosePaginate);
schema.plugin(emailVerification);
schema.plugin(phoneVerification);
schema.plugin(tokenGenerator);

const User = mongoose.model('User', schema);
export default User;