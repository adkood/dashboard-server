const jwt = require('jsonwebtoken');

exports.login = (req, res) => {

    // Checking if the user is already authenticated
    const existingToken = req.cookies.jwt;

    if (existingToken) {
        try {
            jwt.verify(existingToken, process.env.JWT_SECRET);
            // User is already logged in
            return res.status(200).json({ status: 'success', message: 'User is already logged in' });
        } catch (error) {
            return res.status(401).json({ status: 'error', error: 'Need to login !' });
        }
    }

    // User is not logged in
    const { password } = req.body;

    if (process.env.ENTRY_PASSWORD === password) {
        const token = createJwt(process.env.ENTRY_PASSWORD);

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        // In production, setting the 'secure' option for HTTPS
        if (process.env.NODE_ENV === 'production') {
            options.secure = true;
        }

        res.cookie('jwt', token, options);
        res.status(200).json({ status: 'success', message: 'Khull ja sim sim' });
    } else {
        res.status(401).json({ status: 'error', error: 'Wrong password!' });
    }
};


exports.protect = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ status: 'error', error: 'Unauthorized - No token provided' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', error: 'Unauthorized - Invalid token' });
    }
};

