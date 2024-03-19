import {
    getFirestore,
    collection,
    addDoc,
    doc,
    getDocs,
    setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { app } from '../../config/db.js';

// document.addEventListener('DOMContentLoaded', function () {
//     displayUserData()
// });

const firestore = getFirestore(app);
// const auth = getAuth(app);

// Attach event listener to the button with ID saveChangesBtn
document.addEventListener("DOMContentLoaded", function () {
    const saveChangesBtn = document.getElementById('saveChangesBtn');

    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', function () {
            saveChanges();
        });
    }
});


// document.getElementById('formDataForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Get form data
//     const formData = new FormData(this);

//     // Create a new row in the table
//     const table = document.getElementById('formDataTable').getElementsByTagName('tbody')[0];
//     const newRow = table.insertRow(table.rows.length);

//     // Add ID, Date, and Time
//     const id = table.rows.length;
//     const date = new Date().toLocaleDateString();
//     const time = new Date().toLocaleTimeString();

//     // Populate cells with form data
//     const columns = ['ID', 'FirstName', 'PhoneNumber', 'Email', 'Place', 'Date', 'Time'];
//     for (const column of columns) {
//       const cell = newRow.insertCell();
//       const value = column === 'ID' ? id : formData.get(column);
//       cell.innerHTML = value || '';
//     }

//     // Update Date and Time cells
//     newRow.cells[5].innerHTML = date; // Index 5 corresponds to the 'Date' column
//     newRow.cells[6].innerHTML = time; // Index 6 corresponds to the 'Time' column

//     // Optionally, you can provide feedback to the user
//     alert('Form data added successfully!');

//     // Clear form fields
//     this.reset();
//   });

async function saveChanges(event) {
    event.preventDefault();
    console.log("kkooiii");

    // Get the edited values
    const firstName = document.getElementById('inputFirstName').value;
    const phoneNumber = document.getElementById('inputPhoneNumber').value;
    const email = document.getElementById('inputEmail').value;
    const place = document.getElementById('inputPlace').value;

    // Get the UID of the authenticated user
    const uid = sessionStorage.getItem('uid');

    if (!uid) {
        console.error('User not authenticated');
        return Promise.reject('User not authenticated');
    }

    // Create an object with the data to be saved
    const dataToSave = {
        firstName: firstName,
        phoneNumber: phoneNumber,
        email: email,
        place: place,
    };

    console.log(dataToSave);
    // Reference to the user's profile document
    const userDocRef = doc(firestore, `users/${uid}/profile`);

    try {
        await setDoc(userDocRef, dataToSave);
        console.log('Data successfully added to Firestore');
    } catch (error) {
        console.error('Error adding data to Firestore: ', error);
    }
}


// // Function to read data from Firestore
// function displayUserData() {
//     // Get the UID of the authenticated user
//     const uid = sessionStorage.getItem('uid');

//     if (!uid) {
//         console.error('User not authenticated');
//         return Promise.reject('User not authenticated');
//     }

//     // Reference to the user's profile collection
//     const userCollectionRef = collection(firestore, `users/${uid}/profile`);

//     // Get all documents in the collection
//     getDocs(userCollectionRef)
//         .then((querySnapshot) => {
//             // Display the data
//             // Assuming your Firestore documents have fields like fullName, mobile, email, etc.
//             querySnapshot.forEach((doc) => {
//                 const userData = doc.data();

//                 // Document ID
//                 documentId = doc.id

//                 // Update HTML elements with user data
//                 document.getElementById('company-name').textContent = userData.companyName;
//                 document.getElementById('full-name').textContent = userData.fullName;
//                 document.getElementById('mobile').textContent = userData.mobile;
//                 document.getElementById('email').textContent = userData.email;
//                 document.getElementById('location').textContent = userData.location;
//                 document.getElementById('personal-info').textContent = userData.personalInfo;


//                 document.getElementById('company-name-display').textContent = userData.companyName;
//                 document.getElementById('full-name-display').textContent = userData.fullName;
//                 document.getElementById('user-name').textContent = userData.fullName;
//             });
//         })
//         .catch((error) => {
//             console.error('Error reading data from Firestore: ', error);
//         });
// }

// // Example of calling the displayUserData function
// displayUserData();