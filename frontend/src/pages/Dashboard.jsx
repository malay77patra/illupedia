import Button from "@components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from '@hooks/useAuth';

function Dashboard() {
  const { user, setUser } = useAuth();

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true
        }
      );
      setUser(null);
      toast.success(response.data.message);
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
