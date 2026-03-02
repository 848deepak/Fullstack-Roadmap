// Beginner: simple server-rendered page in App Router.
// Advanced: fetch in server component keeps API keys/server logic off client bundle.

type Todo = { id: number; title: string };

async function getTodos(): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
    cache: 'no-store'
  });

  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
}

export default async function BeginnerSsrPage() {
  const todos = await getTodos();

  return (
    <main>
      <h1>SSR Todos</h1>
      <ul>{todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
    </main>
  );
}
