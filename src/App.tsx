import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import {UsersPage} from './components/UsersPage/UsersPage';
import {PostsPage} from './components/PostsPage/PostsPage';
import {PostDetailsPage} from './components/PostDetailsPage/PostDetailsPage';
import { Register } from './components/Authorization/Register';
import { Login } from './components/Authorization/Login';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/posts/:userId" element={<PostsPage />} />
          <Route path="/post/:postId" element={<PostDetailsPage />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
