// === QR CODE SCAN ===
let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

scanner.addListener('scan', function (content) {
    document.getElementById('scanResult').innerText = "Hasil Scan: " + content;
    addLog("Scan: " + content);

    // Kirim ke server
    fetch("/absen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "scan", data: content })
    });
});

// Mulai kamera
document.getElementById("startScan").onclick = async () => {
    try {
        let cameras = await Instascan.Camera.getCameras();
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            alert("Kamera tidak ditemukan!");
        }
    } catch (err) {
        alert("Izin kamera diblokir! Gunakan HTTPS atau izinkan kamera.");
    }
};

// Stop kamera
document.getElementById("stopScan").onclick = () => {
    scanner.stop();
};

// === ISI MANUAL ===
document.getElementById("kirimManual").onclick = () => {
    let data = {
        nis: document.getElementById("manualId").value,
        nama: document.getElementById("manualNama").value,
        kelas: document.getElementById("manualKelas").value,
        status: document.getElementById("manualStatus").value,
        ket: document.getElementById("manualKet").value
    };

    addLog("Manual Input: " + JSON.stringify(data));

    fetch("/absen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "manual", data })
    });
};

// === LOG SYSTEM ===
function addLog(msg) {
    document.getElementById("log").innerText += msg + "\n";
}
