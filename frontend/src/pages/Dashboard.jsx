import Button from "@components/UI/Button"; 
import toast from "react-hot-toast";
import { useApi } from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";

function Dashboard() {
  const api = useApi();
  const { setAuthToken } = useAuth();

  const handleLogOut = async () => {
    try {
      await api.post("/user/logout");
      toast.success("Logged out successfully.");
    } catch (err) {
      toast.error("Unable to log out, something went wrong.");
      console.log(err);
    } finally {
      setAuthToken("");
    }
  };

  return (
    <>
      <Button onClick={handleLogOut}>Logout</Button>
    </>
  );
}

export default Dashboard;
