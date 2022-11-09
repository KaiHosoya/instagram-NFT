import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./views/home";
import Post from "./views/post";
import Profile from "./views/profile";
import Test from "./views/test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = { <Home /> } />
        <Route path="/post" element={ <Post />} />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/test" element={ <Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
