const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple Node Server Running');
});

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://IstiackAmin:uwPdKzbpUENFDIYC@cluster0.3i08lek.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("simpleNode").collection("users");
  // perform actions on the collection object
  console.log('Database connected');
  client.close();
});

// username: IstiackAmin
// password: uwPdKzbpUENFDIYC

const users = [
    {id: 1, name: 'Rohan', email: 'rohan@gmail.com'},
    {id: 2, name: 'Borhan', email: 'borhan@gmail.com'},
    {id: 3, name: 'Shohan', email: 'shohan@gmail.com'}
]

app.get('/users', (req, res) => {
    const search = req.query.name;
    if (req.query.name) {
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) > 0);
        res.send(filtered);
    }
    else {
        res.send(users);
    }
})

app.post('/users', (req, res) => {
    console.log('Post API called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user);
})

app.listen(port, () => {
    console.log(`Simple node server running on port: ${port}`);
})