// src/pages/Home.jsx
import { useState, useEffect } from "react";
import ToDoList from "../components/ToDoList.jsx";

function Home() {
  const [listKegiatan, setListKegiatan] = useState(() => {
    const dataDisimpan = localStorage.getItem("listKegiatan");
    return dataDisimpan ? JSON.parse(dataDisimpan) : [];
  });
  const [inputKegiatan, setInputKegiatan] = useState("");
  const [inputJam, setInputJam] = useState("");
  const [inputTanggal, setInputTanggal] = useState("");

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
      tanggal: inputTanggal,
      done: false,
    };
    setListKegiatan((kegiatanLama) => [...kegiatanLama, kegiatanBaru]);
    setInputKegiatan("");
    setInputJam("");
    setInputTanggal("");
  };

  const hapusKegiatan = (hapusIdKegiatan) => {
    setListKegiatan((kegiatanLama) =>
      kegiatanLama.filter((kegiatan) => kegiatan.id !== hapusIdKegiatan)
    );
  };

  const kegiatanSelesai = (selesaiIdKegiatan) => {
    setListKegiatan((kegiatanLama) =>
      kegiatanLama.map((kegiatan) =>
        kegiatan.id === selesaiIdKegiatan
          ? { ...kegiatan, done: !kegiatan.done }
          : kegiatan
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-center text-slate-800 mb-2">
          My To Do List <span className="text-indigo-600">Terganteng</span>
        </h1>
        <p className="text-slate-500">Catet tugas biar gak lupa, mba/mas...</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-8 transform transition-all hover:shadow-xl">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
              Kegiatan
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-3 transition outline-none"
              placeholder="Mau ngapain ajasih..."
              value={inputKegiatan}
              onChange={(e) => setInputKegiatan(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
                Tanggal
              </label>
              <input
                type="date"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-3 transition outline-none"
                value={inputTanggal}
                onChange={(e) => setInputTanggal(e.target.value)}
              />
            </div>

            <div className="md:w-1/3">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
                Jam
              </label>
              <input
                type="time"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-3 transition outline-none"
                value={inputJam}
                onChange={(e) => setInputJam(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200"
          onClick={handleTambahKegiatan}
        >
          Tambah Kegiatan
        </button>
      </div>

      <div className="space-y-3">
        {listKegiatan.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-white/50 rounded-xl border-dashed border-2 border-slate-200">
            <p>Masih kosong nih... Nganggur kah?...</p>
          </div>
        ) : (
          listKegiatan.map((kegiatan) => (
            <ToDoList
              key={kegiatan.id}
              kegiatan={kegiatan}
              onHapus={() => hapusKegiatan(kegiatan.id)}
              onSelesai={() => kegiatanSelesai(kegiatan.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
