
var db = new PouchDB('mydb')
db.info().then((info)=>{
    console.log(info)
})

const classData = [
    {
      _id: '1',
      class_name: 'Mixed Martial Arts',
      category: 'MMA',
      category_id: 'MA',
      day_1: 'Monday',
      day_2: 'Wednesday',
      instructor_name: 'Maria',
      total_seats: 50,
      seats_booked: 0,
      seats_available: 50
    },
    {
      _id: '2',
      class_name: 'Boxing',
      category: 'MMA',
      category_id: 'MA',
      day_1: 'Wednesday',
      day_2: 'Friday',
      instructor_name: 'Partick',
      total_seats: 30,
      seats_booked: 0,
      seats_available: 30
    },
    {
      _id: '3',
      class_name: 'KickBoxing',
      category: 'MMA',
      category_id: 'MA',
      day_1: 'Monday',
      day_2: 'Wednesday',
      instructor_name: 'Jason',
      total_seats: 28,
      seats_booked: 0,
      seats_available: 28
    },
    {
      _id: '4',
      class_name: 'Yoga',
      category: 'Wellness',
      category_id: 'W',
      day_1: 'Tuesday',
      day_2: 'Thursday',
      instructor_name: 'Jack',
      total_seats: 45,
      seats_booked: 0,
      seats_available: 45
    },
    {
      _id: '5',
      class_name: 'Meditation',
      category: 'Wellness',
      category_id: 'W',
      day_1: 'Wednesday',
      day_2: 'Thursday',
      instructor_name: 'raphael',
      total_seats: 30,
      seats_booked: 0,
      seats_available: 30
    },
    {
      _id: '6',
      class_name: 'HIIT',
      category: 'Cardio',
      category_id: 'Car',
      day_1: 'Thursday',
      day_2: 'Friday',
      instructor_name: 'Wilson',
      total_seats: 55,
      seats_booked: 0,
      seats_available: 55
    },
    {
      _id: '7',
      class_name: 'LIIT',
      category: 'Cardio',
      category_id: 'Car',
      day_1: 'Monday',
      day_2: 'Wednesday',
      instructor_name: 'Derick',
      total_seats: 20,
      seats_booked: 0,
      seats_available: 20
    },
    {
      _id: '8',
      class_name: 'Indoor cycling',
      category: 'Cardio',
      category_id: 'Car',
      day_1: 'Wednesday',
      day_2: 'Friday',
      instructor_name: 'Dave',
      total_seats: 55,
      seats_booked: 0,
      seats_available: 55
    },
    {
      _id: '9',
      class_name: 'Abs',
      category: 'Muscle Building',
      category_id: 'MB',
      day_1: 'Monday',
      day_2: 'Wednesday',
      instructor_name: 'Larissa',
      total_seats: 42,
      seats_booked: 0,
      seats_available: 42
    },
    {
      _id: '10',
      class_name: 'Upper Body',
      category: 'Muscle Building',
      category_id: 'MB',
      day_1: 'Tuesday',
      day_2: 'Thursday',
      instructor_name: 'Maria',
      total_seats: 35,
      seats_booked: 0,
      seats_available: 35
    },
    {
      _id: '11',
      class_name: 'Lowe Body',
      category: 'Muscle Building',
      category_id: 'MB',
      day_1: 'Thursday',
      day_2: 'Friday',
      instructor_name: 'Alphonso',
      total_seats: 50,
      seats_booked: 0,
      seats_available: 50
    }
  ];
  db.bulkDocs(classData,function(err,res){
    if(err){
        console.log(err)
    }
    else{
        console.log("data created")
    }});






// async function getProductsByCategory(category) {
//     try {
//         const result = await db.find({
//             selector: {
//                 category: {$eq: category}
//             },
//             fields: ['_id',
//             "class_name",
//             'category',
//             'category_id',
//             'day_1',
//             'day_2',
//             'instructor_name' ,
//             'total_seats' ,
//             'seats_booked' ,
//             'seats_available']
//         });
//         return result.docs;
//     } catch (err) {
//         console.error('Error fetching products by category:', err);
//     }
// } 
async function getProductsByCategory(category) {
    try {
        // Fetch all documents, including their details
        const result = await db.allDocs({
            include_docs: true
        });

        // Use JavaScript to filter documents by category
        const filteredProducts = result.rows.filter(row => row.doc.category && row.doc.category === category).map(row => row.doc);

        return filteredProducts;
    } catch (err) {
        console.error('Error fetching products by category:', err);
    }
}

async function updateProductDisplay(products) {
    var productWrapper = document.querySelector('.class-grid');
    productWrapper.innerHTML = ''; // Clear current content
    console.log(products)
    products.forEach(function(product) {
        var productData =product
        var productDiv = document.createElement('div'); 
        console.log(productData);
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div class="class-card " data-category="zumba">
            
            <h3 class="class-title">${productData.class_name}</h3>
        </div>
        `
        
        productWrapper.appendChild(productDiv);
    });
} 


// document.addEventListener('DOMContentLoaded', function() {
//     // Create or connect to a local PouchDB database
//     // var db = new PouchDB('m');
//     var categorySelect = document.getElementById('category');
//     // Function to fetch and display products
//     function displayProducts(category) {
//         db.allDocs({include_docs: true, descending: true}, function(err, doc) {
//             if (err) {
//                 console.error(err);
//             } else {
//                 updateProductDisplay(getProductsByCategory(categorySelect));
//             }
//         });
//     } }); 



    // document.addEventListener('DOMContentLoaded', function() {
    //     var categorySelect = document.getElementById('category');
    
    //     categorySelect.addEventListener('change', function() {
    //         var selectedCategory = this.value;
    //         filterData(selectedCategory);
    //     });
    // });

    document.addEventListener('DOMContentLoaded',  function() {
        var db = new PouchDB('mydb'); // Corrected database name for consistency
        var categorySelect = document.getElementById('category');
    
        categorySelect.addEventListener('change', function() {
            displayProducts(this.value); // Pass the selected value
        });
    
        // Function to fetch and display products based on category
        //  function displayProducts(category) {
        //     db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        //         if (err) {
        //             console.error(err);
        //         } else {
        //             var filteredDocs =   getProductsByCategory(category); 
        //             console.log(filteredDocs);
        //             updateProductDisplay(filteredDocs);
        //         }
        //     });
        // } 
        function displayProducts(category) {
            db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
                if (err) {
                    console.error(err);
                } else {
                    // Since getProductsByCategory returns a promise, you need to wait for it to resolve
                    getProductsByCategory(category).then(function(filteredDocs) {
                        // Now filteredDocs should be the array you expect
                        console.log(filteredDocs); // This should log the array to the console
                        updateProductDisplay(filteredDocs); // Call the function with the array
                    }).catch(function(error) {
                        // Handle any errors that occur during the promise
                        console.error('Error fetching filtered docs:', error);
                    });
                }
            });
        }
        
    
        // Assume this function filters the products by category
    
    
        // Assume this function updates the UI with filtered products
    });
    
