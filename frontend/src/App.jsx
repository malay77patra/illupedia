import { Routes, Route } from "react-router-dom";
import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';
import Auth from "@pages/Auth";
import '@styles/components.css';
import SiteLayout from "@components/SiteLayout";

function App() {

  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes >
    </SiteLayout>
  );
}

export default App;
