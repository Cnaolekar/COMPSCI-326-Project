import PouchDB from 'pouchdb';
var db = new PouchDB('mydb')
db.info().then((info)=>{
    console.log(info)
})
// Data for fitness classes
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
  // Bulk insert class data into the database 
export async function insertData() {
  db.bulkDocs(classData, function (err, res) {
    if (err) {
      console.log(err)
    }
    else {
      console.log("data created xyz")
    }
  });
}

export async function addData() {
  try {
      const existingData = await db.allDocs({include_docs: true, limit: 1}); 
      if (existingData.total_rows === 0) {
          const response = await db.bulkDocs(classData);
          console.log("Data inserted successfully:", response);
      } else {
          console.log("Data already exists. No need to insert.");
      }
  } catch (error) {
      console.error("Error inserting data into DB:", error);
  }
}

// export async function getClassDetails(classId) {
//   try {
//       const doc = await db.get(classId);
//       return doc;
//   } catch (err) {
//       console.error("Error fetching class details:", err);
//       throw err;  // This will be caught by the server route and can be translated into a 404 not found
//   }
// }
export async function getClassDetails(classId) {
  try {
      const result = await db.allDocs({ include_docs: true })

      const classDetails = result.rows.find(row => row.doc._id === classId);
      if (!classDetails) {
          throw new Error(`Class with id ${classId} not found`);
      }

      return classDetails.doc;
  } catch (err) {
      console.error("Error fetching class details:", err);
      throw err;
  }
}

// export async function filterbyCategory(category,days){
//     try {
//         // Fetch all documents, including their details
//         const result = await db.allDocs({
//             include_docs: true
//         });

//         // Use JavaScript to filter documents by category
//       console.log(category);
//       console.log(days);
//       console.log(result);
//         const filteredProducts = result.rows.filter(row => {
//             return row.doc.category && row.doc.category === category &&
//                    row.doc.days && row.doc.days.some(day => row.doc.days.includes(days));
//         }).map(row => row.doc); 
      
//         return filteredProducts;
//     } catch (err) {
//         console.error('Error fetching products by category:', err);
//     }
// } 
export async function filterbyCategory(days, category){
  try {
      // Fetch all documents, including their details
      const result = await db.allDocs({
          include_docs: true
      });

      console.log("Category:", category);
      console.log("Day:", days);
      console.log("Result from DB:", result);

    
      const filteredProducts = result.rows.filter(row => {
                  return row.doc.category && row.doc.category === category &&
                           row.doc.days && row.doc.days.some(day => row.doc.days.includes(days));
                 }).map(row => row.doc);
                

       // Debug output
      return filteredProducts;
  } catch (err) {
      console.error('Error fetching products by category:', err);
  }
}

