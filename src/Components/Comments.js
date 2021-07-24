import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsForm from './CommentsForm';
import CommentsList from './CommentsList';
import useHttp from '../Hooks/useHttp';
import { GetComments } from '../LIb/api';
import gif from '../Components/gif.gif';
const Comments = () => {
  const [isShowComment, setIsShowComment] = useState(false);
  const { quotesId } = useParams();
  const {
    sendRequest,
    status,
    error,
    data: loadedData,
  } = useHttp(GetComments, true);
  useEffect(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);
  const fetchCommentsHandler = useCallback(() => {
    sendRequest(quotesId);
    console.log('in inside the callback');
  }, [sendRequest, quotesId]);
  let content;
  const changeShowCommentsHandler = () => {
    setIsShowComment((prevIsShow) => !prevIsShow);
  };

  if (status === 'pending') {
    content = (
      <p className="text-center  relative   top-40 mt-42 z-10 font-bold text-white text-4xl animate-pulse">
        <img src={gif} alt="loading"></img>
      </p>
    );
  }
  if (error) {
    content = (
      <p className="text-center  relative   top-40 mt-42 z-10 font-bold text-white text-4xl animate-pulse">
        {error}
      </p>
    );
  }

  if (status === 'completed') {
    content = (
      <Fragment>
        {!isShowComment && (
          <button
            type="submit"
            className="bg-pink-600 text-white font-bold text-2xl border-2 border-white  rounded-xl  px-3 py-2 "
            onClick={changeShowCommentsHandler}
          >
            Add Your Comments
          </button>
        )}
        {isShowComment && (
          <CommentsForm fetchData={fetchCommentsHandler}></CommentsForm>
        )}
        <p className="text-white font-bold text-2xl text-center">
          Users Comments...
        </p>
        <ul className=" bg-gray-500 mx-auto max-w-2xl p-10 w-10/12 mb-10 rounded-md  items-center justify-center  flex flex-col gap-7 ">
          {loadedData.length === 0 && (
            <p className="text-center  z-10 font-bold text-white text-2xl ">
              No Comments found you may be add some one!...
            </p>
          )}
          {loadedData.length > 0 &&
            loadedData.map((comment) => {
              return (
                <CommentsList
                  key={Math.random()}
                  comment={comment}
                ></CommentsList>
              );
            })}
        </ul>
      </Fragment>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};
export default Comments;
