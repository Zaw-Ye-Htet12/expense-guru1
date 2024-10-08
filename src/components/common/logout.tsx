import { ExitIcon } from "@radix-ui/react-icons";
import { useLogout } from "@/hooks/useLogout";

const Logout = () => {
    const { logout } = useLogout();
    const handleLogout = async () => {
      await logout();
    };
    return (
      <div
        className="flex items-center text-red-700 cursor-pointer hover:bg-secondary rounded-sm font-medium"
        onClick={handleLogout}
      >
        <span>Logout</span>
        <div>
          <ExitIcon width={30} />
        </div>
      </div>
    );
  };
  
  export default Logout;