import { useMemo, useReducer } from 'react';

// Mini project core: task board state model.
// Beginner: reducer centralizes task updates.
// Advanced: immutable updates keep render behavior predictable.
const initialState = {
  columns: {
    todo: [{ id: 't1', title: 'Design API contract' }],
    doing: [],
    done: []
  }
};

function boardReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const title = action.payload.title?.trim();
      if (!title) return state;
      const newTask = { id: crypto.randomUUID(), title };
      return {
        ...state,
        columns: { ...state.columns, todo: [...state.columns.todo, newTask] }
      };
    }
    case 'MOVE_TASK': {
      const { from, to, taskId } = action.payload;
      const task = state.columns[from].find((item) => item.id === taskId);
      if (!task) return state;

      return {
        ...state,
        columns: {
          ...state.columns,
          [from]: state.columns[from].filter((item) => item.id !== taskId),
          [to]: [...state.columns[to], task]
        }
      };
    }
    default:
      return state;
  }
}

export default function RealtimeTaskBoardCore() {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const totalTasks = useMemo(
    () => Object.values(state.columns).reduce((sum, col) => sum + col.length, 0),
    [state.columns]
  );

  return (
    <section>
      <h2>Task Board Core</h2>
      <p>Total tasks: {totalTasks}</p>
      <button onClick={() => dispatch({ type: 'ADD_TASK', payload: { title: 'Write tests' } })}>Add Task</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </section>
  );
}
