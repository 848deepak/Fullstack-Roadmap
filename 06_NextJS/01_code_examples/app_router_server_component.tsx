// Beginner: Server Components render on server by default in Next.js App Router.
// Advanced: This reduces client-side JavaScript and improves performance.

type Todo = { id: number; title: string };

async function getTodos(): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
    next: { revalidate: 60 }
  });

  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
}

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <main>
      <h1>Server Rendered Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </main>
  );
}
