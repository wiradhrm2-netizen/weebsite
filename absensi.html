<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Absensi Siswa</title>
<script src="https://unpkg.com/html5-qrcode"></script>
<link rel="stylesheet" href="style.css">
<style>
body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg,#f5f7ff,#e0ebff); display:flex; justify-content:center; padding:30px; }
.card { background:#fff; padding:30px 40px; border-radius:20px; box-shadow:0 15px 40px rgba(0,0,0,0.1); width:100%; max-width:500px; }
input, select, button { width:100%; margin:10px 0; padding:12px; border-radius:10px; border:1px solid #ccc; font-size:15px; }
button { cursor:pointer; font-weight:600; transition:0.3s; }
button#kirimManual { background:#346dff; color:#fff; }
button#kirimManual:hover { background:#1a52d1; }
.success { display:none; position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#4caf50; color:#fff; padding:15px 30px; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.2); z-index:1000; font-weight:600; text-align:center; }
.notif { position:fixed; bottom:25px; left:50%; transform:translateX(-50%) scale(0.8); background:rgba(255,80,80,0.95); color:#fff; padding:14px 22px; border-radius:14px; font-size:15px; font-weight:600; box-shadow:0 4px 15px rgba(0,0,0,0.15); opacity:0; transition:0.35s; pointer-events:none; text-align:center; }
.notif.show { opacity:1; transform:translateX(-50%) scale(1); }
</style>
</head>
<body>

<div class="card">
    <h1>Absensi Siswa</h1>

    <h2>Scan QR</h2>
    <div id="reader"></div>
    <p id="scanStatus" style="font-size:14px;color:#555">Mengaktifkan kamera...</p>

    <h2>Isi Manual</h2>
    <input id="manualId" placeholder="NIS" autocomplete="off" />
    <input id="manualNama" placeholder="Nama Lengkap" />
    <input id="manualKelas" placeholder="No Absen / Kelas" />
    <select id="manualStatus">
        <option value="Hadir">Hadir</option>
        <option value="Izin">Izin</option>
        <option value="Sakit">Sakit</option>
    </select>
    <input id="manualKet" placeholder="Keterangan (opsional)" />
    <button id="kirimManual">Kirim Absen</button>
</div>

<div id="successMsg" class="success">✅ Absensi Berhasil</div>
<div id="notif" class="notif"></div>

<script>
let sudahAbsen = false;

/* AUDIO */
const audioBenar = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
const audioSalah = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");

/* DATA SISWA VALID */
const dataSiswa = {
 "01":"Afgan Aditya Syahreza",
 "02":"Andin Amelian",
 "03":"Anindya Novika",
 "04":"Aryasatya Toru Mustofa",
 "05":"Asyla Nayla Diah Susanto",
 "06":"Audy Melinda Putri",
 "07":"Aurelia Zera Indri Calista",
 "08":"Avansya Syaputra Pratama",
 "09":"Dava Alreza Saputra",
 "010":"Dhiva Gina Rosita",
 "011":"Dienda Rafita Cahaya",
 "012":"Friska Aprilliana",
 "013":"Icha Ajeng Sevtiana",
 "014":"Jazila Rahma Mufidah",
 "015":"Mei Wulansari",
 "016":"Melati Putri Zahratusita",
 "017":"Moh Ardiansyah Tri",
 "018":"Moh Maulana Ridlo",
 "019":"Mutiara Citra Widiasari",
 "020":"Naufal Agastian Wiyanata"
};

function showSuccess(){
 document.getElementById("successMsg").style.display="block";
 setTimeout(()=>document.getElementById("successMsg").style.display="none",2000);
}

function showNotif(msg){
 const n=document.getElementById("notif");
 n.innerText=msg;
 n.classList.add("show");
 setTimeout(()=>n.classList.remove("show"),2000);
}

function kunciForm(){
 document.querySelectorAll("input,select,button").forEach(e=>e.disabled=true);
 sudahAbsen=true;
}

/* WA */
function kirimKeWA(nis,nama,no_absen,status,ket){
 const pesan = `ABSENSI SISWA
${nis}. ${nama} - SUDAH ABSEN
Status: ${status}
Keterangan: ${ket || "-"}
Tanggal: ${new Date().toLocaleDateString()}`;
 window.open("https://wa.me/6285604757431?text="+encodeURIComponent(pesan),"_blank");
}

/* QR */
const reader = new Html5Qrcode("reader");
Html5Qrcode.getCameras().then(c=>{
 if(c.length){
  reader.start(c[0].id,{fps:10,qrbox:250},qr=>{
   const p=qr.split("|");
   if(p.length>=3){
    manualId.value=p[0];
    manualNama.value=p[1];
    manualKelas.value=p[2];
   }
  });
 }
});

/* SUBMIT */
kirimManual.onclick=()=>{
 if(sudahAbsen) return;

 const nis=manualId.value.trim();
 const nama=manualNama.value.trim();
 const kelas=manualKelas.value.trim();
 const status=manualStatus.value;
 const ket=manualKet.value.trim();

 if(!dataSiswa[nis] || dataSiswa[nis]!==nama){
  audioSalah.play();
  showNotif("❌ ABSEN SALAH");
  return;
 }

 audioBenar.play();
 showSuccess();
 kunciForm();
 kirimKeWA(nis,nama,kelas,status,ket);
};
</script>
</body>
</html>
