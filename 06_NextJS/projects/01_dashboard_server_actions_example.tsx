import { revalidatePath } from 'next/cache';

// Mini project core: dashboard task list using server actions.
// Beginner: form submits to server action directly.
// Advanced: revalidatePath keeps data view fresh without full page reload.

let tasks = [
  { id: 1, title: 'Review deployment logs' },
  { id: 2, title: 'Update metrics dashboard' }
];

async function addTask(formData: FormData) {
  'use server';

  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;

  tasks = [...tasks, { id: Date.now(), title }];
  revalidatePath('/dashboard');
}

export default function DashboardServerActionsExample() {
  return (
    <main>
      <h1>Ops Dashboard</h1>
      <form action={addTask}>
        <input name="title" placeholder="New task" />
        <button type="submit">Add</button>
      </form>
      <ul>{tasks.map((task) => <li key={task.id}>{task.title}</li>)}</ul>
    </main>
  );
}
