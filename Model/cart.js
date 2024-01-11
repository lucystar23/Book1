const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://yeonak6:Alma123@cluster0.lfv1yya.mongodb.net/BookDb?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to the db")
})
.catch((err)=>console.log(err))

var Schema=mongoose.Schema;
var cartSchema=new Schema({
    bname:String,
    isbnn:Number,
    price:Number,
    author:String,
    genre:String
    
    
});

let cartModel=mongoose.model('cartDetails',cartSchema);

module.exports=cartModel;
