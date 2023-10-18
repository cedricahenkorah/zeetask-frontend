import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/home/LandingPage";
import CreateAdmin from "./pages/auth/CreateAdmin";
import CreateTeam from "./pages/auth/CreateTeam";
import DebitWallet from "./pages/payments/DebitWallet";
import Workspace from "./pages/dashboard/Workspace";
import Login from "./pages/auth/Login";
import AddTeamMate from "./pages/auth/AddTeamMate";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/add-teammate" element={<AddTeamMate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment/:teamId" element={<DebitWallet />} />
          <Route path="/dashboard/*" element={<Workspace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
