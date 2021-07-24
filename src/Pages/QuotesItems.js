import { Link } from 'react-router-dom';

import QuotesList from '../Components/QuotesLists';
import { useHistory, useLocation } from 'react-router-dom';
import useHttp from '../Hooks/useHttp';
import { getAllQuotes } from '../LIb/api';
import { Fragment, useEffect } from 'react';
import gif from '../Components/gif.gif';
const sortFunction = (quotes, isSortByName) => {
  return quotes.sort((quoteA, quoteB) => {
    if (isSortByName) {
      if (quoteA.text > quoteB.text) {
        return 1;
      } else {
        return -1;
      }
    } else {
      const dateA = new Date(quoteA.date);
      const dateB = new Date(quoteB.date);
      if (dateA.getFullYear() < dateB.getFullYear()) {
        return 1;
      } else if (dateA.getFullYear() === dateB.getFullYear()) {
        if (dateA.getMonth() < dateB.getMonth()) {
          return 1;
        } else if (dateA.getMonth() === dateB.getMonth()) {
          if (dateA.getDate() < dateB.getDate()) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    }
  });
};

const QuotesItems = () => {
  const {
    sendRequest,
    status,
    error,
    data: loadedData,
  } = useHttp(getAllQuotes, true);
  const location = useLocation();
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  const history = useHistory();
  const sortParams = new URLSearchParams(location.search);
  const isSortByName = sortParams.get('sort') === 'name';

  const sortChangeHandler = () => {
    history.push(`/quotes/?sort=${isSortByName ? 'date' : 'name'}`);
  };
  let sortedQuotes;
  if (loadedData) {
    sortedQuotes = sortFunction(loadedData, isSortByName);
  }
  let content;
  if (status === 'completed' && !error) {
    content = (
      <Fragment>
        {' '}
        <button
          onClick={sortChangeHandler}
          className="mt-24  rounded-3xl flex  gap-2  text-center w-10/12 border border-purple-900 bg-blue-500 text-2xl font-bold text-white px-6 py-2"
        >
          <p className=" animate-pulse"> {'>'}</p>{' '}
          <p>Sort By {isSortByName ? 'date' : 'quote'}</p>
        </button>
        <ul className="flex flex-col gap-4  w-11/12">
          {sortedQuotes.map((quote) => {
            return <QuotesList key={quote.id} {...quote}></QuotesList>;
          })}
        </ul>{' '}
      </Fragment>
    );
  }

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
  if (!error && status === 'completed' && loadedData.length < 1) {
    content = (
      <Fragment>
        <p className="text-center  relative   top-40 z-10 font-bold text-white text-4xl ">
          No Quotes found may be add some one
        </p>
        <Link
          className="bg-pink-600 rounded-xl relative top-48 py-2 px-4 font-bold text-white text-2xl "
          to="/new-quotes"
        >
          Add New
        </Link>
      </Fragment>
    );
  }

  return (
    <div className="mx-auto max-w-2xl  flex flex-col gap-7 items-center ">
      {content}
    </div>
  );
};
export default QuotesItems;
