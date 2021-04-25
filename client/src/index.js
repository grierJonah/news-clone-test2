import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux"
import reducer from './reducers/reducer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './index.css';
import HomePage from './components/homepage/HomePage'
import Register from './components/register/register'
import Login from './components/login/login'
import Post from './components/post/post'
import EditComment from './components/clickable_posts/comment_form/editCommentForm'
import EditUrlPost from './components/homepage/body/posts/edit_posts/edit_post_url_form';
import EditBodyPost from './components/homepage/body/posts/edit_posts/edit_post_body_form';
import Profile from './components/profile/profile'
import individualPost from './components/clickable_posts/individualPost'

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={"/signup"} component={Register} />
        <Route exact path={"/authenticate"} component={Login} />
        <Route exact path={"/add_post"} component={Post} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/:individualPost"} component={individualPost}/>
        <Route exact path={"/edit_post/:individualComment"} component={EditComment} />
        <Route exact path={"/edit_url_post/:Post"} component={EditUrlPost} />
        <Route exact path={"/edit_body_post/:Post"} component={EditBodyPost} /> 
        <Route render={() => <h1>Path not found!</h1>} />
        <HomePage />
      </Switch>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
