export const initialCartState = { items: [] }

export function cartReducer(state, action) {
  // Reducer: pure function that maps (state, action) -> newState.
  switch (action.type) {
    case 'add':
      return { ...state, items: [...state.items, action.payload] }
    case 'remove':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    default:
      return state
  }
}
