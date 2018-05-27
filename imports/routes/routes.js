import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import NotFound from '../ui/NotFound';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import Login from '../ui/Login';



const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnaunthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAunthenticatedPage = authenticatedPages.includes(pathname);

  if (isAunthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  } else if (isUnaunthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links');
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
