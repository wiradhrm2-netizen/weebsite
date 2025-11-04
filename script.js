let sudahAbsen = false;
const beep = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

function showSuccess() {
    const success = document.getElementById("successMsg");
    success.style.display = "block";
    beep.play();
}

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

/* === BACK === */
document.getElementById("backBtn").onclick = () => {
    location.reload();
};
