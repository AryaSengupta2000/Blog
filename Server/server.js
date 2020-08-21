
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const uri = ''

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology:true

})

mongoose.connection.on('connected',() => {
    console.log("DB connected!");
})

const schema = mongoose.Schema;
const Blogpostschema = new schema({
    name : String,
    write: String
});

const Blogpost = mongoose.model("BlogPost", Blogpostschema);

app.get('/' ,(req,res) => {
    
    Blogpost.find({  })
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

});


app.get('/posts' ,(req,res) => {
    
    Blogpost.find({  })
    .then((posts) => {
        res.json(posts);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

});

app.post('/nugget',(req,res)=>{
    console.log(typeof(req.body.name));
    const createdentry = {
        name: req.body.name.toString(),
        write: req.body.write.toString(),
        created : new Date()
    };
    console.log(createdentry);
    const newBlogPost = new Blogpost(createdentry);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            createdentry
        });
    });
});

app.listen(5000, () => {
    console.log("listening");
});