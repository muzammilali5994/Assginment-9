import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  
  import { getFirestore, doc, setDoc,   collection, updateDoc , getDoc, deleteDoc , onSnapshot } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
  import { getAuth,createUserWithEmailAndPassword ,onAuthStateChanged ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
  

  
const firebaseConfig = {
  apiKey: "AIzaSyDjIzFxciCfd5PuWoYIPst6nVVY4Q1S9LQ",
  authDomain: "class-practise-e3470.firebaseapp.com",
  projectId: "class-practise-e3470",
  storageBucket: "class-practise-e3470.firebasestorage.app",
  messagingSenderId: "842044276464",
  appId: "1:842044276464:web:862e23813224fd7df1cc35",
  measurementId: "G-C79FZGKR8J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



//Sign Up 

  const signUpEmail = document.getElementById("semail");
  const signUpPassword = document.getElementById("spassword");
  const signUpButton = document.querySelector("button");

  signUpButton.addEventListener("click", signup);

  function signup() {
      createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPassword.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }


// Sign In

  const signin = document.getElementById("signin");
  const email = document.getElementById("Iemail");
  const password = document.getElementById("Ipassword");
  signin.addEventListener("click", signinf);


  function signinf() {
    signInWithEmailAndPassword(auth, email.value, password.value )
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
  }

  // add data
  const did = document.getElementById("did");
  const dname = document.getElementById("dname");
  const dage = document.getElementById("dage");
  const addDataButton = document.getElementById("addDataButton");
  addDataButton.addEventListener("click", addData);

  function addData() {
    setDoc(doc(db, "users", did.value), {
      name: dname.value,
      age: dage.value 
    })
    .then(() => {
      console.log("Data added");
      did.value = "";
      dname.value = "";
      dage.value = "";

    })
    .catch((error) => {
      console.log(error);
      console.log("Not added");
    });
  }



  // update data
  const updateDataButton = document.getElementById("updateData");
  updateDataButton.addEventListener("click", updateData);
  async function updateData() {

    try{
      const ref = doc(db,"users", did.value);
      await updateDoc(ref, {
        name: dname.value,
        age: dage.value
      });
      console.log("Data updated");
    }
    catch(error){
      console.log(error);
    }
  }

  //delete data 

  const deleteBtn = document.getElementById("deletBtn");
  deleteBtn.addEventListener("click", deleteData);

  async function deleteData() {
    try {

      await deleteDoc (doc(db,"users", did.value));

      did.value = "";
      dname.value = "";
      dage.value = "";

      console.log("Data deleted");

    }

    catch(error){
      console.log(error);
    }
  }


//TABLE UPDATE
const tableBody = document.getElementById("tableBody");

const colRef = collection(db, "users");
onSnapshot(colRef,(x)=>{
  tableBody.innerHTML = "";
  x.forEach((dbData)=>{

    tableBody.innerHTML += `
    <tr>
    <td>${dbData.id}</td>
    <td>${dbData.data().name}</td>
    <td>${dbData.data().age}</td>
    </tr>
    
    `

  })
})