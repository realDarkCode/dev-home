//variable

var todoBody = document.querySelector('.todo-body-inner');
var todoInputText = document.querySelector('.todo-input-text');
var todoInput = document.querySelector('.todo-input');
var todoInputBtn = document.querySelector('.todo-input-btn');
var todofilterBtn = document.querySelector('.todoFilter');
var todoTimingInput = document.querySelector('.todo-input-time');

//getting back all todo list from local storage
getTodoBack();
//event listener
todoInputBtn.addEventListener('click', function () {
	if (todoInput.classList.contains('active')) {
		if (todoInputText.value.length != 0) {
			let txt = todoInputText.value.toLowerCase();
			addTodo(txt);


		}
	}
	else {
		todoInput.classList.add('active')
	}
})
document.body.addEventListener('click', function (e) {
	var divClass = e.target.className;
	if (divClass != "todo-input" && divClass != "input-grp" && divClass != "todo-input-text" && divClass != "todo-input-time" && divClass != "todo-input-btn") {
		if (todoInput.classList.contains('active')) {
			todoInput.classList.remove('active');

		}

	}
})
todofilterBtn.addEventListener('click', todoFilter);





//complete function
todoBody.addEventListener('click', function (e) {
	var item = e.target;
	if (item.classList[2] === 'todo-complete') {
		completeTodo(item);
	}
	else if (item.classList[2] === 'todo-delete') {
		deleteTodo(item);
	}
})




function addTodo(inputText) {


	//checking is todo value already match
	if (!checkTodoMatch(inputText)) {
		//making main div which content all element
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-iteam');

		//making todo left icon
		const todoLeftIcon = document.createElement('div');
		todoLeftIcon.classList.add('todo-item-icon');
		todoLeftIcon.innerHTML = ' <i class="fas fa-thumbtack"></i>';
		todoItem.appendChild(todoLeftIcon);// appending icon to todo item

		//creatin todo iteam main body
		const todo = document.createElement('div');
		todo.className = 'todo';

		// adding text
		const todoText = document.createElement('div');
		todoText.className = 'todo-text';
		todoText.innerText = inputText;
		todo.appendChild(todoText);//appending text to todo 

		// adding time
		const todoTiming = document.createElement('div');
		todoTiming.className = 'todo-timing';
		var hour = todoTimingInput.value.slice(0, 2);
		var min = todoTimingInput.value.slice(3, 5);
		var sec = todoTimingInput.value.slice(6, 8);
		todoTiming.innerText = hour + ":" + min + ":" + sec;

		//setting timeout function to change timeout every sec
		//setTimeOut(todoTiming);

		todo.appendChild(todoTiming);//appending timing to todo 

		// adding icons
		const todoIcon = document.createElement('div');
		todoIcon.className = "todo-icons";
		todoIcon.innerHTML = '<i class="fas fa-trash todo-delete"></i><i class="fas fa-check todo-complete"></i>';

		todo.appendChild(todoIcon);//appending timing to todo 


		//appeding all to main todo element on html
		todoItem.appendChild(todo);
		todoBody.appendChild(todoItem);

		//saving todo to local storage
		addLocalTodos(inputText);

		todoInputText.value = '';//clearing input value
	}

}
function setTimeOut(item) {

	setInterval(() => {
		let todoHour = Number(item.innerText.slice(0, 2));
		let todoMin = Number(item.innerText.slice(3, 5));
		let todoSec = Number(item.innerText.slice(6, 8));
		todoSec += 1;
		console.log(todoSec);
		item.innerText = todoHour + ":" + todoMin + ":" + todoSec;
		// console.log(hour + ":" + min + ":" +sec)
	}, 1000);
}
function checkTodoMatch(text) {
	var isFounded;
	let allTodo = todoBody.childNodes;
	allTodo.forEach((todoItem) => {
		//someting get #text, so our program should don't stop
		try {
			todoItem = todoItem.lastChild.firstChild.innerText.toLowerCase();
			if (todoItem == text) {
				//if founded then display this alert and deafult input value
				alert('Your Inputed todo is already exist');
				todoInputText.value = '';
				isFounded = true;

			}
		}
		catch (e) {
			//doing nothting (for syntax error)
		}
	})
	//if matched returning true 
	if (isFounded) {
		return true;
	}
	else {
		return false;
	}
}
//complte todo function
function completeTodo(item) {
	//grabing main div 
	item = item.parentElement.parentElement.parentElement;
	item.classList.add('todoItemCompleted')
	item.querySelector('.todo-timing').innerText = 'Completed!';
	//postioning div to last element of todo
	item.parentNode.appendChild(item);
}
//deleting todo item

function deleteTodo(item) {
	removeLocalTodo(item);
	//grabing main div 
	item = item.parentElement.parentElement.parentElement;
	//adding class for animated delete
	item.classList.add('deleteTodo');
	//after animation deleting todo item
	item.addEventListener("transitionend", () => item.remove())

}

//todo filter to show complete and uncolplete list separately
function todoFilter(e) {
	const todoList = todoBody.childNodes;
	var x = 0;
	todoList.forEach(function (todo) {
		try {
			switch (e.target.value) {
				case 'all':
					todo.style.display = 'flex';


					break;
				case 'completed':
					if (todo.classList.contains('todoItemCompleted')) {
						todo.style.display = 'flex';
					}
					else {
						todo.style.display = 'none';
					}
					break;
				case 'uncompleted':
					if (!todo.classList.contains('todoItemCompleted')) {
						todo.style.display = 'flex';


					}
					else {

						todo.style.display = 'none';
					}
					break;
			}
		}
		catch (error) {

		}

	})

}


function addLocalTodos(todo) {
	//checking is there any item in local stroge?
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = []
	}
	else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	//checking is todo already have in local storage
	var isMatched = false;
	todos.forEach(function (mytodo) {
		if (mytodo.includes(todo)) {
			isMatched = true;

		}

	})
	if (!isMatched) {
		todos.push(todo);
	}
	localStorage.setItem('todos', JSON.stringify(todos));
}
//removing todos item from local storage
function removeLocalTodo(item) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = []
	}
	else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	item = item.parentElement.parentElement.firstChild.innerText.toLowerCase();
	const todoIndex = todos.indexOf(item);
	todos.splice(todoIndex, 1)//removing value from local storage
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodoBack() {
	//checking is there any item in local stroge?
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = []
	}
	else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function (todoText) {
		addTodo(todoText)
	})
}
