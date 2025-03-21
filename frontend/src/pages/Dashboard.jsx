import Button from "@components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from '@hooks/useAuth';

export default function Dashboard() {
  const { accessToken, setAccessToken } = useAuth();

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true
        }
      );
      setAccessToken(null);
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
