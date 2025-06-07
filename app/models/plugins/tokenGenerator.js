import jwt from 'jsonwebtoken'

const tokenGenerator = (schema) => {

    schema.methods.getAccessToken = function () {
        const token = jwt.sign(
            { id: this._id },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );
        return token;
    };

    schema.methods.getRefreshToken = function () {
        const token = jwt.sign(
            { id: this._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        return token;
    };
};

export default tokenGenerator