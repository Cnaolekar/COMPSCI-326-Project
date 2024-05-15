import express from 'express';
import bodyParser from 'body-parser';
import PouchDB from 'pouchdb';
import logger from 'morgan';
import cors from 'cors';

const app = express();
const workoutsDB = new PouchDB('workouts');
const port = 4000;




app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/client")); 


app.post('/saveWorkout', async (req, res) => {
    try {
        const workout = {
            _id: new Date().toISOString(),
            ...req.body
        };
        const result = await workoutsDB.put(workout);
        res.status(201).json({ success: true, message: "Workout saved successfully", result });
    } catch (error) {
        console.error('Error saving workout:', error);
        res.status(500).json({ success: false, message: "Error saving workout", error });
    }
});


app.post('/completeWorkout', async (req, res) => {
  try {
      const workoutData = {
          _id: new Date().toISOString(), 
          date: new Date().toISOString(),
          exercises: req.body.exercises 
      };
      const result = await workoutsDB.put(workoutData);  
      res.status(201).json({ success: true, message: "Workout saved successfully", result });
  } catch (error) {
      console.error('Error saving complete workout:', error);
      res.status(500).json({ success: false, message: "Error saving workout", error });
  }
});

app.route('/getWorkouts').get(async (req, res) => {
  try {
      const result = await workoutsDB.allDocs({ include_docs: true });
      if (result.rows && result.rows.length > 0) {
          const workouts = result.rows.map(row => row.doc);
          console.log("Sending workouts: ", workouts);
          res.status(200).json(workouts);
      } else {
          console.log("No workouts found.");
          res.status(404).json({ message: "No workouts found" });
      }
  } catch (error) {
      console.error('Error retrieving workouts:', error);
      res.status(500).json({ success: false, message: "Error retrieving workouts", error });
  }
});

app.delete('/clearWorkouts', async (req, res) => {
  try {
      const allDocs = await workoutsDB.allDocs();
      const deletions = allDocs.rows.map(doc => {
          return { _id: doc.id, _rev: doc.value.rev, _deleted: true };
      });
      const response = await workoutsDB.bulkDocs(deletions);
      res.status(200).json({ success: true, message: "All workouts cleared", response });
  } catch (error) {
      console.error('Error clearing workouts:', error);
      res.status(500).json({ success: false, message: "Failed to clear workouts", error });
  }
});






app.use((req, res, next) => {
    if (!['GET', 'POST', 'DELETE'].includes(req.method)) {
        res.status(405).type('text/plain').send('Method Not Allowed');
    } else {
        next();
    }
});


app.use((req, res) => {
    res.status(404).send("Resource not found");
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
