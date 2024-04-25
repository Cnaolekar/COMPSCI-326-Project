var db = new PouchDB('mydb')
db.info().then((info)=>{
    console.log(info)
})

const UserData = 
    [
        {
            "username":"hawking123",
            "email": "hawking@yahoo.in" ,
            "weight" :"175lbs",  
            "height":"165cm", 
            "img":"mma.jpg", 
            "name": "chaitu"
        }
    ]; 
    db.bulkDocs(UserData,function(err,res){
        if(err){
            console.log(err)
        }
        else{
            console.log("data created")
        }});
        // <div class="flex-1 bg-white shadow rounded p-4">
        // <div class="font-semibold text-gray-700">Height</div>
        // <div class="text-xl font-bold">183 cms</div>
        // <button class="text-blue-500 text-sm mt-2">Edit</button>
        async function updateDetailtDisplay(detail) {
            var detailWrapper = document.querySelector("#infoBox");
            var weightWrapper = document.querySelector("#weightbox");
            var userNameWrapper = document.querySelector("#Username");
            var emialWrapper = document.querySelector("#email"); 
            var profileWrapper = document.querySelector("#profile");
         console.log(profileWrapper);
            
             
            // console.log(detailWrapper);
            // detailWrapper.innerHTML = ''; // Clear current content
            // console.log(products)
            detail.forEach(function(deet) {
                var detailtData =deet;
                var detailDiv = document.createElement('div'); 
                detailDiv.className = 'height';
                detailDiv.innerHTML = `  
                <div class="font-semibold text-gray-700 text-sm sm:text-base">Height</div>
                <div class="text-lg sm:text-xl font-bold">${detailtData.height}"</div>
                <button class="text-blue-500 text-sm mt-2 hover:text-blue-700">Edit</button>

                `
                detailWrapper.appendChild(detailDiv);
                // weight 
                var WeightDiv = document.createElement('div'); 
                WeightDiv.className = 'weight';
                WeightDiv.innerHTML = `  
                <div class="font-semibold text-gray-700 text-sm sm:text-base">Height</div>
                <div class="text-lg sm:text-xl font-bold">${detailtData.weight}"</div>
                <button class="text-blue-500 text-sm mt-2 hover:text-blue-700">Edit</button>
                `
                weightWrapper.appendChild(WeightDiv);
               // userName
               var userDiv = document.createElement('div'); 
               userDiv.className = 'user';
               userDiv.innerHTML = `  
               <label class="block text-gray-700 text-sm font-bold mb-3">Username</label>
               <div class="px-3 py-2 border rounded w-full shadow-md">
                 <p class="text-gray-700">@${detailtData.username}</p>
               `
               userNameWrapper.appendChild(userDiv);
               //email 
               var emailDiv = document.createElement('div'); 
               emailDiv.className = 'user';
               emailDiv.innerHTML = `  
               <label class="block text-gray-700 text-sm font-bold mb-3">Email</label>
               <div class="px-3 py-2 border rounded w-full shadow-md">
                 <p class="text-gray-700">${detailtData.email}</p>
               `
               emialWrapper.appendChild(emailDiv);
                // profile 
                var profileDiv = document.createElement('div'); 
                profileDiv.className = 'flex flex-col items-center';
    profileDiv.innerHTML = `  
    <img src="${detailtData.img}" alt="Profile Picture" class="rounded-full w-24 h-24">
    <div>
      <h2 class="text-5xl font-extralight">${detailtData.name}</h2>
      <button class="px-2 py-1 text-sm text-blue-500 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">Change profile photo</button>
    </div>`
               profileWrapper.appendChild(profileDiv);
            });
        }   

        document.addEventListener('DOMContentLoaded', function() {
            updateDetailtDisplay(UserData);
          });