import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyC5n3DsqePsla7L4gs76i5_Xc9umToJW5c",
  authDomain: "todo-list-b304b.firebaseapp.com",
  projectId: "todo-list-b304b",
  storageBucket: "todo-list-b304b.firebasestorage.app",
  messagingSenderId: "140522337744",
  appId: "1:140522337744:web:a0ed49407bbae1b1a935d5",
  databaseURL: "https://todo-list-b304b-default-rtdb.firebaseio.com"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

const a = document.querySelector(".todo-app__create input[name='content']")
console.log(a);
