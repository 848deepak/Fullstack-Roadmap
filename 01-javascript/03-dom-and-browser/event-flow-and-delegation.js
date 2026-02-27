// Event bubbling and capturing demo.
// Use this script in browser console with any nested HTML structure.

document.addEventListener('click', (event) => {
  // Event delegation: handle clicks from dynamic children.
  if (event.target.matches('.delegated-item')) {
    console.log('Delegated click on:', event.target.textContent)
  }
})

const parent = document.getElementById('taskList')

if (parent) {
  parent.addEventListener(
    'click',
    () => {
      console.log('Capturing phase on parent')
    },
    true,
  )

  parent.addEventListener('click', () => {
    console.log('Bubbling phase on parent')
  })
}
