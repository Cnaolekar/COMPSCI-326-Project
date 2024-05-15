const URL = "http://localhost:3000";
const enrollmentForm = document.getElementById('enrollment-form');
const classId = new URLSearchParams(window.location.search).get('id');
const className = document.getElementById('class-name');
document.addEventListener('DOMContentLoaded', async (event) => {
  //const classId = new URLSearchParams(window.location.search).get('id');
//   const className = document.getElementById('class-name');
  const classDescription = document.getElementById('description');
  const instructor = document.getElementById('instructor');
  const location = document.getElementById('location');
  const category = document.getElementById('category');
  const totalSeats = document.getElementById('total-seats');
  const seatsAvailable = document.getElementById('seats-available');
  const classImage = document.getElementById('class-image');
  //const enrollmentForm = document.getElementById('enrollment-form');

  console.log(classId, className, classDescription, instructor, location, category, totalSeats)

  try {
      console.log(`${URL}/classes?id=${classId}`);
      const response = await fetch(`${URL}/classes?id=${classId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch class details. Please check if the class ID is correct and try again.');
      }
      const classDetails = await response.json();

      className.textContent = classDetails.class_name;
      classDescription.textContent = `Days: ${classDetails.days.join(', ')}`;
      instructor.textContent = `Instructor: ${classDetails.instructor_name}`;
      location.textContent = location.textContent ? `Location: ${classDetails.location}` : 'Location: Not specified';
      category.textContent = `Category: ${classDetails.category}`;
      totalSeats.textContent = `Total Seats: ${classDetails.total_seats}`;
      seatsAvailable.textContent = `Seats Available: ${classDetails.seats_available}`;
      classImage.src = "../img/" + classDetails.img;
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
    });

    enrollmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        try {
          const response = await fetch(`${URL}/enrollments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ classId, name, email })
          });
      
          if (!response.ok) {
            throw new Error('Username or email already exists');
          }
          
          const result = await response.json();
          alert('Enrollment successful!');
          window.location.href = '../html/classes.html';

          
        } catch (error) {
          console.error('Error:', error);
          alert(error.message);
        }
      });
     