import Button from "@components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from '@hooks/useAuth';
import { useApi } from "@hooks/useApi";
import { useEffect } from "react";

function Dashboard() {
  const { user, setUser } = useAuth();
  const api = useApi();

  const handleLogOut = async () => {
    try {
      await api.post("/user/logout");
    } catch (err) {
      console.log(err);
      toast.error("Unable to logout user, something went wrong.");
    }
  }

  return (
    <>
      <Button onClick={handleLogOut}>Logout</Button>
    </>
  );
}

export default Dashboard;
