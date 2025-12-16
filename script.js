<script>
/* ================= DATABASE SISWA (TAMBAHAN) ================= */
const dataSiswa = [
    { nis: "01", nama: "Afgan Aditya Syahreza", no_absen: "1" },
    { nis: "02", nama: "Andin Amelian", no_absen: "2" },
    { nis: "03", nama: "Anindya Novika", no_absen: "3" },
    { nis: "04", nama: "Aryasatya Toru Mustofa", no_absen: "4" },
    { nis: "05", nama: "Asyla Nayla Diah Susanto", no_absen: "5" },
    { nis: "06", nama: "Audy Melinda Putri", no_absen: "6" },
    { nis: "07", nama: "Aurelia Zera Indri Calista", no_absen: "7" },
    { nis: "08", nama: "Avansya Syaputra Pratama", no_absen: "8" },
    { nis: "09", nama: "Dava Alreza Saputra", no_absen: "9" },
    { nis: "010", nama: "Dhiva Gina Rosita", no_absen: "10" },
    { nis: "011", nama: "Dienda Rafita Cahaya", no_absen: "11" },
    { nis: "012", nama: "Friska Aprilliana", no_absen: "12" },
    { nis: "013", nama: "Icha Ajeng Sevtiana", no_absen: "13" },
    { nis: "014", nama: "Jazila Rahma Mufidah", no_absen: "14" },
    { nis: "015", nama: "Mei Wulansari", no_absen: "15" },
    { nis: "016", nama: "Melati Putri Zahratusita", no_absen: "16" },
    { nis: "017", nama: "Moh Ardiansyah Tri", no_absen: "17" },
    { nis: "018", nama: "Moh Maulana Ridlo", no_absen: "18" },
    { nis: "019", nama: "Mutiara Citra Widiasari", no_absen: "19" },
    { nis: "020", nama: "Naufal Agastian Wiyanata", no_absen: "20" }
    { nis: "021", nama: "Naura Anastasya Citra", no_absen: "21" }
    { nis: "022", nama: "Naura Aulia Nurokhim", no_absen: "22" }
    { nis: "023", nama: "Nurul Kurnia", no_absen: "23" }
    { nis: "024", nama: "Qori Illyin Miftakul Arsi", no_absen: "24" }
    { nis: "025", nama: "Renita Dwi Prihatini", no_absen: "25" }
    { nis: "026", nama: "Reva Pasca Valentina", no_absen: "26" }
    { nis: "027", nama: "Salsabila Diva Carolina", no_absen: "27" }
    { nis: "028", nama: "Septyan Dwi Cahyo Prayugo", no_absen: "28" }
    { nis: "029", nama: "Socha Juliana Putri", no_absen: "29" }
    { nis: "030", nama: "Syifa Arminia Rahayu ", no_absen: "30" }
    { nis: "031", nama: "Vanesa Ayu Nengtias ", no_absen: "31" }
    { nis: "032", nama: "Vivin Khasanah Kholidah ", no_absen: "32" }
    { nis: "033", nama: "Wira Surya Dharma Budiarta ", no_absen: "33" }
    { nis: "034", nama: "Yusuf Muchlis Nur Arifin ", no_absen: "34" }
];

/* ================= SCRIPT ASLI KAMU ================= */
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
    document.querySelectorAll("input, select, #kirimManual")
        .forEach(el => el.disabled = true);
}

/* KIRIM WA */
function kirimWAmanual(nama, no_absen, nis, status, keterangan, tanggal) {
    const pesan = `ABSENSI SISWA
Nama: ${nama}
No Absen: ${no_absen}
NIS: ${nis}
Status: ${status}
Keterangan: ${keterangan}
Tanggal: ${tanggal}`;

    const nomor = "6285604757431";
    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
}

/* ================= SCAN QR (DITAMBAH VALIDASI) ================= */
const qrReader = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras => {
    if (cameras.length === 0) {
        showNotif("⚠️ Kamera tidak ditemukan");
        return;
    }

    let backCamera = cameras.find(c =>
        c.label.toLowerCase().includes("back")
    ) || cameras[0];

    qrReader.start(
        backCamera.id,
        { fps: 10, qrbox: 250 },
        qr => {
            if (sudahAbsen) return;

            const parts = qr.split('|');
            if (parts.length < 3) {
                showNotif("⚠️ QR tidak valid");
                return;
            }

            /* === VALIDASI DATABASE (TAMBAHAN) === */
            const siswa = dataSiswa.find(
                s => s.nis === parts[0].trim() &&
                     s.nama.toLowerCase() === parts[1].trim().toLowerCase()
            );

            if (!siswa) {
                showNotif("❌ NIS atau Nama tidak terdaftar");
                beep.play();
                return;
            }
            /* =================================== */

            sudahAbsen = true;
            qrReader.stop();
            showSuccess();
            kunciForm();

            kirimWAmanual(
                siswa.nama,
                siswa.no_absen,
                siswa.nis,
                "HADIR",
                "-",
                new Date().toLocaleDateString("id-ID")
            );

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        }
    );
});

/* ================= KIRIM MANUAL (DITAMBAH VALIDASI) ================= */
document.getElementById("kirimManual").addEventListener("click", function (e) {
    e.preventDefault();
    if (sudahAbsen) return;

    const nis = manualId.value.trim();
    const nama = manualNama.value.trim();
    const no_absen = manualKelas.value.trim();
    const status = manualStatus.value;
    const ket = manualKet.value.trim();
    const tanggal = new Date().toLocaleDateString("id-ID");

    /* === VALIDASI DATABASE (TAMBAHAN) === */
    const valid = dataSiswa.find(
        s => s.nis === nis && s.nama.toLowerCase() === nama.toLowerCase()
    );

    if (!valid) {
        showNotif("❌ NIS atau Nama tidak terdaftar");
        return;
    }
    /* =================================== */

    sudahAbsen = true;
    showSuccess();
    kunciForm();

    kirimWAmanual(valid.nama, valid.no_absen, valid.nis, status, ket, tanggal);

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
});

/* ================= BACK ================= */
document.getElementById("backBtn").onclick = () => {
    location.reload();
};
</script>
