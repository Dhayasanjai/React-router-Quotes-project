import { useReducer, useCallback } from 'react';
const reduceHandler = (state, action) => {
  if (action.type === 'SEND') {
    return { status: 'pending', data: null, error: null };
  }
  if (action.type === 'COMPLETED') {
    return { status: 'completed', data: action.responseData, error: null };
  }
  if (action.type === 'ERROR') {
    return { status: 'completed', data: null, error: action.errorMessage };
  }
  return state;
};
const useHttp = (requestFunction, showPending = false) => {
  const [httpState, dispatchHttpState] = useReducer(reduceHandler, {
    status: showPending ? 'pending' : null,
    error: null,
    data: null,
  });
  const sendRequest = useCallback(
    async function (requestData) {
      dispatchHttpState({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);

        dispatchHttpState({ type: 'COMPLETED', responseData });
      } catch (error) {
        dispatchHttpState({
          type: 'ERROR',
          errorMessage: error || 'something went wrong ',
        });
      }
    },
    [requestFunction]
  );
  return {
    sendRequest,
    ...httpState,
  };
};
export default useHttp;
