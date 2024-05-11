import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import * as db from "./srcipt_db.js";

const headerFields = { "Content-Type": "text/html" }; 

async function saveWorkout(req, res) {
    console.log("Received POST request to save workout:", req.body);
    
    const { exerciseName, weights, sets, reps } = req.body;
    
    const workout = {
      _id: new Date().toISOString(),
      exerciseName: exerciseName,
      weights: weights,
      sets: sets,
      reps: reps
    };
    
    try {
      const response = await db.put(workout);
      console.log('Workout saved successfully:', response);
      res.status(200).send('Workout saved successfully');
    } catch (error) {
      console.error('Error saving workout:', error);
      res.status(500).send('Error saving workout');
    }
}
  
// Function to complete workout
async function completeWorkout(req, res) {
    console.log("Received POST request to complete workout:", req.body);
    
    const workoutData = req.body;

    try {
      const response = await db.put(workoutData);
      console.log('Workout completed and saved successfully:', response);
      res.status(200).send('Workout completed and saved successfully');
    } catch (error) {
      console.error('Error completing and saving workout:', error);
      res.status(500).send('Error completing and saving workout');
    }
}

const app = express();
const port = 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/client"));

const MethodNotAllowedHandler = async (request, response) => {
    response.status(405).type('text/plain').send('Method Not Allowed');
}; 

// Define routes using app.route()
app.route('/create')
  .post((req, res) => {
    const item = req.body;
    console.log("server.js - ", item);
    saveWorkout(req, res); // Call the saveWorkout handler
  })
  .put((req, res) => {
    const item = req.body;
    console.log("server.js - ", item);
    completeWorkout(req, res); // Call the completeWorkout handler
  })
  .all(MethodNotAllowedHandler); // Handle other HTTP methods with MethodNotAllowedHandler

  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
