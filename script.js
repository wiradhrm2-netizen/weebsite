let sudahAbsen = false;
const beep = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

/* === NOTIFIKASI SUKSES === */
function showSuccess() {
    const success = document.getElementById("successMsg");
    success.style.display = "block";
    beep.play();

    // Setelah 2 detik, sembunyikan notifikasi & kembali ke section home
    setTimeout(() => {
        success.style.display = "none";

        // Aktifkan section home (single-page)
        document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
        document.getElementById("home").classList.add("active");
    }, 2000);
}

/* === KUNCI FORM === */
function kunciForm() {
    document.querySelectorAll("input, select, #kirimManual")
        .forEach(el => el.disabled = true);
}

/* === SCAN QR === */
const qrReader = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras => {
    if (cameras.length > 0) {
        qrReader.start(
            cameras[0].id,
            { fps: 10, qrbox: 250 },
            qr => {
                if (sudahAbsen) return;
                sudahAbsen = true;

                qrReader.stop();

                document.getElementById("scanStatus").innerText = "QR Terdeteksi ✅";
                showSuccess();
                kunciForm();
            }
        );
    }
});

/* === KIRIM MANUAL === */
document.getElementById("kirimManual").onclick = () => {
    if (sudahAbsen) return;

    sudahAbsen = true;
    showSuccess();
    kunciForm();
};

/* === BACK BUTTON === */
document.getElementById("backBtn").onclick = () => {
    // Jika tombol back ingin reload atau kembali ke Beranda
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById("home").classList.add("active");
};
