import React, { useState, useRef, useEffect } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import useHttp from '../Hooks/useHttp';
import { AddQuotes } from '../LIb/api';

const NewForm = () => {
  const { sendRequest, status, error } = useHttp(AddQuotes);
  const textRef = useRef();
  const authorRef = useRef();

  const history = useHistory();

  useEffect(() => {
    if (status === 'completed' && !error) {
      history.push('/quotes');
    }
  }, [status, history, error]);
  const [showPrompt, setShowPrompt] = useState(false);
  const formFocusHandler = () => {
    setShowPrompt(true);
  };
  const buttonClickHandler = () => {
    setShowPrompt(false);
  };
  const newFormSubmitHandler = (event) => {
    event.preventDefault();

    sendRequest({
      text: textRef.current.value,
      author: authorRef.current.value,
      date: new Date(),
    });
  };
  return (
    <React.Fragment>
      {status === 'pending' && (
        <p className="text-center mt-42 mb-4 text-center font-bold text-white text-4xl animate-pulse">
          Sending...
        </p>
      )}
      {error && (
        <p className="text-center mt-42 z-10 font-bold text-white text-4xl animate-pulse">
          {' '}
          {error}
        </p>
      )}

      <Prompt
        when={showPrompt}
        message="Are you sure  if you leave you entered data will Lost "
      ></Prompt>
      <form
        onFocus={formFocusHandler}
        onSubmit={newFormSubmitHandler}
        className="bg-blue-500 mx-4 rounded-lg  pb-20"
      >
        <div className="flex flex-wrap flex-col gap-10 relative  p-4   overflow-hidden">
          <div>
            <div className="w-40 h-2 bg-pink-600  float-right transform -right-16  absolute rotate-45"></div>
            <div className="w-40 h-2 bg-pink-600  float-right transform -right-10  absolute rotate-45"></div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-2xl ">Quote : </label>

            <input
              ref={textRef}
              className="font-bold rounded-md px-2 border border-black  outline-none focus:bg-purple-500 md:w-6/12 text-xl "
              type="text"
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-2xl ">Author :</label>

            <input
              ref={authorRef}
              className="font-bold rounded-md px-2 border border-black  outline-none focus:bg-purple-500 md:w-6/12 text-xl "
              type="text"
            ></input>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={buttonClickHandler}
            className="bg-purple-600  text-white font-bold text-2xl border-2  cursor-pointer border-purple-900 float-right  mr-10 rounded-xl  px-3 py-2"
          >
            Add Quotes
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default NewForm;
