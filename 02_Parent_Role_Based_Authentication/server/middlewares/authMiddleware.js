const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    try {
       const authHeader = req.headers.authorization;

       if(!authHeader || !authHeader.startsWith("Bearer ")){
           return res.status(401).json({message:"not authenticated"});
       };
   
       const token = authHeader.split(" ")[1];

       req.user = jwt.verify(token, "vijay@1234");

       console.log("auth middleware");

       next();

    } catch (error) {
       return res.status(401).json({message:"invalid token"});
    }
}


module.exports = authMiddleware;