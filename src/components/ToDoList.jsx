// IMPORT
import "./ToDoList.css";

function ToDoList({ kegiatan, onHapus, onSelesai }) {
  const classNameKegiatan = `todo-item ${kegiatan.done ? "selesai" : ""}`;

  return (
    <div className={classNameKegiatan}>
      <div className="info-kegiatan">
        <h3>{kegiatan.nama}</h3>
        <p>{kegiatan.jam}</p>
      </div>

      <div className="tombol-grup">
        <button className="btn-selesai" onClick={onSelesai}>
          ✔
        </button>
        <button className="btn-hapus" onClick={onHapus}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default ToDoList;
// EXPORT
