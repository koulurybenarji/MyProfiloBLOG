const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const articlesachema=new Schema(
    {
        title:String,
        link:String,
        Description:String
    }
)
const Article=mongoose.model('Article',articlesachema);
module.exports=Article;

