const newdb = new PouchDB('enrollments');

const classData = [
    
    {
      "_id": "1",
      "class_name": "Mixed Martial Arts",
      "category": "MMA",
      "category_id": "MA",
      "days": ["Monday", "Wednesday"],
      "instructor_name": "Maria",
      "total_seats": 50,
      "seats_booked": 0,
      "seats_available": 50,
      "img": "mma.jpg"
    },
    {
      "_id": "2",
      "class_name": "Boxing",
      "category": "MMA",
      "category_id": "MA",
      "days": ["Wednesday", "Friday"],
      "instructor_name": "Partick",
      "total_seats": 30,
      "seats_booked": 0,
      "seats_available": 30,
      "img": "mma.jpg"
    },
    {
      "_id": "3",
      "class_name": "KickBoxing",
      "category": "MMA",
      "category_id": "MA",
      "days": ["Monday", "Wednesday"],
      "instructor_name": "Jason",
      "total_seats": 28,
      "seats_booked": 0,
      "seats_available": 28,
      "img": "mma.jpg"
    },
    {
      "_id": "4",
      "class_name": "Yoga",
      "category": "Wellness",
      "category_id": "W",
      "days": ["Tuesday", "Thursday"],
      "instructor_name": "Jack",
      "total_seats": 45,
      "seats_booked": 0,
      "seats_available": 45,
      "img": "wellness.jpg"
    },
    {
      "_id": "5",
      "class_name": "Meditation",
      "category": "Wellness",
      "category_id": "W",
      "days": ["Wednesday", "Thursday"],
      "instructor_name": "Raphael",
      "total_seats": 30,
      "seats_booked": 0,
      "seats_available": 30,
      "img": "wellness.jpg"
    },
    {
      "_id": "6",
      "class_name": "HIIT",
      "category": "Cardio",
      "category_id": "Car",
      "days": ["Thursday", "Friday"],
      "instructor_name": "Wilson",
      "total_seats": 55,
      "seats_booked": 0,
      "seats_available": 55,
      "img": "cardio.jpg"
    },
    {
      "_id": "7",
      "class_name": "LIIT",
      "category": "Cardio",
      "category_id": "Car",
      "days": ["Monday", "Wednesday"],
      "instructor_name": "Derick",
      "total_seats": 20,
      "seats_booked": 0,
      "seats_available": 20,
      "img": "cardio.jpg"
    },
    {
      "_id": "8",
      "class_name": "Indoor cycling",
      "category": "Cardio",
      "category_id": "Car",
      "days": ["Wednesday", "Friday"],
      "instructor_name": "Dave",
      "total_seats": 55,
      "seats_booked": 0,
      "seats_available": 55,
      "img": "cardio.jpg"
    },
    {
      "_id": "9",
      "class_name": "Abs",
      "category": "Muscle Building",
      "category_id": "MB",
      "days": ["Monday", "Wednesday"],
      "instructor_name": "Larissa",
      "total_seats": 42,
      "seats_booked": 0,
      "seats_available": 42,
      "img": "building.jpg"
    },
    {
      "_id": "10",
      "class_name": "Upper Body",
      "category": "Muscle Building",
      "category_id": "MB",
      "days": ["Tuesday", "Thursday"],
      "instructor_name": "Maria",
      "total_seats": 35,
      "seats_booked": 0,
      "seats_available": 35,
      "img": "building.jpg"
    },
    {
      "_id": "11",
      "class_name": "Lower Body",
      "category": "Muscle Building",
      "category_id": "MB",
      "days": ["Thursday", "Friday"],
      "instructor_name": "Alphonso",
      "total_seats": 50,
      "seats_booked": 0,
      "seats_available": 50,
      "img": "building.jpg"
    }


];

const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get('id');


function getClassDetails(id) {
    return new Promise((resolve, reject) => {
        const classDetail = classData.flat().find(classData => classData._id === id);
        if (classDetail) {
            resolve(classDetail);
        } else {
            reject(new Error('Class not found'));
        }
    });
}

async function displayClassDetails() {
    try {
        const classDetails = await getClassDetails(classId);
        document.getElementById('class-name').textContent = classDetails.class_name;
        document.getElementById('description').textContent = `Days: ${classDetails.days.join(', ')}`;
        document.getElementById('instructor').textContent = `Instructor: ${classDetails.instructor_name}`;
        document.getElementById('location').textContent = `Location: ${classDetails.location}`;
        document.getElementById('category').textContent = `Category: ${classDetails.category}`; // New: Display category
        document.getElementById('total-seats').textContent = `Total Seats: ${classDetails.total_seats}`; // New: Display total seats
        document.getElementById('seats-available').textContent = `Seats Available: ${classDetails.seats_available}`; // New: Display seats available
        document.getElementById('class-image').src = classDetails.img;
    } catch (error) {
        console.error('Error retrieving class details:', error);
    }
}

// Function to handle form submission (enrollment)
document.addEventListener('DOMContentLoaded', (event) => {
    const enrollmentForm = document.getElementById('enrollment-form');
    
    if (!enrollmentForm) {
        console.error('Enrollment form not found on the page.');
        return;
    }

    enrollmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Assuming classId is defined globally, check if it's set
        if (typeof classId === 'undefined' || classId === null) {
            alert('Class ID is not set.');
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        try {
            const classDetails = await getClassDetails(classId);
            if (classDetails && classDetails.seats_available > 0) {
                // Enroll user
                const enrollmentData = {
                    _id: `enrollment_${Date.now()}`,
                    classId: classId,
                    name: name,
                    email: email
                };
                await newdb.put(enrollmentData);
                console.log('Enrollment data:', enrollmentData); 
                alert('Enrollment successful!');
            } else {
                alert('Class is full. Cannot enroll.');
            }
        } catch (error) {
            console.error('Error enrolling user:', error);
        }
    });
});


displayClassDetails();

