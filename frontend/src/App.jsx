import { Routes, Route } from "react-router-dom";
import Navbar from '@components/Navbar';
import SiteBody from '@components/SiteBody';
import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';
import '@styles/components.css';

export default function App() {

  return (
    <>
      <Navbar />
      <SiteBody>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes >
      </SiteBody>
    </>
  );
}
