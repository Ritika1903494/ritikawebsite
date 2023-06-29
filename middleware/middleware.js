
const jwt=require('jsonwebtoken');
module.exports=(req,res,next) =>{
    try{
    let token=req.headers['authorization'];
    let original_token=token.split(' ');
    console.log(original_token)
    let final_token=original_token[1];
    console.log(final_token)
    if(!final_token){
        return res.status(403).send({message:"token is not present "})
    }

    jwt.verify(final_token,"rerfvgfvgmgmhbjhnjkikmiouuytyrerer",(error,decoded) =>{

        if(error){
            console.log(error);
            return res.status(401).send({status:401,message:"unauthorized"})
        }
         console.log(decoded);
        req.userid=decoded._id;
        next();
    }
    )
    
}
 catch(error){
    console.log(error)
    return res.status(401).send({message:"invalid token "})
 }
}


