
---

# COMPSCI-326-Project

## Description of the Project
We have built a website that makes it easier for people to attend classes and solves multiple problems that fitness enthusiasts experience. Our features include booking group fitness classes, tracking and recording workouts, and monitoring weight.

## Built With
- JavaScript
- HTML
- CSS
- PouchDB
- Bootstrap Framework
- Tailwind CSS

## Project Structure
Running `npm run` will direct you to the homepage where the navigation bar offers options for different sections:

### Classes
This section dynamically filters classes based on the category of the workout you want and the day you want. Clicking on any of the workouts will lead you to the booking page.

### Booking Page (after you select class in classes page , you are redirected to this page)
This page provides all the details of the classes, and you can enroll by adding your email and name.

### Workouts
Clicking on workouts will lead to a notepad page that tracks sets, reps, and weight. When you save your workout session, it also saves the day. All of this is done dynamically.
### Profile Page 
You can check your phot , height , weight and emaila and username. As well as get your workout and nutrition plan 
### Workout Page (after profile page )
Your workout  
### Nutrition Plan Page (after profile page )
Your Nutrition Plan  

### Rubric 
Project Structure : 
Organization : Code is well-organized within the src/client directory. All the files are organised according to their type extensions (i,e Javascript files in js Folder) . All the  files are given relevant names 

Functionality : 
Error Handling : Proper error handling and validation for user inputs and interactions.  When enrolling for workouts there is a requirement for email and invalid emails are not accepted and there a popup which explains the error

Code Quality and Structure , Data Mocking and Asynchronicity : 
look at Scirpt.js as an Example in Js folder  and look at wscirpt.js

Interactivity and User Experience (15%)
User Input Handling : Responsive and intuitive handling of user inputs and actions. 
Look at Classes page and when you select class we redirect you to a booking page which has form that handles user inputs
Dynamic Content : Content updates dynamically based on user interaction without page reloads.  
Look at Workouts page where once can add their workout log and the page displays them immediately.When you enroll in a class there is a popup which displays a success message 

PouchDB and Storage: 
Demonstrated in  Scirpt.js as an Example in Js folder  and look at wscirpt.js .The full profile page is loaded dynamically (as in all the tags and containers )




## Getting Started
To execute the code, you just need to run the `npm run milestone-02` command.

---

