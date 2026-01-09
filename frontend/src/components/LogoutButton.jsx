import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove JWT
    localStorage.removeItem("token");

    // redirect to login
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
