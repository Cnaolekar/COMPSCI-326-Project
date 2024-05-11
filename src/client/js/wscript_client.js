const URL = "http://localhost:4000";

function saveWorkout() {
  var exerciseName = document.getElementById('exerciseName').value;
  var weights = parseInt(document.getElementById('weights').value);
  var sets = parseInt(document.getElementById('sets').value);
  var reps = parseInt(document.getElementById('reps').value);

  var workout = {
      exerciseName: exerciseName,
      weights: weights,
      sets: sets,
      reps: reps
  };

  fetch('/saveWorkout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(workout)
  }).then(response => response.json())
  .then(data => {
      console.log('Workout saved successfully:', data);
      createClassCard(exerciseName, weights, sets, reps);
  }).catch(error => {
      console.error('Error saving workout:', error);
  });
}




function completeWorkout() {
  var workoutData = {
      _id: 'workout_' + new Date().toISOString(),
      date: new Date().toISOString(),
      exercises: []
  };

  var classCards = document.querySelectorAll('.class-card');
  classCards.forEach(card => {
      var exerciseNameElement = card.querySelector('.class-title');
      var weightsElement = card.querySelector('.class-weight');
      var setsElement = card.querySelector('.class-set');
      var repsElement = card.querySelector('.class-rep');

      var exerciseName = exerciseNameElement ? exerciseNameElement.textContent : 'Unknown Exercise';
      var weights = weightsElement ? parseInt(weightsElement.textContent.split(': ')[1]) : 0;
      var sets = setsElement ? parseInt(setsElement.textContent.split(': ')[1]) : 0;
      var reps = repsElement ? parseInt(repsElement.textContent.split(': ')[1]) : 0;

      
      if (exerciseName !== 'Unknown Exercise' && weights > 0 && sets > 0 && reps > 0) {
          workoutData.exercises.push({
              exerciseName: exerciseName,
              weights: weights,
              sets: sets,
              reps: reps
          });
      }
  });


  if (workoutData.exercises.length > 0) {
      fetch('/completeWorkout', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(workoutData)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Workout completed and saved successfully:', data);
          createCompletedWorkoutCard(workoutData);
          document.getElementById('classCardsContainer').innerHTML = '';
      })
      .catch(error => {
          console.error('Error completing and saving workout:', error);
      });
  } else {
      console.log('No valid exercises to save.');
  }
}


function loadWorkouts() {
  fetch('/getWorkouts')
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch workouts: ' + response.statusText);
      }
      return response.json();
  })
  .then(workouts => {
      console.log("Received workouts: ", workouts);
      workouts.forEach(workout => {
          if (workout.exercises && Array.isArray(workout.exercises)) {
           
              createCompletedWorkoutCard(workout);
          } else {
            
              console.log('Skipping workout without exercises array:', workout);
            
          }
      });
  })
  .catch(error => {
      console.error('Error loading workouts:', error);
  });
}

document.addEventListener('DOMContentLoaded', loadWorkouts);




function clearHistory() {
    var workoutList = document.getElementById('workoutList');
    workoutList.innerHTML = '';
    fetch('/clearWorkouts', {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('All workouts cleared:', data);
    })
    .catch(error => {
        console.error('Error clearing workouts:', error);
    });
}

function createClassCard(exerciseName, weights, sets, reps) {
  var classCardsContainer = document.getElementById('classCardsContainer');
  var newCard = document.createElement('div');
  newCard.classList.add('class-card');
  newCard.dataset.category = 'zumba'; 

  newCard.innerHTML = `
    <h3 class="class-title">${exerciseName}</h3>
    <p class="class-exercise">Exercise: ${exerciseName}</p>
    <p class="class-weight">Weights: ${weights}</p>
    <p class="class-set">Sets: ${sets}</p>
    <p class="class-rep">Reps: ${reps}</p>
  `;

  classCardsContainer.appendChild(newCard);
}

function createCompletedWorkoutCard(workoutData) {
  var workoutList = document.getElementById('workoutList');
  var newCard = document.createElement('div');
  newCard.classList.add('class-card');

  var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var formattedDate = new Date(workoutData.date).toLocaleDateString(undefined, dateOptions);
  var exercisesList = workoutData.exercises.map(exercise => {
      return `${exercise.exerciseName} - Weights: ${exercise.weights}, Sets: ${exercise.sets}, Reps: ${exercise.reps}`;
  }).join('<br>');

  newCard.innerHTML = `
      <p class="class-title"><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Exercises:</strong></p>
      <p>${exercisesList}</p>
  `;

  workoutList.appendChild(newCard);
}



