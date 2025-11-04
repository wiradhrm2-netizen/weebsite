// ===============================
//      QR CODE SCAN FIXED
// ===============================
let scanner = new Instascan.Scanner({
    video: document.getElementById("preview"),
    scanPeriod: 3,
    mirror: false
});

// Ketika berhasil scan
scanner.addListener("scan", function (content) {
    document.getElementById("scanResult").innerText = "Hasil Scan: " + content;
    addLog("Scan: " + content);
});

// Tombol START
document.getElementById("startScan").onclick = async () => {
    try {
        let cameras = await Instascan.Camera.getCameras();

        if (cameras.length === 0) {
            alert("Tidak ada kamera terdeteksi!");
            return;
        }

        // Cari kamera belakang (HP)
        let kameraBelakang = cameras.find(cam =>
            cam.name.toLowerCase().includes("back")
        ) || cameras[0];

        scanner.start(kameraBelakang);

    } catch (err) {
        alert("Kamera gagal dinyalakan.\nPastikan:\n- Izin kamera aktif\n- Buka lewat HTTPS / Live Server.");
        console.error(err);
    }
};

// Tombol STOP
document.getElementById("stopScan").onclick = () => {
    scanner.stop();
};

// ===============================
//        ISI MANUAL
// ===============================
document.getElementById("kirimManual").onclick = () => {

    let data = {
        nis: document.getElementById("manualId").value,
        nama: document.getElementById("manualNama").value,
        kelas: document.getElementById("manualKelas").value,
        status: document.getElementById("manualStatus").value,
        ket: document.getElementById("manualKet").value
    };

    addLog("Manual Input: " + JSON.stringify(data));

    // Jika kamu pakai server:
    fetch("/absen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "manual", data })
    }).catch(err => console.log("Server tidak aktif", err));
};

// ===============================
//          LOG SYSTEM
// ===============================
function addLog(msg) {
    document.getElementById("log").innerText += msg + "\n";
}
