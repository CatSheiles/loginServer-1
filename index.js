const express = require('express')
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.text({type:"text/plain"}));


let users = [];


app.get('/', (req, res)=>{
    console.log("GET / ")
    res.status(200).sendFile(path.join(__dirname + '/index.html'));
})


app.post('/register', (req, res)=>{
    console.log('PUT /register ' + JSON.stringify(req.body));
    if(req.body) users.push(req.body);

    console.log(users);
})


app.post('/salt', (req, res)=>{
    console.log(req.body);
    for(let i = 0; i < users.length; i++)
    {
        if(req.body.usr === users[i].usr)
        res.json({salt:users[i].salt});
    }

    //res.sendStatus(404)
})

app.post('/login', (req, res)=>{
    console.log(req.body);

    let success = false;
    for(let i = 0; i < users.length; i++)
    {
        if(req.body.usr === users[i].usr && req.body.password === users[i].password)
        {
            res.json({login:"success"});
            success = true;
        }
    }

    if(!success) res.json({login:"Failed"});
})


app.listen(80, ()=>{
    let date = new Date();

    console.log(`Server started on port 80 at ${date.getHours()}:${date.getMinutes()}`);
})