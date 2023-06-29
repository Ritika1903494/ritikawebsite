const nodemailer = require('nodemailer');
const empModel=require("../model/emp_schema")
const otpGenerator = require('otp-generator');

generateOTP = () => {
  const OTP = otpGenerator.generate(6, {digits:true,lowerCaseAlphabets:true,
    upperCaseAlphabets: true, specialChars: true});
    
  return OTP;
};
  const transporter = nodemailer.createTransport({
    service:'gmail',
    method:'secure',
    auth:{
      user:'ritikathakur05082001@gmail.com',
      pass: 'evxyhfpmpkrjhymy',
    }
  });

  const otp=generateOTP();
  
  module.exports.sendMail = async (req,res) => {
    const user_email=req.body.email;
    try {
      const user=await empModel.findOne({email:user_email})
      console.log(user);
      if(!user){
       return res.status(422).send({message:"email is not valid"})
      } 
      let info = await transporter.sendMail({
        from:'ritikathakur05082001@gmail.com',
        to: user_email,
        subject: 'Hello',
        text: otp,
      });
      await empModel.updateOne({email:user_email},{$set:{otp:otp}})
      return res.status(200).send(info);
    } catch (error){
     return  res.status(422).send({message:"email is not valid"});
    }
  };

  module.exports.verifyMail=async(req,res) =>{
    const user_otp=req.body.otp;
    console.log(user_otp);
    try{
      console.log("aaa")
      const db_otp=await empModel.findOne({otp:user_otp})
      console.log(db_otp.otp);
      if(user_otp!==db_otp.otp){
      return res.status(422).send({message:"otp is not valid "});
    }
    else{
      return res.status(200).send("congo");
    }
  }
    catch(error){
      return  res.status(422).send({message:"otp is not valid "});
    }

  }


  module.exports.updatePass=async(req,res) =>{
     const update=req.body.newpassword;
    const url_email=req.params.email;
      console.log(url_email)
      const result= await empModel.updateOne({email:url_email},{$set:{password:update}})
  try{
      
      res.status(200).send({result:result})
  }
  catch(error){
      res.status(500).send(error)
  }
  }