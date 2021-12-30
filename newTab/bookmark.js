const addForm = document.querySelector('.add');
const todosList = document.querySelector('.todos');//ul
const search = document.querySelector('.search input');


//Add todos start================================================================
function appendTodoHtml(todo_title){
    const htmlTemplate = `
        <li class="list-group-item d-flex justify-content-between align-item-center">
            <span>${todo_title}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;
    todosList.innerHTML+=htmlTemplate;
}

addForm.addEventListener('submit',e =>{
    e.preventDefault();//prevent default refreshing upon submission

    const todo_title = addForm.add.value.trim();//trim leading and trailing spaces
    if(todo_title.length){
        appendTodoHtml(todo_title);
        addForm.reset();
    }
});
//Add todos end===================================================================

//Delete todos on clicking on trash icon==========================================
//we will use event delegation for deletion,if we don't do this, we will get in trouble 
//with newly added todos
//we will add eventListener to whole ul, which will delegate
//if clicked on target trash icon just delete that 
todosList.addEventListener('click',e => {
    // if(e.target.nodeName=='I'){//what if we have several I tag 
    //     console.log(e.target.parentElement);
    // }
    if(e.target.classList.contains('delete')){//fine, bcz delete class is specific to trash
        e.target.parentElement.remove();
    }
});
//Delete todos end====================================================================
//search  in todos====================================================================
function filterTodos(term) { 
    //for unmatched, add filtered class
    Array.from(todosList.children)
    .filter(function (todo) { 
        return !todo.textContent.toLowerCase().includes(term);//.includes(term)
     })
    .forEach(function (unmatched) { 
        unmatched.classList.add('filtered');//display none
    })
    //for matched, remove filtered class
    Array.from(todosList.children)
    .filter(function (todo) { 
        return todo.textContent.toLowerCase().includes(term);//.includes(term)
     })
    .forEach(function (matched) { 
        matched.classList.remove('filtered');//display again
    })
}
search.addEventListener('keyup',() => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});
