import jwt from 'jsonwebtoken';

export const protectRoute = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            if(!decoded){
                res.clearCookie("jwt");
                return res.status(401).json({
                    message: "Unauthorized"
                })
            }
            req.userId = decoded.userid;
            //console.log(decoded)
            next();
        }
        else{
            return res.status(401).json({
                message: "Unauthorized"
            })
        } 
    }
    catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }
};