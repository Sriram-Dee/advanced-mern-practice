import { useState } from 'react'
import './App.css'
import { selectCount,increment, decrement } from './features/slices/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import Counter from './components/Counter';
import PostsList from './components/posts/postsList';
import PostItem from './components/posts/postItem';
function App() {
return (
  <>
    <BrowserRouter>
      <header>
        <nav className="nav text-center space-x-4 p-4 bg-gray-200 divide-x-2 divide-gray-400 ">
          <NavLink
            to="/"
            className={"px-4"}
          >
            Home
          </NavLink>
          <NavLink
            to="/counter"
            className={"px-4"}
          >
            Counter
          </NavLink>
          <NavLink
            to="/blogs"
            className={"px-4"}
          >
            Blogs
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="*" element={<h1>Home Page</h1>} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/blogs" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostItem />} />
      </Routes>
    </BrowserRouter>
  </>
);}

export default App
