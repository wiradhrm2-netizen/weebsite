// ====================================
// AUTO NYALAKAN KAMERA QR
// ====================================
let scanner = new Instascan.Scanner({
    video: document.getElementById("preview"),
    scanPeriod: 3,
    mirror: false
});

window.onload = async () => {
    try {
        let cameras = await Instascan.Camera.getCameras();

        if (cameras.length === 0) {
            alert("Tidak ada kamera ditemukan!");
            return;
        }

        let kameraBelakang =
            cameras.find((cam) => cam.name.toLowerCase().includes("back")) ||
            cameras[0];

        scanner.start(kameraBelakang);
    } catch (err) {
        alert(
            "Kamera gagal dinyalakan.\nPastikan izin kamera aktif & website HTTPS."
        );
        console.error(err);
    }
};

// Scan QR berhasil
scanner.addListener("scan", function (content) {
    document.getElementById("scanResult").innerText =
        "Hasil Scan: " + content;

    addLog("Scan QR: " + content);

    showSuccess(); // ✅ animasi + suara beep
});

// Tombol stop
document.getElementById("stopScan").onclick = () => {
    scanner.stop();
};

// Tombol Back
document.getElementById("backBtn").onclick = () => {
    window.history.back();
};

// ====================================
// ISI MANUAL
// ====================================
document.getElementById("kirimManual").onclick = () => {
    let data = {
        nis: document.getElementById("manualId").value,
        nama: document.getElementById("manualNama").value,
        kelas: document.getElementById("manualKelas").value,
        status: document.getElementById("manualStatus").value,
        ket: document.getElementById("manualKet").value
    };

    addLog("Manual: " + JSON.stringify(data));

    showSuccess(); // ✅ animasi + suara beep
};

// ====================================
// SHOW SUCCESS + ANIMASI + SUARA
// ====================================
function playBeep() {
    let audio = document.getElementById("beepSound");
    audio.currentTime = 0;
    audio.play();
}

function showSuccess() {
    playBeep();

    let el = document.getElementById("successMessage");
    el.innerText = "✅ Absen Berhasil";

    el.style.display = "block";
    el.style.animation = "successPop 0.4s ease-out";

    setTimeout(() => {
        el.style.animation = "successFadeOut 0.4s forwards";
    }, 1800);

    setTimeout(() => {
        el.style.display = "none";
        el.style.animation = "";
    }, 2200);
}

// ====================================
// LOG ABSENSI SISWA
// ====================================
function addLog(msg) {
    document.getElementById("log").innerText += msg + "\n";
}
