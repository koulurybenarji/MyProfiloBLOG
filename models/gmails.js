const mongoose=require('mongoose');
const gmailschema=new mongoose.Schema(
    {
      name:
      {
         type: String,
         required:true
      },
      gmail:
       {
           type:String
       }  
    }
)  

const Gmail=mongoose.model('Gmail',gmailschema);

module.exports=Gmail; 
