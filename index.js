const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cookieSession = require('cookie-session');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const app = express();

const keys = require('./config/keys');
const PORT = 5000;

app.use(express.json());
app.use(cookieSession({
    maxAge:24 * 60 * 60 * 1000,
    keys:keys.cookieKeys
}));

const conn = mongoose.createConnection(keys.dbURL);
module.exports = conn;

let gfs;

conn.once('open',()=>{
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
});

const storage = new GridFsStorage({
    url:keys.dbURL,
    file: (req, file) => {
        return {
        filename: req.session.id + '_' + req.session.tests + '_' + file.originalname,
        bucketName: 'uploads'
        };
    }
});
const upload = multer({ storage });

app.post('/upload-file', upload.array('file'), (req,res)=>{

    res.send({});

});

const userSchema = new Schema({
    type:String,
    name:String,
    email:String,
    password:String,
    tests:Number
});

const User = conn.model('Users',userSchema);

const testSchema = new Schema({
    user:String,
    name:String,
    task:String,
    start:Number,
    buttons:Number,
    pages:[{
        src:String,
        button:{
            next:Number,
            top:Number,
            left:Number,
            width:Number,
            height:Number
        }
    }],
    responses:Array
});

const Test = conn.model('Tests', testSchema);

module.exports = {
    Test,
    User
}

app.post('/upload-test', async (req,res)=>{
     const { user, name, task, pages, start, buttons } = req.body;

     const newTest = new Test({
         user,
         name,
         task,
         pages,
         start,
         buttons,
         responses:[]
     });
     newTest.save();

     await User.updateOne({ _id : req.session.id }, { $inc : { tests : 1 } }).exec();

     req.session.tests = req.session.tests + 1;

     res.send({});
})

app.post('/update-test',async (req,res)=>{
    const { feedback, id } = req.body;

    console.log(id);
    
    await Test.updateOne({ _id : id }, { $push : { responses : feedback } }).exec();

    res.send({});
});

app.get('/user-tests', async (req,res)=>{

    const user = req.session.id;

    const result = await Test.find({user : user});

    res.send(result);

});

app.get('/tests', (req,res)=>{

   Test.find({}, (err, docs)=>{
       if(err){
           return console.log(err);
       }

       res.send(docs);
   });

});

app.get('/images/:filename',(req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if(!file || file.length === 0){
            return res.status(404).json({
                err:'No files'
            });
        };

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    })
})

require('./routes/authRoutes')(app);

app.listen(PORT);
