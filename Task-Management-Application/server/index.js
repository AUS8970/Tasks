const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require('bcrypt');
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://hero-employee-management-aus.web.app' : 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
 };

app.options("*", cors());
app.use(express.json());

const uri = `${process.env.mongodbUri}`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

console.log(uri)

async function run() {
  try {
    // await client.connect();

    const userCollection = client.db("tasksDB").collection("users");
    const tasksCollection = client.db("tasksDB").collection("tasks");

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign( { email: user.email, role: user.role }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '1h' });
      res.send({ token });
    });

    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized access" });
      };

      const token = req.headers.authorization?.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Token expired" });
        }
        req.user = decoded;
        next();
      });
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.user.email;
      const query = { email : email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === 'Admin';
      if(!isAdmin){
        return res.status(403).send({ message: 'Forbidden Access'});
      }
      next();
    };

    app.post('/login', async(req, res) => {
      const { email, password } = req.body;
      const user = await userCollection.findOne({ email });

      if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }
    
      if (user.status === 'Fired') {
        return res.status(403).send({ message: 'Your account has been deactivated. Please contact the administrator.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }
    
      res.send(user);
    });

    app.post("/logout", async (req, res) => {
      const user = req.body;
      console.log("logging out", user);
      res.clearCookie("token", { ...cookieOptions, maxAge: 0 }).send({ success: true });
    });

    // users releted api
    app.get('/users', verifyToken, async(req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    });
    
    app.get('/users/:email', verifyToken, async(req, res) => {
      const { email } = req.params;
      const result = await userCollection.findOne({ email: email });
      res.send(result);
    });

    app.get('/users/role/:email', async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email });
      res.send({ role: user?.role || 'Employee' });
    });

    app.post('/users', async(req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if(existingUser){
        return res.send({message: 'user already exists', insertedId: null});
      };
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch('/users/:id', async(req, res) => {
      const id = req.params.id;
      const { isVerified } = req.body;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: { isVerified: isVerified }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result);
    });

    // TODO: Not Working
    app.patch('/users/:email', async(req, res) => {
      const data = req.body;
      const filter = { email: req.params.email };
      const updatedDoc = {
        $set: {
          name: data.name,
          designation: data.designation,
          salary: data.salary,
          bank_account_no: data.bank_account_no,
          role: data.role,
          image: data.image,
        }
      };
      const result = await userCollection.updateOne(filter, updatedDoc);
      console.log("Update Result:", result);
      res.send(result);
    });

    app.get('/tasks', verifyToken, verifyAdmin, async(req, res) => {
      const result = await tasksCollection.find().toArray();
      res.send(result);
    });

    app.get('/tasks/:email', verifyToken, async(req, res) => {
      const { email } = req.params;
      if (email !== req.user.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      const result = await tasksCollection.find({ "employee.email": email }).toArray();
      res.send(result);
    });

    app.post('/tasks', verifyToken, async(req, res) => {
      const work = req.body;
      const result = await tasksCollection.insertOne(work);
      res.send(result)
    });

    app.patch('/tasks/:id', verifyToken, async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          task: item.task,
          hoursWorked: item.hoursWorked,
          date: item.date,
        }
      }
      const result = await tasksCollection.updateOne(filter, updatedDoc)
      res.send(result);
    });

    app.delete('/tasks/:id', verifyToken, async (req, res) => {
      const { id } = req.params;
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

  } finally {}
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello! Welcome in Our Hero Employee Managment Server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})