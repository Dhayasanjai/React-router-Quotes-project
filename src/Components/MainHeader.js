import { NavLink } from 'react-router-dom';
const MainHeader = () => {
  const activeButtonStyles = 'bg-pink-600 rounded-xl  py-2';
  return (
    <div className="fixed top-0 left-0">
      <header className="w-screen py-4  bg-gray-700 text-white flex font-bold   fixed mt-0 ml-0 items-center justify-between px-2 md:px-20">
        <div className="w-3/5 text-xl md:text-3xl">Great Quotes</div>
        <ul className="flex w-3/5 justify-around items-center">
          <NavLink activeClassName={activeButtonStyles} to="/quotes">
            <li className="px-4 md:px-6  text-lg md:text-2xl">Quotes</li>
          </NavLink>
          <NavLink activeClassName={activeButtonStyles} to="/new-quotes">
            <li className="px-4 md:px-6    text-lg md:text-2xl">Add</li>
          </NavLink>
        </ul>
      </header>
    </div>
  );
};
export default MainHeader;
