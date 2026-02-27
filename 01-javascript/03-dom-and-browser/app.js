// Select important DOM elements once and reuse them.
const taskInput = document.getElementById('taskInput')
const addTaskBtn = document.getElementById('addTaskBtn')
const taskList = document.getElementById('taskList')

addTaskBtn.addEventListener('click', () => {
  // trim() prevents empty spaces from being accepted as tasks.
  const value = taskInput.value.trim()
  if (!value) return

  // Create and configure a new list item.
  const listItem = document.createElement('li')
  listItem.textContent = value

  listItem.addEventListener('click', () => {
    // Toggle completed style when item is clicked.
    listItem.style.textDecoration = listItem.style.textDecoration === 'line-through'
      ? 'none'
      : 'line-through'
  })

  taskList.appendChild(listItem)
  taskInput.value = ''
})
