// Geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log('Latitude:', position.coords.latitude)
    console.log('Longitude:', position.coords.longitude)
  })
}

// Intersection Observer API
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('Element visible:', entry.target)
    }
  })
})

const target = document.querySelector('#observe-me')
if (target) observer.observe(target)

// Clipboard API
async function copyText(text) {
  await navigator.clipboard.writeText(text)
  console.log('Copied to clipboard')
}

copyText('Hello from Clipboard API')
