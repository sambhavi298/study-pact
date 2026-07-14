import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { HealthCheck } from "./pages/HealthCheck";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/health-check" element={<HealthCheck />} />
      </Route>
    </Routes>
  );
}

export default App;
