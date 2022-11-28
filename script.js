"use strict";

const form = document.forms[0]
form.addEventListener("submit", (event) => event.preventDefault()) ///предотвращает отправку формы

const inputTask = document.querySelector(".form_in");

const addTask = document.querySelector(".btn");

const taskPlace = document.querySelector(".checkBox");

const delAll = document.querySelector(".del_all")

const buttons = document.querySelector(".del_btn")

const delChecked = document.querySelector(".del")

function createTask(state, taskText) {
  const task = document.createElement("div");
  const checkbox = document.createElement("input");
  const text = document.createElement("label");
  const delTask = document.createElement("div");

  task.className = "option";
  checkbox.className = "check_input";
  checkbox.type = 'checkbox'
  checkbox.checked = state
  state ? text.classList.add("checked") : null
  text.textContent = taskText;
  delTask.textContent = '❌'
  delTask.className = "del_task";

  task.append(checkbox, text, delTask);
  return task;
}

function saveTasks() {
  let arr = []
  const todos = document.querySelectorAll(".option")
  todos.forEach((element) => {
    arr.push({
      status: element.childNodes[0].checked,
      text: element.childNodes[1].innerText,
    })
  })

  localStorage.setItem("todos", JSON.stringify(arr))
  let leng = Object.values(JSON.parse(localStorage.getItem('todos'))).length
  return leng
}

function renderTasks(state, taskText) {
  // в главный узел вставляем то что возвращает ф-я по созданию таски (див с таской)
  taskPlace.append(createTask(state, taskText))
}

;(function main() {
  // если локал стор нe пустой
  if (localStorage.getItem("todos")) {
    // в массив заносим данные из локал стора
    let arr = JSON.parse(localStorage.getItem("todos"))
    buttons.style.display = "flex"
    // отрисовываем данные из массива
    arr.forEach((elem) => renderTasks(elem.status, elem.text))
  }
})()

addTask.addEventListener("click", () => {
  const input = document.querySelector(".form_in")
  buttons.style.display = "flex"
  renderTasks(false, input.value)
  input.value = ""
  saveTasks()
})
// обработка нажатий на таску
taskPlace.addEventListener("click", (event) => {
  let check = event.target
  // обработка нажатия на чекбокс
  if (check.type == "checkbox") {
    check.toggleAttribute("checked")
    check.nextSibling.classList.toggle("checked")
    saveTasks()
  } else { 
    // обработка нажатия на крестик
    check.parentNode.outerHTML = null

    let local = saveTasks()
    if (!local) {
      buttons.style.display = "none"
      localStorage.clear()
    }
  }
})
// удаление всех
delAll.addEventListener("click", () => {
  localStorage.clear()
  taskPlace.innerHTML = ""
  buttons.style.display = "none"
})
// удаление отмеченных
delChecked.addEventListener("click", () => {
  let arr = []
  const todos = document.querySelectorAll(".option")
  todos.forEach((element) => {
    arr.push({
      status: element.childNodes[0].checked,
      text: element.childNodes[1].innerText,
      })
  })

  let items = arr.filter((e) => !e.status)
  if (items.length === 0) {
  buttons.style.display = "none"  ///скрывает див с кнопками если taskPlase пустой
  }
  localStorage.clear()
  taskPlace.innerHTML = ""
  localStorage.setItem("todos", JSON.stringify(items))
  items.forEach((e) => {
    renderTasks(e.status, e.text)
  })
})