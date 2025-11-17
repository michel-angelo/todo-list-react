// Di file: src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import ToDoList from "./components/ToDoList.jsx";

function App() {
  const [listKegiatan, setListKegiatan] = useState(() => {
    const dataDisimpan = localStorage.getItem("listKegiatan");
    if (dataDisimpan) {
      return JSON.parse(dataDisimpan);
    }
    return [];
  });
  const [inputKegiatan, setInputKegiatan] = useState("");
  const [inputJam, setInputJam] = useState("");

  useEffect(() => {
    console.log("Ada Perubahan Data! Simpan di Local Storage");
    localStorage.setItem("listKegiatan", JSON.stringify(listKegiatan));
  }, [listKegiatan]);

  const handleTambahKegiatan = () => {
    if (inputKegiatan.trim() === "") return;

    const kegiatanBaru = {
      id: Date.now(),
      nama: inputKegiatan,
      jam: inputJam,
      done: false,
    };
    setListKegiatan((kegiatanLama) => [...kegiatanLama, kegiatanBaru]);
    setInputKegiatan("");
    setInputJam("");
  };

  const hapusKegiatan = (hapusIdKegiatan) => {
    setListKegiatan((kegiatanLama) =>
      kegiatanLama.filter((kegiatan) => kegiatan.id !== hapusIdKegiatan)
    );
  };

  const kegiatanSelesai = (selesaiIdKegiatan) => {
    setListKegiatan((kegiatanLama) =>
      kegiatanLama.map((kegiatan) => {
        if (kegiatan.id === selesaiIdKegiatan) {
          return { ...kegiatan, done: !kegiatan.done };
        }
        return kegiatan;
      })
    );
  };

  return (
    <>
      <h1>My To Do List</h1>
      <div className="list-input-kegiatan-container">
        <input
          type="text"
          className="input-kegiatan"
          placeholder="Mau ngapain aja?"
          value={inputKegiatan}
          onChange={(e) => setInputKegiatan(e.target.value)}
        />
        <input
          type="time"
          className="input-jam-kegiatan"
          value={inputJam}
          onChange={(e) => setInputJam(e.target.value)}
        />
        <button className="btn-tambah" onClick={handleTambahKegiatan}>
          Tambah
        </button>
      </div>

      <hr />

      <div className="list-kegiatan-container">
        {listKegiatan.map((kegiatan) => (
          <ToDoList
            key={kegiatan.id}
            kegiatan={kegiatan}
            onHapus={() => hapusKegiatan(kegiatan.id)}
            onSelesai={() => kegiatanSelesai(kegiatan.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
