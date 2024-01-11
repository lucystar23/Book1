const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://yeonak6:Alma123@cluster0.lfv1yya.mongodb.net/BookDb?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to the db")
})
.catch((err)=>console.log(err))

var Schema=mongoose.Schema;
var feedSchema=new Schema({
    uname:String,
    email:Number,
    bkname:String,
    feed:String,
    rating:String,
    
});

let feedModel=mongoose.model('feedbackDetails',feedSchema);

module.exports=feedModel;
