import { Fragment, useRef, useEffect } from 'react';
import { AddComments } from '../LIb/api';

import useHttp from '../Hooks/useHttp';
import { useParams } from 'react-router';
const CommentsForm = (props) => {
  const { sendRequest, status, error } = useHttp(AddComments);

  const { fetchData } = props;
  useEffect(() => {
    if (status === 'completed' && !error) fetchData();
  }, [fetchData, status, error]);
  const { quotesId } = useParams();
  const commentRef = useRef();
  const submitHandler = (eve) => {
    eve.preventDefault();
    sendRequest({
      enteredComments: commentRef.current.value,
      quoteId: quotesId,
    });

    commentRef.current.value = '';
  };
  return (
    <Fragment>
      {error && (
        <p className="text-center mt-42 z-10 font-bold text-white text-4xl animate-pulse">
          {' '}
          {error}
        </p>
      )}

      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-5 mt-4 max-w-4xl justify-center items-center "
      >
        <p className="font-bold text-white text-2xl">Enter Your Comments...</p>
        <input
          required
          ref={commentRef}
          placeholder="type here.."
          type="text"
          className="font-bold text-xl w-72 max-w-4xl h-10 p-1"
        ></input>

        <button
          type="submit"
          className="bg-pink-600 text-white font-bold text-2xl border-2  border-white  rounded-xl  px-3 py-2"
        >
          Add My Comment
        </button>
      </form>
    </Fragment>
  );
};
export default CommentsForm;
