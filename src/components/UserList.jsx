import { useState, useEffect } from "react";
import "./UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log("Error, Gagal mengambil data", error);
        setLoading(false);
      }
    };
    ambilData();
  }, []);

  if (loading) {
    return (
      <p className="loading-text">
        Sabar ya, ganteng/catik... lagi loading data...
      </p>
    );
  }

  return (
    <div className="user-list-container">
      <h2>Daftar Pengguna (API)</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
