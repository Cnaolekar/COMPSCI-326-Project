import express from "express";
import logger from "morgan";
import bodyParser from "body-parser"
import * as db from "./srcipt_db.js";
import PouchDB from 'pouchdb';

const headerFields = { "Content-Type": "text/html" }; 

async function filter(response, days, category) {
  if (days === undefined || category === undefined) {
    response.writeHead(400, headerFields);
    response.write("<h1>Need days and category</h1>");
    response.end();
    return;
  }

  try {
    await db.insertData();
    const arr = await db.filterbyCategory(days, category); 
    console.log(arr);
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.write(JSON.stringify(arr));
    response.end();
  } catch (err) {
    if (!response.headersSent) {
      response.writeHead(500, headerFields);
      response.write("<h1>Internal Server Error</h1>");
      response.end();
    } else {
      console.error('Error after sending headers', err);
    }
  }
}
const db_users = new PouchDB('users');









const app = express();
const port = 3000;
app.use(logger("dev"));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/client"));
const MethodNotAllowedHandler = async (request, response) => {
    response.status(405).type('text/plain').send('Method Not Allowed');
  }; 

  app.route("/read")
    .get(async (req, res) => {
         const { days, category } = req.query;
        filter(res, days, category); 
      
    })
    .all(MethodNotAllowedHandler);
    app.post('/signup', async (req, res) => {
      const { email, username, password, height, weight } = req.body;
  
      // to check if the user already exists
      try {
          const result = await db_users.allDocs({ include_docs: true });
          const userExists = result.rows.some(row => row.doc.email === email || row.doc.username === username);
          if (userExists) {
              return res.status(400).json({ error: 'Username or email already exists' });
          }
  
          const user = {
              _id: new Date().toISOString(),
              email,
              username,
              password,
              height,
              weight
          };
          
  
          await db_users.put(user);
          res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
          res.status(500).json({ error: 'An error occurred while creating the user' });
      }
  });
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db_users.allDocs({ include_docs: true });
        const user = result.rows.find(row => row.doc.email === email);

        if (!user || user.doc.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

app.get('/profile', async (req, res) => {
  const { email } = req.query;

  try {
      const result = await db_users.allDocs({ include_docs: true });
      const user = result.rows.find(row => row.doc.email === email);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user.doc);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the user profile' });
  }
});









  app.route("/classes").get(async (req, res) => {
    try {
        const id = req.query.id; // Access id as a query parameter
        if (!id) {
            return res.status(400).send('Class ID is required');
        }
        const classDetails = await db.getClassDetails(id);
        res.json(classDetails);
    } catch (error) {
        console.error('Class not found', error);
        res.status(404).send('Class not found');
    }
});

const enrollmentDB = new PouchDB('enrollments');

app.post('/enrollments', async (req, res) => {
  const { classId, name, email } = req.body;
  
  if (!classId || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }


  try {
    const userCheck = await enrollmentDB.allDocs({ include_docs: true });
          const userExists = userCheck.rows.some(row => row.doc.email === email);
          if (userExists) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        

    const enrollment = {
      _id: new Date().toISOString(),
      classId,
      name,
      email
    };
    
    console.log('Enrollment data:', enrollment);
    const result = await enrollmentDB.put(enrollment);

    const classDetails = await db.getClassDetails(classId);
    if (classDetails) {
      classDetails.seats_available -= 1;
      await db.updateClassDetails(classDetails);
    }
    
    res.status(201).json(result);
  } catch (error) {
    console.error('Error saving enrollment:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});




app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
