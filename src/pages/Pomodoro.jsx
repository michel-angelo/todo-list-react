//src/pages/Pomodoro.jsx
import { useState, useEffect } from "react";

function Pomodoro() {
  const [waktu, setWaktu] = useState(25 * 60);
  const [aktif, setAktif] = useState(false);

  const mainkanAlarm = () => {
    const audio = new Audio("/alarm.mp3");
    audio.play();
    alert("Waktu habis mba/mas... istirahat dulu gih...");
  };

  useEffect(() => {
    let interval = 0;
    if (aktif && waktu > 0) {
      interval = setInterval(() => {
        setWaktu((waktuSekarang) => waktuSekarang - 1);
      }, 1000);
    } else if (waktu === 0 && aktif) {
      setAktif(false);
      mainkanAlarm();
    }

    return () => clearInterval(interval);
  }, [aktif, waktu]);

  const formatWaktu = (detik) => {
    const menit = Math.floor(detik / 60);
    const sisaDetik = detik % 60;
    return `${menit < 10 ? "0" + menit : menit}:${
      sisaDetik < 10 ? "0" + sisaDetik : sisaDetik
    }`;
  };

  const themeColor = aktif
    ? "text-orange-500 border-orange-500"
    : "text-indigo-600 border-indigo-100";
  const bgTheme = aktif ? "bg-orange-50" : "bg-white";

  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
          It's Pomodoro Time <br />
          Mode{" "}
          <span className={aktif ? "text-orange-500" : "text-indigo-600"}>
            Fokus
          </span>
        </h1>
        <p className="text-slate-500">
          Fokus tugas anda mba/mas, matiin hpnya...
        </p>
      </div>

      <div
        className={`p-10 rounded-3xl shadow-xl border-4 transition-all duration-500 ${themeColor} ${bgTheme}`}
      >
        <div className="text-8xl md:text-9xl font-mono font-bold tracking-wider mb-10 transition-all">
          {formatWaktu(waktu)}
        </div>

        <div className="flex justify-center gap-4">
          <button
            className={`px-8 py-4 rounded-xl font-bold text-xl text-white shadow-lg transform active:scale-95 transition-all hover:shadow-xl ${
              aktif
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            onClick={() => setAktif(!aktif)}
          >
            {aktif ? "⏸ PAUSE" : "▶ MULAI"}
          </button>

          <button
            className="px-8 py-4 rounded-xl font-bold text-xl bg-slate-200 text-slate-600 hover:bg-slate-300 shadow-md transform active:scale-95 transition-all"
            onClick={() => {
              setAktif(false);
              setWaktu(25 * 60);
            }}
          >
            🔄 RESET
          </button>
        </div>
      </div>
      <div className="mt-8 text-sm text-slate-400">
        <p>Tips: 25 menit kerja, 5 menit istirahat (Metode Pomodoro)</p>
      </div>
    </div>
  );
}

export default Pomodoro;
