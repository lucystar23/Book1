const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://yeonak6:Alma123@cluster0.lfv1yya.mongodb.net/BookDb?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to the db")
})
.catch((err)=>console.log(err))

var Schema=mongoose.Schema;
var bookSchema=new Schema({
    bname:String,
    isbnn:Number,
    price:Number,
    author:String,
    genre:String
    
    
});

let bookModel=mongoose.model('bookDetails',bookSchema);

module.exports=bookModel;
