//src/pages/Pomodoro.jsx
import { useState, useEffect } from "react";

function Pomodoro() {
  const [waktu, setWaktu] = useState(25 * 60);
  const [aktif, setAktif] = useState(false);
  const [istirahat, setIstirahat] = useState(false);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const mainkanAlarm = () => {
    // Mainkan Suara
    const audio = new Audio("/alarm.mp3");
    audio
      .play()
      .catch((e) =>
        console.log("Audio play failed (biasanya karena browser policy):", e)
      );

    // 2. KIRIM NOTIFIKASI SISTEM (Browser/HP)
    if (Notification.permission === "granted") {
      new Notification(
        istirahat ? "Yok Mas/Mba Balik FOKUS Lagi..." : "AKHIRNYAAAA!!!!...",
        {
          body: istirahat
            ? "kuy, kita lanjutkan Fokus Mode kita..."
            : "Istirahat dulu mba/mas..., 5 menit aja gausah lama2.",
          icon: "/vite.svg",
          vibrate: [200, 100, 200],
        }
      );
    }
  };

  useEffect(() => {
    let interval = null;
    if (aktif && waktu > 0) {
      interval = setInterval(() => {
        setWaktu((prev) => prev - 1);
      }, 1000);
    } else if (waktu === 0 && aktif) {
      setAktif(false);
      mainkanAlarm();
    }
    return () => clearInterval(interval);
  }, [aktif, waktu, istirahat]);

  const formatWaktu = (detik) => {
    const menit = Math.floor(detik / 60);
    const sisaDetik = detik % 60;
    return `${menit < 10 ? "0" + menit : menit}:${
      sisaDetik < 10 ? "0" + sisaDetik : sisaDetik
    }`;
  };

  const gantiMode = (modeIstirahat) => {
    setIstirahat(modeIstirahat);
    setAktif(false);
    setWaktu(modeIstirahat ? 5 * 60 : 25 * 60);
  };

  const themeColor = istirahat
    ? aktif
      ? "text-green-500 border-green-500"
      : "text-teal-600 border-teal-100"
    : aktif
    ? "text-orange-500 border-orange-500"
    : "text-indigo-600 border-indigo-100";

  const bgTheme = istirahat
    ? aktif
      ? "bg-green-50"
      : "bg-white"
    : aktif
    ? "bg-orange-50"
    : "bg-white";

  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
          It's Pomodoro Time <br />
          {istirahat ? "Rehat Mode" : "Fokus Mode"}
        </h1>
        <p className="text-slate-500">
          {istirahat
            ? "istirahat dulu mas/mba-nya...."
            : "yok fokus dulu mas/mba... jauhin hpnya ya..."}
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => gantiMode(false)}
          className={`px-4 py-2 rounded-full font-bold transition ${
            !istirahat
              ? "bg-indigo-600 text-white"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          Fokus (25m)
        </button>
        <button
          onClick={() => gantiMode(true)}
          className={`px-4 py-2 rounded-full font-bold transition ${
            istirahat ? "bg-teal-500 text-white" : "bg-slate-200 text-slate-600"
          }`}
        >
          Istirahat (5m)
        </button>
      </div>

      <div
        className={`p-10 rounded-3xl shadow-xl border-4 transition-all duration-500 ${themeColor} ${bgTheme}`}
      >
        {/* FIX FONT SIZE DI SINI */}
        <div className="text-6xl sm:text-7xl md:text-9xl font-mono font-bold tracking-wider mb-10 transition-all">
          {formatWaktu(waktu)}
        </div>

        <div className="flex justify-center gap-4">
          <button
            className={`px-8 py-4 rounded-xl font-bold text-xl text-white shadow-lg transform active:scale-95 transition-all hover:shadow-xl ${
              istirahat
                ? "bg-teal-500 hover:bg-teal-600"
                : aktif
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
              setWaktu(istirahat ? 5 * 60 : 25 * 60);
            }}
          >
            🔄 RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
