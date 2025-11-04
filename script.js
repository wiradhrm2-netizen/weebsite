let sudahAbsen = false;
const beep = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

/* ===== Notifikasi Sukses ===== */
function showSuccess() {
    const success = document.getElementById("successMsg");
    success.style.display = "block";
    beep.play();
}

/* ===== Notifikasi Error ===== */
function showNotif(msg) {
    const n = document.getElementById("notif");
    n.innerText = msg;
    n.classList.add("show");
    setTimeout(() => n.classList.remove("show"), 2000);
}

/* ===== Kunci Form ===== */
function kunciForm() {
    document.querySelectorAll("input, select, #kirimManual").forEach(el => el.disabled = true);
}

/* === SCAN QR DENGAN KAMERA BELAKANG + VALIDASI === */
const qrReader = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras => {
    if (cameras.length > 0) {
        // Pilih kamera belakang jika tersedia
        let backCamera = cameras.find(cam => cam.label.toLowerCase().includes("back") || cam.label.toLowerCase().includes("environment")) || cameras[0];

        qrReader.start(
            backCamera.id,
            { fps: 10, qrbox: 250 },
            qr => {
                if (sudahAbsen) return;

                // Validasi QR kosong
                if (!qr || qr.trim() === "") {
                    showNotif("⚠️ QR kosong, silahkan scan ulang");
                    return;
                }

                // Validasi format QR minimal 3 bagian: NIS|Nama|Kelas
                const parts = qr.split('|');
                if (parts.length < 3 || !parts[0].trim() || !parts[1].trim() || !parts[2].trim()) {
                    showNotif("⚠️ QR tidak valid, silahkan scan ulang");
                    return;
                }

                // Tetap kode asli
                sudahAbsen = true;
                qrReader.stop();
                document.getElementById("scanStatus").innerText = "QR Terdeteksi ✅";
                showSuccess();
                kunciForm();

                // Tambahan: redirect otomatis
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 500);
            }
        );
    }
});

/* === KIRIM MANUAL === */
document.getElementById("kirimManual").onclick = () => {
    if (sudahAbsen) return;

    const nis = document.getElementById("manualId").value.trim();
    const nama = document.getElementById("manualNama").value.trim();
    const kelas = document.getElementById("manualKelas").value.trim();
    const status = document.getElementById("manualStatus").value;
    const ket = document.getElementById("manualKet").value.trim();
    const tanggal = new Date().toLocaleDateString();

    // Validasi form wajib diisi
    if (!nis || !nama || !kelas) {
        showNotif("⚠️ Silahkan mengisi semua form terlebih dahulu");
        return;
    }

    // Tetap kode asli
    sudahAbsen = true;
    showSuccess();
    kunciForm();

    // Tambahan: redirect otomatis
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
};

/* === BACK === */
document.getElementById("backBtn").onclick = () => {
    location.reload();
};
