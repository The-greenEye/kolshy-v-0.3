import { reactive } from 'vue';

// Simple error store
const state = reactive({
  errors: []
});

export function useErrorStore() {
  function addError(error) {
    state.errors.push({ ...error, time: new Date().toLocaleString() });
    console.error('[ErrorStore]', error);
  }

  function clearErrors() {
    state.errors.splice(0, state.errors.length);
  }

  return { errors: state.errors, addError, clearErrors };
}
