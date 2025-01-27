import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase,ref,push,set, onValue,update,remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
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
const database = getDatabase(app)

//Thêm một công việc
const formCreate = document.querySelector(".todo-app__create")
formCreate.addEventListener("submit" , (event) => {
  event.preventDefault();
  const content = event.target.content.value
  if(content){
    const todoRef = ref(database , "todos")
    const newTodoRef = push(todoRef)
    set(newTodoRef, {
      content: content,
      completed: false
    });

    event.target.content.value = ""
  }
  
  
})

//Lấy ra danh sách công việc

onValue(ref(database , "todos") , (items) => {
  let contentHTML = ""
  items.forEach((item) => {
    const key = item.key // lấy ra key
    const val = item.val() // lấy ra val
    
    contentHTML += `<div class="todo-app__item ${val.completed ? 'todo-app__item--completed' : ''}">
                <span class="todo-app__item-content">${val.content}</span>
                <div class="todo-app__item-actions">
                    <button class="todo-app__item-button todo-app__item-button--edit">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="todo-app__item-button todo-app__item-button--complete" button-completed item-key="${key}" show="${val.completed ? 'none':''}">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="todo-app__item-button todo-app__item-button--delete"
                    button-remove item-key="${key}"> 
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>`     
  });

  const todoList = document.querySelector(".todo-app__list")
  todoList.innerHTML = contentHTML

  // Hoàn thành công việc
  const buttonList = document.querySelectorAll("[button-completed]")
  
  buttonList.forEach(button => {
    button.addEventListener("click" , () => {
      const key = button.getAttribute("item-key")
      update(ref(database , `todos/${key}`), {
        completed:true
      })
    })
  })

  //Xóa công việc
  const buttonDeleteList = document.querySelectorAll("[button-remove]")
  
  buttonDeleteList.forEach(button => {
    button.addEventListener("click", () => { 
      console.log("OK");
      
      const key = button.getAttribute("item-key")
      
      remove(ref(database , `todos/${key}`))
    })
  })
})


