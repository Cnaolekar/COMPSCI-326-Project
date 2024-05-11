const URL = "http://localhost:4000"; // Server URL

// Function to save workout on the server
async function saveWorkout() {
    console.log("Sending save workout request...");
    
    // Get exercise details from the input fields
    const exerciseName = document.getElementById('exerciseName').value;
    const weights = parseInt(document.getElementById('weights').value);
    const sets = parseInt(document.getElementById('sets').value);
    const reps = parseInt(document.getElementById('reps').value);
  
    // Construct query parameters
  
    // Send a POST request to the server with exercise details as query parameters
    fetch(`${URL}/workout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Received response from save workout request:", data);
      // After successfully saving, create a class card for the exercise
      createClassCard(exerciseName, weights, sets, reps);
    })
    .catch(error => console.error('Error saving workout:', error));
  
}

// Function to complete workout on the server
function completeWorkout() {
  console.log("Sending complete workout request...");
  
  // Collect exercises data from the created class cards
  const classCards = document.querySelectorAll('.class-card');
  const exercises = [];

  // Extract exercise details from each class card
  classCards.forEach(card => {
    const exerciseName = card.querySelector('.class-title').textContent;
    const weights = parseInt(card.querySelector('.class-weight').textContent.split(': ')[1]);
    const sets = parseInt(card.querySelector('.class-set').textContent.split(': ')[1]);
    const reps = parseInt(card.querySelector('.class-rep').textContent.split(': ')[1]);

    exercises.push({ exerciseName, weights, sets, reps }); // Push to array
  });

  // Prepare workout data
  const workoutData = {
    _id: 'workout_' + new Date().toISOString(),
    date: new Date().toISOString(),
    exercises: exercises
  };

  // Send a PUT request to the server with the completed workout data
  fetch(`${URL}/workout`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workoutData)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Received response from complete workout request:", data);
    // After successfully completing and saving, create a card for the completed workout
    createCompletedWorkoutCard(workoutData);
    // Clear the class cards container
    document.getElementById('classCardsContainer').innerHTML = '';
  })
  .catch(error => console.error('Error completing and saving workout:', error));
}

// Other client-side functions remain the same
function clearHistory() {
    // Clear the list of saved workouts
    var workoutList = document.getElementById('workoutList');
    workoutList.innerHTML = '';
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
  newCard.classList.add('class-card'); // Add class for styling if needed

  var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var formattedDate = new Date(workoutData.date).toLocaleDateString(undefined, dateOptions);
  var exercisesList = workoutData.exercises.map(function(exercise) {
    return `${exercise.exerciseName} - Weights: ${exercise.weights}, Sets: ${exercise.sets}, Reps: ${exercise.reps}`;
  }).join('<br>');

  newCard.innerHTML = `
    <p class="class-title"><strong>Date:</strong> ${formattedDate}</p>
    <p><strong>Exercises:</strong></p>
    <p>${exercisesList}</p>
  `;

  workoutList.appendChild(newCard);
}
