import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { HealthCheck } from "./pages/HealthCheck";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { DesignSystemPreview } from "./pages/DesignSystemPreview";
import { Tasks } from "./pages/Tasks";
import { CheckIns } from "./pages/CheckIns";
import { Friends } from "./pages/Friends";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/health-check" element={<HealthCheck />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/design-system" element={<DesignSystemPreview />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/checkins" element={<CheckIns />} />
          <Route path="/friends" element={<Friends />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
