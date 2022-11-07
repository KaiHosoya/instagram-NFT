import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./views/home";
import Post from "./views/post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = { <Home /> } />
        <Route path="/post" element={ <Post />} />
        {/* <Router path="/profile" element={ <Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
