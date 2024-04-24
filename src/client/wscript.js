
  var db = new PouchDB('workouts');

  function saveWorkout() {
    var exerciseName = document.getElementById('exerciseName').value;
    var weights = parseInt(document.getElementById('weights').value);
    var sets = parseInt(document.getElementById('sets').value);
    var reps = parseInt(document.getElementById('reps').value);

    var workout = {
      _id: new Date().toISOString(),
      exerciseName: exerciseName,
      weights: weights,
      sets: sets,
      reps: reps
    };

    db.put(workout).then(function(response) {
      console.log('Workout saved successfully:', response);
      // refreshWorkoutList();
      createClassCard(exerciseName, weights, sets, reps);
    }).catch(function(error) {
      console.error('Error saving workout:', error);
    });
  }

  function clearHistory() {
    // Clear the list of saved workouts
    var workoutList = document.getElementById('workoutList');
    workoutList.innerHTML = '';
  }

  // function refreshWorkoutList() {
  //   var workoutList = document.getElementById('workoutList');
  //   workoutList.innerHTML = '';
    

  //   db.allDocs({ include_docs: true }).then(function(result) {
  //     result.rows.forEach(function(row) {
  //       var workout = row.doc;
  //       var listItem = document.createElement('li');
  //       listItem.textContent = `${workout.exerciseName} - Sets: ${workout.sets}, Reps: ${workout.reps}`;
  //       workoutList.appendChild(listItem);
  //     });
  //   }).catch(function(error) {
  //     console.error('Error fetching workouts:', error);
  //   });
  // }

  // refreshWorkoutList();

  function createClassCard(exerciseName, weights, sets, reps) {
    var classCardsContainer = document.getElementById('classCardsContainer');
    var newCard = document.createElement('div');
    newCard.classList.add('class-card');
    newCard.dataset.category = 'zumba'; // Add data-category attribute if needed

    newCard.innerHTML = `
      <h3 class="class-title">${exerciseName}</h3>
      <p class="class-exercise">Exercise: ${exerciseName}</p>
      <p class="class-weight">Weights: ${weights}</p>
      <p class="class-set">Sets: ${sets}</p>
      <p class="class-rep">Reps: ${reps}</p>
    `;

    classCardsContainer.appendChild(newCard);
  }

  function completeWorkout() {
    var workoutData = {
      _id: 'workout_' + new Date().toISOString(),
      date: new Date().toISOString(),
      exercises: []
    };
  
    var classCards = document.querySelectorAll('.class-card');
    if (classCards.length > 0) {
      classCards.forEach(function(card) {
        var exerciseNameElement = card.querySelector('.class-title');
        var weightElement = card.querySelector('.class-weight');
        var setElement = card.querySelector('.class-set');
        var repElement = card.querySelector('.class-rep');
        if (exerciseNameElement && weightElement && setElement && repElement) {
          var exerciseName = exerciseNameElement.textContent;
          var weights = parseInt(weightElement.textContent.split(': ')[1]);
          var sets = parseInt(setElement.textContent.split(': ')[1]);
          var reps = parseInt(repElement.textContent.split(': ')[1]);
          workoutData.exercises.push({ exerciseName: exerciseName, weights: weights, sets: sets, reps: reps });
        }
      });
    }
  
    db.put(workoutData).then(function(response) {
      console.log('Workout completed and saved successfully:', response);
      // Create a new card for the completed workout
      createCompletedWorkoutCard(workoutData);
      document.getElementById('classCardsContainer').innerHTML = '';
    }).catch(function(error) {
      console.error('Error completing and saving workout:', error);
    });
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
  