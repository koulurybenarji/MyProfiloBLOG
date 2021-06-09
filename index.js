const express=require('express');
const app=express();
const path=require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
const Gmail=require('./models/gmails');
const Article=require('./models/articles');
const methodoverride=require('method-override');
app.use(methodoverride('_method'));
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');
const catchasync=require('./utility/catchasync')
app.engine('ejs',ejsMate);
mongoose.connect('mongodb://localhost:27017/myprofilo',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>
    {
        console.log("connceted to database");
    })
.catch(er=>
    {
        console.log(`something went worng ${er}`);
    })    
app.get('/home',(req,res)=>
{
    res.render('home');
})
app.get('/gmail',async(req,res)=>
{
    res.render('gmail');
})
app.post('/gmail',async(req,res)=>
{
    const mail=new Gmail(req.body);
    await mail.save();
    res.render('tq',{mail});
})
app.put('/article/:id',async(req,res)=>
{
    const {id}=req.params;
    const article=await Article.findByIdAndUpdate(id,{...req.body.article},{new:true});
    res.redirect(`/article/${article._id}`);
})
app.delete('/article/:id',async(req,res)=>
{
    const {id}=req.params;
    const article=await Article.findByIdAndDelete(id);
    console.log(id)
    res.redirect('/articles');
})
app.get('/article',(req,res)=>
{
   res.render('article');
})
app.get('/articles',async(req,res)=>
{
  const articles=await Article.find({});  
  res.render('articles',{articles});
})
app.get('/article/:id',async(req,res)=>
{
    const article= await Article.findById(req.params.id);
    res.render('show',{article});
})
app.post('/article',async(req,res)=>
{
  const article=new Article(req.body);
  await article.save();
  res.redirect(`/article/${article._id}`)

})
app.get('/article/:id/edit',async(req,res)=>
{
    const article=await Article.findById(req.params.id);
    res.render('edit',{article});

})
app.listen(8000,()=>
{
    console.log("listening on 8000 port");
})
