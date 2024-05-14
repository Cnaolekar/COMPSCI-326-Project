// var db = new PouchDB('mydb')
// db.info().then((info)=>{
//     console.log(info)
// })
// //Inserting mock data for a user using pouch db
// const UserData = 
//     [
//         {
//             "username":"hawking123",
//             "email": "hawking@yahoo.in" ,
//             "weight" :"175lbs",  
//             "height":"165cm", 
//             "img":"mma.jpg", 
//             "name": "chaitu"
//         }
//     ];  
//     // We have used bulked docs to push all the the data into database
//     db.bulkDocs(UserData,function(err,res){
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log("data created")
//         }});

//         async function updateDetailtDisplay(detail) {
//             //This is uded for targetting specific ids to make their display dyanmic 
//             // This is done by loading data from the databse
//             var detailWrapper = document.querySelector("#infoBox");
//             var weightWrapper = document.querySelector("#weightbox");
//             var userNameWrapper = document.querySelector("#Username");
//             var emialWrapper = document.querySelector("#email"); 
//             var profileWrapper = document.querySelector("#profile");
//          console.log(profileWrapper);
            
             

//             detail.forEach(function(deet) {
//                 var detailtData =deet;
//                 var detailDiv = document.createElement('div'); 
//                  // targetting the height box 
//                 detailDiv.className = 'height';
//                 detailDiv.innerHTML = `  
                
//                 <div class="text-lg sm:text-xl font-bold">${detailtData.height}"</div>
                

//                 `
//                 detailWrapper.appendChild(detailDiv);
//                 // weight 
//                 var WeightDiv = document.createElement('div'); 
//                 WeightDiv.className = 'weight';
//                 WeightDiv.innerHTML = `  
//                 <div class="font-semibold text-gray-700 text-sm sm:text-base">Height</div>
//                 <div class="text-lg sm:text-xl font-bold">${detailtData.weight}"</div>
                
//                 `
//                 weightWrapper.appendChild(WeightDiv);
//                // userName
//                var userDiv = document.createElement('div'); 
//                userDiv.className = 'user';
//                userDiv.innerHTML = `  
//                <label class="block text-gray-700 text-sm font-bold mb-3">Username</label>
//                <div class="px-3 py-2 border rounded w-full shadow-md">
//                  <p class="text-gray-700">@${detailtData.username}</p>
//                `
//                userNameWrapper.appendChild(userDiv);
//                //email 
//                var emailDiv = document.createElement('div'); 
//                emailDiv.className = 'user';
//                emailDiv.innerHTML = `  
//                <label class="block text-gray-700 text-sm font-bold mb-3">Email</label>
//                <div class="px-3 py-2 border rounded w-full shadow-md">
//                  <p class="text-gray-700">${detailtData.email}</p>
//                `
//                emialWrapper.appendChild(emailDiv);
//                 // Targetting profile 
//                 var profileDiv = document.createElement('div'); 
//                 profileDiv.className = 'flex flex-col items-center';
//     profileDiv.innerHTML = `  
//     <img src="../img/${detailtData.img}" alt="Profile Picture" class="rounded-full w-24 h-24">
//     <div>
//       <h2 class="text-5xl font-extralight">${detailtData.name}</h2>
       
//     </div>`
//                profileWrapper.appendChild(profileDiv);
//             });
//         }   

//         document.addEventListener('DOMContentLoaded', function() {
//             updateDetailtDisplay(UserData);
//           });

document.addEventListener('DOMContentLoaded', async () => {
    const email = localStorage.getItem('userEmail'); // Assuming email is stored in local storage after login
    if (!email) {
        alert('No user logged in');
        window.location.href = 'login.html';
        return;
    }

    // Fetch user data from the server
    const response = await fetch(`/profile?email=${email}`);
    const userData = await response.json();
    if (response.ok) {
        document.getElementById('usernameDisplay').textContent = userData.username;
        document.getElementById('emailDisplay').textContent = userData.email;
        document.getElementById('weightDisplay').textContent = userData.weight;
        document.getElementById('heightDisplay').textContent = userData.height;
    } else {
        alert('Failed to load user data');
    }
});
