import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ScoreKeeper from "../pages/ScoreKeeper"
import NotFound from "../pages/404";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/:fieldslug" element={<Home />} />
      <Route path="/score-keeper" element={<ScoreKeeper />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}