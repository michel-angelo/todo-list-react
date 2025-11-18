// src/pages/Pengguna.jsx
import { Link } from "react-router-dom";
import UserList from "../components/UserList";

function Pengguna() {
  return (
    <div>
      <h1>Shoutout buat para user app ini...</h1>
      <Link to="/">&larr; Balik ke Home</Link>

      <hr />

      <UserList />
    </div>
  );
}

export default Pengguna;
