import { useReducer } from 'react';

// Beginner: reducer updates state based on action type.
// Advanced: command map pattern avoids long switch blocks and scales better.
const commands = {
  INCREMENT: (state) => ({ ...state, count: state.count + 1 }),
  DECREMENT: (state) => ({ ...state, count: state.count - 1 }),
  RESET: (state) => ({ ...state, count: 0, history: [...state.history, state.count] })
};

function reducer(state, action) {
  const command = commands[action.type];
  return command ? command(state, action.payload) : state;
}

const initialState = { count: 0, history: [] };

export default function ReducerWithCommandPattern() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section>
      <h2>Counter Command Pattern</h2>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <pre>{JSON.stringify(state.history)}</pre>
    </section>
  );
}
