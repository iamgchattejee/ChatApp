import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndSetCookie;