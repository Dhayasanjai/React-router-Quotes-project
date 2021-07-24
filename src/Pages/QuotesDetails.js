import { Fragment, useEffect } from 'react';
import { Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import useHttp from '../Hooks/useHttp';
import { getOneQuote } from '../LIb/api';
import Comments from '../Components/Comments';
import gif from '../Components/gif.gif';
const QuotesDetails = () => {
  const { quotesId } = useParams();
  const { sendRequest, status, error, data: loadedData } = useHttp(getOneQuote);
  const match = useRouteMatch();
  useEffect(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);

  let content;
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
  if (status === 'completed' && !error) {
    const newDate = new Date(loadedData.date);
    content = (
      <Fragment>
        <div className=" flex flex-col w-10/12  gap-2 mt-24 py-6 px-3 mx-4 bg-gray-600 rounded-xl ">
          <div className="text-white font-bold text-xl ">
            <span className=" text-gray-800  text-2xl ">Quote</span> : "
            {loadedData.text}
            ".
          </div>
          <div className="text-white font-bold text-2xl ">
            <span className=" text-gray-800  ">Author</span> :
            {loadedData.author.toUpperCase()}
          </div>
          <div className="text-white font-bold text-xl ">
            <span className=" text-gray-800  text-2xl ">Date</span> :{' '}
            {newDate.getDate()}-
            {newDate.toLocaleString('en-US', { month: 'long' })}-
            {newDate.getFullYear()}{' '}
          </div>
        </div>

        <Route path="/quotes/:quotesId" exact>
          <Link to={`${match.url}/comments`}>
            <button
              type="submit"
              className="bg-pink-600 text-white font-bold text-2xl border-2 border-white  rounded-xl  px-3 py-2"
            >
              Load Comments
            </button>
          </Link>
        </Route>
        <Route path={`${match.path}/comments`}>
          {' '}
          <Comments></Comments>
        </Route>
      </Fragment>
    );
  }
  return (
    <div className="mx-auto max-w-3xl  flex flex-col items-center gap-10">
      {content}
    </div>
  );
};
export default QuotesDetails;
