// Beginner: Promise.all runs requests in parallel.
// Advanced: avoids waterfall latency in server components.

async function getUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
    next: { revalidate: 60 }
  });
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

async function getPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', {
    next: { revalidate: 60 }
  });
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

export default async function ParallelDataFetching() {
  const [user, posts] = await Promise.all([getUser(), getPosts()]);

  return (
    <main>
      <h1>{user.name}</h1>
      <ul>{posts.map((post: { id: number; title: string }) => <li key={post.id}>{post.title}</li>)}</ul>
    </main>
  );
}
