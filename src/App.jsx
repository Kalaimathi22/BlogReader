
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./Posts";
import PostDetails from "./PostDetails";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route
          path="*"
          element={<h2>404 - Page Not Found</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
