let sudahAbsen = false;
const beep = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

/* =========================================================
   ============ FUNGSI KIRIM WHATSAPP ======================
   ========================================================= */
function kirimWA(pesan) {
    const nomor = "081233310308".replace(/^0/, "62"); 
    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank"); // WA pasti terbuka
}

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

/* =========================================================
   ================= SCAN QR KAMERA BELAKANG ===============
   ========================================================= */

const qrReader = new Html5Qrcode("reader");

Html5Qrcode.getCameras()
    .then(cameras => {
        if (cameras.length === 0) {
            showNotif("⚠️ Kamera tidak ditemukan");
            return;
        }

        let backCamera =
            cameras.find(c => c.label.toLowerCase().includes("back")) ||
            cameras.find(c => c.label.toLowerCase().includes("environment")) ||
            cameras[0];

        qrReader.start(
            backCamera.id,
            { fps: 10, qrbox: 250 },
            qr => {
                if (sudahAbsen) return;

                if (!qr || qr.trim() === "") {
                    showNotif("⚠️ QR kosong, silahkan scan ulang");
                    return;
                }

                const parts = qr.split('|');
                if (parts.length < 3 || !parts[0].trim() || !parts[1].trim() || !parts[2].trim()) {
                    showNotif("⚠️ QR tidak valid, silahkan scan ulang");
                    return;
                }

                sudahAbsen = true;
                qrReader.stop();
                document.getElementById("scanStatus").innerText = "QR Terdeteksi ✅";
                showSuccess();
                kunciForm();

                /* ===== KIRIM WHATSAPP ===== */
                const pesanQR = `ABSENSI QR
NIS: ${parts[0]}
Nama: ${parts[1]}
Kelas: ${parts[2]}
Status: HADIR
Tanggal: ${new Date().toLocaleString()}`;

                kirimWA(pesanQR);

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500); // Dibuat lebih lama agar WA sempat terbuka
            },
            () => {} 
        );
    })
    .catch(() => {
        showNotif("⚠️ Gagal mengakses kamera");
    });

/* =========================================================
   ================== KIRIM MANUAL =========================
   ========================================================= */

document.getElementById("kirimManual").addEventListener("click", function (e) {
    e.preventDefault(); // FORM TIDAK AKAN RELOAD

    if (sudahAbsen) return;

    const nis = document.getElementById("manualId").value.trim();
    const nama = document.getElementById("manualNama").value.trim();
    const kelas = document.getElementById("manualKelas").value.trim();
    const status = document.getElementById("manualStatus").value;
    const ket = document.getElementById("manualKet").value.trim();
    const tanggal = new Date().toLocaleString();

    if (!nis || !nama || !kelas) {
        showNotif("⚠️ Silahkan mengisi semua form terlebih dahulu");
        return;
    }

    sudahAbsen = true;
    showSuccess();
    kunciForm();

    /* ===== KIRIM WA ===== */
    const pesanManual =
`ABSENSI MANUAL
NIS: ${nis}
Nama: ${nama}
Kelas: ${kelas}
Status: ${status}
Keterangan: ${ket}
Tanggal: ${tanggal}`;

    kirimWA(pesanManual);

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500); // WA pasti sempat terbuka
});

/* =========================================================
   ====================== TOMBOL BACK ======================
   ========================================================= */

document.getElementById("backBtn").onclick = () => {
    location.reload();
};
