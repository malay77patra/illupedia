import { Routes, Route } from "react-router-dom";
import Navbar from '@components/Navbar';
import SiteBody from '@components/SiteBody';
import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';
import Auth from "@pages/Auth";
import { useAuth } from "@hooks/useAuth";
import '@styles/components.css';

export default function App() {
  const { accessToken, setAccessToken } = useAuth();

  return (
    <>
      <Navbar />
      <SiteBody>
        {accessToken ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes >
        ) : (
          <Auth />
        )}
      </SiteBody>
    </>
  );
}
