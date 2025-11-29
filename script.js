let sudahAbsen = false;
const beep = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

/* Notifikasi Sukses */
function showSuccess() {
    const success = document.getElementById("successMsg");
    if (success) success.style.display = "block";
    beep.play();
}

/* Notifikasi Error */
function showNotif(msg) {
    const n = document.getElementById("notif");
    if (n) {
        n.innerText = msg;
        n.classList.add("show");
        setTimeout(() => n.classList.remove("show"), 2000);
    }
}

/* Kunci Form */
function kunciForm() {
    document.querySelectorAll("input, select, #kirimManual").forEach(el => el.disabled = true);
}

/* ===================== KIRIM WA KE GRUP (SUDAH DIGANTI) ===================== */
function kirimWAmanual(nama, no_absen, nis, status, keterangan, tanggal) {
    const pesan = `ABSENSI SISWA
Nama: ${nama}
No Absen: ${no_absen}
NIS: ${nis}
Status: ${status}
Keterangan: ${keterangan}
Tanggal: ${tanggal}`;

    const linkGrup = "https://chat.whatsapp.com/LvHTeHE2A170NRCwnHqpR1?mode=hqrt3";

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(pesan)}&phone=&link=${encodeURIComponent(linkGrup)}`;

    window.open(url, "_blank");
}
/* ========================================================================== */

/* ================= SCAN QR ================= */
const qrReader = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras => {
    if(cameras.length === 0) {
        showNotif("⚠️ Kamera tidak ditemukan");
        return;
    }

    let backCamera = cameras.find(c => c.label.toLowerCase().includes("back")) || cameras[0];

    qrReader.start(
        backCamera.id,
        { fps: 10, qrbox: 250 },
        qr => {
            if(sudahAbsen) return;

            if(!qr || qr.trim() === "") {
                showNotif("⚠️ QR kosong, silahkan scan ulang");
                return;
            }

            const parts = qr.split('|');
            if(parts.length < 3 || !parts[0].trim() || !parts[1].trim() || !parts[2].trim()) {
                showNotif("⚠️ QR tidak valid, silahkan scan ulang");
                return;
            }

            sudahAbsen = true;
            qrReader.stop();
            if(document.getElementById("scanStatus")) document.getElementById("scanStatus").innerText = "QR Terdeteksi ✅";
            showSuccess();
            kunciForm();

            // Kirim manual WA → SEKARANG MASUK GRUP
            kirimWAmanual(parts[1], parts[2], parts[0], "HADIR", "-", new Date().toLocaleDateString());

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        }
    );
});

/* ================= KIRIM MANUAL ================= */
document.getElementById("kirimManual").addEventListener("click", function(e){
    e.preventDefault();
    if(sudahAbsen) return;

    const nis = document.getElementById("manualId").value.trim();
    const nama = document.getElementById("manualNama").value.trim();
    const no_absen = document.getElementById("manualKelas").value.trim();
    const status = document.getElementById("manualStatus").value;
    const ket = document.getElementById("manualKet").value.trim();
    const tanggal = new Date().toLocaleDateString();

    if(!nis || !nama || !no_absen) {
        showNotif("⚠️ Silahkan mengisi semua form terlebih dahulu");
        return;
    }

    sudahAbsen = true;
    showSuccess();
    kunciForm();

    // Kirim manual WA → SEKARANG MASUK GRUP
    kirimWAmanual(nama, no_absen, nis, status, ket, tanggal);

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
});

/* ================= TOMBOL BACK ================= */
document.getElementById("backBtn").onclick = () => {
    location.reload();
};
