import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (res,token) => {
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === "production",
        path: '/',
    });
};

export default generateTokenAndSetCookie;