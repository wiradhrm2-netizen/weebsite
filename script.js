<script>
// ================== DATA SISWA ==================
/* ==============================
   DATA SISWA VALID
============================== */
const DATA_SISWA = [
  { nis:"01", nama:"Afgan Aditya Syahreza" },
  { nis:"02", nama:"Andin Amelian" },
  { nis:"03", nama:"Anindya Novika" },
  { nis:"04", nama:"Aryasatya Toru Mustofa" },
  { nis:"05", nama:"Asyla Nayla Diah Susanto" },
  { nis:"06", nama:"Audy Melinda Putri" },
  { nis:"07", nama:"Aurelia Zera Indri Calista" },
  { nis:"08", nama:"Avansya Syaputra Pratama" },
  { nis:"09", nama:"Dava Alreza Saputra" },
  { nis:"010", nama:"Dhiva Gina Rosita" },
  { nis:"011", nama:"Dienda Rafita Cahaya" },
  { nis:"012", nama:"Friska Aprilliana" },
  { nis:"013", nama:"Icha Ajeng Sevtiana" },
  { nis:"014", nama:"Jazila Rahma Mufidah" },
  { nis:"015", nama:"Mei Wulansari" },
  { nis:"016", nama:"Melati Putri Zahratusita" },
  { nis:"017", nama:"Moh Ardiansyah Tri" },
  { nis:"018", nama:"Moh Maulana Ridlo" },
  { nis:"019", nama:"Mutiara Citra Widiasari" },
  { nis:"020", nama:"Naufal Agastian Wiyanata" }
];

/* ==============================
   STATE & LOG
============================== */
let sudahAbsen = false;
let logAbsensi = JSON.parse(localStorage.getItem("logAbsensi") || "{}");

/* ==============================
   UTIL
============================== */
function showNotif(msg){
  alert(msg);
}

function validasiSiswa(nis, nama){
  return DATA_SISWA.find(
    s => s.nis === nis && s.nama.toLowerCase() === nama.toLowerCase()
  );
}

function simpanLog(nis){
  logAbsensi[nis] = true;
  localStorage.setItem("logAbsensi", JSON.stringify(logAbsensi));
}

/* ==============================
   FORMAT PESAN WA (SEMUA SISWA)
============================== */
function formatPesanWA(){
  let teks = "LAPORAN ABSENSI SISWA\n\n";
  DATA_SISWA.forEach((s, i) => {
    teks += `${i+1}. ${s.nama} ${logAbsensi[s.nis] ? "Sudah Absen" : "Belum Absen"}\n`;
  });
  return encodeURIComponent(teks);
}

/* ==============================
   KIRIM KE WHATSAPP
============================== */
function kirimKeWA(){
  const pesan = formatPesanWA();
  const noWA = "6285604757431";
  window.location.href = `https://wa.me/${noWA}?text=${pesan}`;
}

/* ==============================
   ABSENSI MANUAL / QR (INTI)
============================== */
function prosesAbsensi(nis, nama){
  const valid = validasiSiswa(nis, nama);

  if(!valid){
    showNotif("❌ ABSEN SALAH");
    sudahAbsen = false;
    return; // ⛔ STOP — TIDAK MASUK WA
  }

  if(logAbsensi[nis]){
    showNotif("⚠️ SUDAH ABSEN");
    return; // ⛔ STOP — TIDAK MASUK WA
  }

  // ✅ ABSEN BERHASIL
  simpanLog(nis);
  sudahAbsen = true;
  showNotif("✅ ABSENSI BERHASIL");

  // ➜ MASUK WA
  kirimKeWA();
}

/* ==============================
   CONTOH PEMANGGILAN
   (hubungkan ke tombol / QR)
============================== */
// prosesAbsensi("01", "Afgan Aditya Syahreza");

}
</script>
