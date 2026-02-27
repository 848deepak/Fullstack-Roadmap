async function getPosts() {
  try {
    // Fetch data from a public REST API.
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    // Convert response body to JavaScript objects.
    const posts = await response.json()
    console.log(posts)
  } catch (error) {
    // Handle network failures or parsing issues.
    console.error('Fetch failed:', error)
  }
}

getPosts()
