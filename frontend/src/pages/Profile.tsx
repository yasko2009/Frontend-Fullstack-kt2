import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuthStore } from "../store/useAuthStore";

type User = {
  id: number;
  email: string;
  name: string;
};

export default function Profile() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/profile")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setError("Не удалось загрузить профиль");
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Профиль</h1>

      {error && <p>{error}</p>}

      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>Имя: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      <button onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
}