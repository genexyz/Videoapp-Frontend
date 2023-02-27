import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/404";
import Home from "./components/Home";
import Profile from "./components/Profile";
import VideoPage from "./components/VideoPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
