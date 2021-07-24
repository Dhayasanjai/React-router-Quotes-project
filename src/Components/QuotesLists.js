import { Link } from 'react-router-dom';
const QuotesList = (props) => {
  return (
    <li className="bg-gray-600 text-white font-bold p-6 mx-4  md:text-xl">
      <figure className="">
        <h1>"{props.text}"</h1>
        <figcaption className="float-right ">
          -{props.author.toUpperCase()}.
        </figcaption>
      </figure>
      <Link to={`/quotes/${props.id}`}>
        <button className="mt-12 rounded-lg font-bold text-center  px-4 py-1 bg-pink-600">
          Full Screen
        </button>
      </Link>
    </li>
  );
};
export default QuotesList;
