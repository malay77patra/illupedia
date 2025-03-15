import { Routes, Route } from "react-router-dom";
import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';
import '@styles/components.css';
import SiteLayout from "@components/SiteLayout";

export default function App() {

  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes >
    </SiteLayout>
  );
}
