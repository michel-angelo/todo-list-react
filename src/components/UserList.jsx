import { useState, useEffect } from "react";

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
    return <p>Sabar ya, ganteng/cantik... loading dulu nich...</p>;
  }

  return (
    <div>
      <h2>Daftar Pengguna (Dari Internet)</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
