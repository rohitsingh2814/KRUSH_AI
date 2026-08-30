const jwt =require("jsonwebtoken");

const generateToken=(userId)=>{
    return jwt.sign(
        {userId},
        process.env.JWT_secret,{
            expiresIn:"7d"
        }
    );
};

module.exports=generateToken;