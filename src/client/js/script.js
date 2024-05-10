// Log database information on startup
const URL = "http://localhost:3000"; 
// var db = new PouchDB('mydb')
// db.info().then((info)=>{
//     console.log(info)
// })
// // Data for fitness classes
// const classData = [
    
//         {
//           "_id": "1",
//           "class_name": "Mixed Martial Arts",
//           "category": "MMA",
//           "category_id": "MA",
//           "days": ["Monday", "Wednesday"],
//           "instructor_name": "Maria",
//           "total_seats": 50,
//           "seats_booked": 0,
//           "seats_available": 50,
//           "img": "mma.jpg"
//         },
//         {
//           "_id": "2",
//           "class_name": "Boxing",
//           "category": "MMA",
//           "category_id": "MA",
//           "days": ["Wednesday", "Friday"],
//           "instructor_name": "Partick",
//           "total_seats": 30,
//           "seats_booked": 0,
//           "seats_available": 30,
//           "img": "mma.jpg"
//         },
//         {
//           "_id": "3",
//           "class_name": "KickBoxing",
//           "category": "MMA",
//           "category_id": "MA",
//           "days": ["Monday", "Wednesday"],
//           "instructor_name": "Jason",
//           "total_seats": 28,
//           "seats_booked": 0,
//           "seats_available": 28,
//           "img": "mma.jpg"
//         },
//         {
//           "_id": "4",
//           "class_name": "Yoga",
//           "category": "Wellness",
//           "category_id": "W",
//           "days": ["Tuesday", "Thursday"],
//           "instructor_name": "Jack",
//           "total_seats": 45,
//           "seats_booked": 0,
//           "seats_available": 45,
//           "img": "wellness.jpg"
//         },
//         {
//           "_id": "5",
//           "class_name": "Meditation",
//           "category": "Wellness",
//           "category_id": "W",
//           "days": ["Wednesday", "Thursday"],
//           "instructor_name": "Raphael",
//           "total_seats": 30,
//           "seats_booked": 0,
//           "seats_available": 30,
//           "img": "wellness.jpg"
//         },
//         {
//           "_id": "6",
//           "class_name": "HIIT",
//           "category": "Cardio",
//           "category_id": "Car",
//           "days": ["Thursday", "Friday"],
//           "instructor_name": "Wilson",
//           "total_seats": 55,
//           "seats_booked": 0,
//           "seats_available": 55,
//           "img": "cardio.jpg"
//         },
//         {
//           "_id": "7",
//           "class_name": "LIIT",
//           "category": "Cardio",
//           "category_id": "Car",
//           "days": ["Monday", "Wednesday"],
//           "instructor_name": "Derick",
//           "total_seats": 20,
//           "seats_booked": 0,
//           "seats_available": 20,
//           "img": "cardio.jpg"
//         },
//         {
//           "_id": "8",
//           "class_name": "Indoor cycling",
//           "category": "Cardio",
//           "category_id": "Car",
//           "days": ["Wednesday", "Friday"],
//           "instructor_name": "Dave",
//           "total_seats": 55,
//           "seats_booked": 0,
//           "seats_available": 55,
//           "img": "cardio.jpg"
//         },
//         {
//           "_id": "9",
//           "class_name": "Abs",
//           "category": "Muscle Building",
//           "category_id": "MB",
//           "days": ["Monday", "Wednesday"],
//           "instructor_name": "Larissa",
//           "total_seats": 42,
//           "seats_booked": 0,
//           "seats_available": 42,
//           "img": "building.jpg"
//         },
//         {
//           "_id": "10",
//           "class_name": "Upper Body",
//           "category": "Muscle Building",
//           "category_id": "MB",
//           "days": ["Tuesday", "Thursday"],
//           "instructor_name": "Maria",
//           "total_seats": 35,
//           "seats_booked": 0,
//           "seats_available": 35,
//           "img": "building.jpg"
//         },
//         {
//           "_id": "11",
//           "class_name": "Lower Body",
//           "category": "Muscle Building",
//           "category_id": "MB",
//           "days": ["Thursday", "Friday"],
//           "instructor_name": "Alphonso",
//           "total_seats": 50,
//           "seats_booked": 0,
//           "seats_available": 50,
//           "img": "building.jpg"
//         }
    
    
//   ]; 
//   // Bulk insert class data into the database
//   db.bulkDocs(classData,function(err,res){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("data created")
//     }});







// Function to fetch products by category and day
// async function getProductsByCategory(category,days) {
//     try {
//         // Fetch all documents, including their details
//         const result = await db.allDocs({
//             include_docs: true
//         });

//         // Use JavaScript to filter documents by category
       
//         const filteredProducts = result.rows.filter(row => {
//             return row.doc.category && row.doc.category === category &&
//                    row.doc.days && row.doc.days.some(day => row.doc.days.includes(days));
//         }).map(row => row.doc);
//         return filteredProducts;
//     } catch (err) {
//         console.error('Error fetching products by category:', err);
//     }
// }
// Function to update the UI with class cards
async function updateProductDisplay(products) {
    var productWrapper = document.querySelector('.class-grid');
    productWrapper.innerHTML = ''; // Clear current content
    console.log(products.rows)  
    products.forEach(function(product) {
        var productData =product
        var productDiv = document.createElement('div'); 
        console.log(productData);
        console.log(productData.img) 
        //We create Class Card that match our filter criterion
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div class="class-card " data-category="${productData.class_name}">
            <a href="classesredirect.html?id=${productData._id}">
            <img class="class-image" src="../img/${productData.img}" alt="${productData.class_name}">
            </a>

            <h3 class="class-title">${productData.class_name}</h3>

            
        </div>
        `
        
        productWrapper.appendChild(productDiv);
    });
} 




    document.addEventListener('DOMContentLoaded',  function() {
        var db = new PouchDB('mydb'); // Corrected database name for consistency
        var categorySelect = document.getElementById('category');
        var days = document.getElementById('day')
        var searchButton = document.querySelector('button[type="submit"]')
        searchButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default form submit action
            displayProducts(categorySelect.value,days.value); // Pass the selected value from the select element
        });
        
        // function displayProducts(category,days) {
        //     db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
        //         if (err) {
        //             console.error(err);
        //         } else { 
        //             // Since getProductsByCategory returns a promise, you need to wait for it to resolve
        //             getProductsByCategory(category,days).then(function(filteredDocs) {
        //                 // Now filteredDocs should be the array you expect
        //                 console.log(filteredDocs); // This should log the array to the console
        //                 updateProductDisplay(filteredDocs); // Call the function with the array
        //             }).catch(function(error) {
        //                 // Handle any errors that occur during the promise
        //                 console.error('Error fetching filtered docs:', error);
        //             });
        //         }
        //     });
        // } 
        async function displayProducts(category, days) {
          try {
              const doc = await db.allDocs({ include_docs: true, descending: true });
              // Assuming URL and name are defined elsewhere correctl y
              const queryParams = new URLSearchParams({ days, category }).toString();
              const response = await fetch(`${URL}/read?${queryParams}`, {
                  method: "GET",
              }); 
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
              try {
                  const filteredDocs = data
                  console.log(filteredDocs); // This should log the array to the console
                  await updateProductDisplay(filteredDocs); // Call the function with the array
              } catch (error) {
                  console.error('Error fetching filtered docs:', error);
              }
          } catch (err) {
              console.error(err);
          }
      }
  });
        
    
    

    




