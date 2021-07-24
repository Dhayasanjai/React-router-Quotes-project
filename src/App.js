import React, { Suspense } from 'react';
import { Fragment } from 'react';
import MainHeader from './Components/MainHeader';
import { Route, Switch, Redirect } from 'react-router-dom';
import gif from './Components/gif.gif';
const NewQuotes = React.lazy(() => import('./Pages/NewQuotes'));
const QuotesItems = React.lazy(() => import('./Pages/QuotesItems'));

const NotFound = React.lazy(() => import('./Pages/NotFound'));
const QuotesDetails = React.lazy(() => import('./Pages/QuotesDetails'));
const App = () => {
  return (
    <Suspense
      fallback={
        <p className=" flex justify-center items-center  fixed h-40 mt-42  w-full -z-10">
          <img src={gif} alt="loading"></img>
        </p>
      }
    >
      <Fragment>
        <MainHeader></MainHeader>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"></Redirect>
          </Route>
          <Route path="/quotes" exact>
            <QuotesItems></QuotesItems>
          </Route>
          <Route path="/new-quotes">
            <NewQuotes></NewQuotes>
          </Route>
          <Route path="/quotes/:quotesId">
            <QuotesDetails></QuotesDetails>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Fragment>
    </Suspense>
  );
};
export default App;
