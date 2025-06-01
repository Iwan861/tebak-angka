import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [value, setValue] = useState("");
  const [statusText, setStatusText] = useState(""); // untuk menampilkan teks sementara
  const dialogRef = useRef(null);
  const timerIds = useRef([]); // untuk menyimpan semua timeout agar bisa dibersihkan jika perlu

  function setAngka(e) {
    const input = Number(e.target.value);
    if (input < 1 || input > 100) {
      alert("No harus diantara 1-100");
      setValue("");
    } else {
      setValue(e.target.value);
    }
  }

  function openModalWithDelay() {
    if (!value) {
      alert("Masukkan angka terlebih dahulu!");
      return;
    }

    // Buka modal langsung
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }

    // Set statusText sesuai waktu
    setStatusText("Sedang memikirkan...");

    timerIds.current.push(
      setTimeout(() => setStatusText("Menghitung..."), 3000 - 1000) // detik ke-3 (setelah 2 detik dari pertama)
    );
    timerIds.current.push(
      setTimeout(() => setStatusText("Scan memory..."), 5000 - 1000) // detik ke-5 (setelah 4 detik dari pertama)
    );
    timerIds.current.push(
      setTimeout(
        () => setStatusText(`Angka yang anda pikirkan adalah:  ${value}  🎉`),
        6000 - 1000
      ) // detik ke-6 (setelah 5 detik)
    );
  }

  function closeModal() {
    // Bersihkan semua timer saat modal ditutup
    timerIds.current.forEach(clearTimeout);
    timerIds.current = [];
    setStatusText("");
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[300px] text-center border-2 border-amber-600 rounded-2xl p-5 shadow-lg">
        <h1 className="text-xl font-semibold mb-4">Menebak Pikiran Anda</h1>
        <input
          value={value}
          type="number"
          placeholder="1-100"
          className="input input-accent w-full mb-2"
          id="number"
          min={1}
          max={100}
          onChange={setAngka}
        />
        <label htmlFor="number" className="block mb-4 text-sm">
          Pikirkan no 1-100
        </label>
        <button className="btn btn-primary w-full" onClick={openModalWithDelay}>
          Tebak
        </button>

        <dialog ref={dialogRef} className="modal">
          <div className="modal-box max-w-[350px]">
            <h3 className="font-bold text-lg">Menebak</h3>
            <p className="py-4">{statusText}</p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default App;
