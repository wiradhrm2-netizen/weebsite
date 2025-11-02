// ---------- konfigurasi ----------
/*
  Nomor tujuan sesuai permintaan: 082228266317
  script ini otomatis mengonversi format lokal (0xxx...) ke format internasional (62xxx...)
*/
const rawTargetNumber = "082228266317"; // nomor yang kamu sebutkan
function toInternational(no){
  no = (no||"").trim();
  if(!no) return "";
  // jika sudah awalan + atau 62, biarkan
  if(no.startsWith("+")) return no.replace(/^\+/, "");
  if(no.startsWith("62")) return no;
  if(no.startsWith("0")) return "62" + no.slice(1);
  return no;
}
const TARGET_NUMBER = toInternational(rawTargetNumber); // => "6282228266317"

// optional small database example (scan hasil akan mengisi nama/kelas bila ada)
const dataSiswa = {
  "12345": { nama: "Budi Santoso", kelas: "8A" },
  "67890": { nama: "Siti Aminah", kelas: "9B" },
  "11223": { nama: "Rudi Hartono", kelas: "7C" }
};

// ---------- UI references ----------
const btnScan = document.getElementById("btnScan");
const btnManual = document.getElementById("btnManual");
const scanSection = document.getElementById("scanSection");
const formSection = document.getElementById("formSection");
const nisEl = document.getElementById("nis");
const namaEl = document.getElementById("nama");
const kelasEl = document.getElementById("kelas");
const statusEl = document.getElementById("status");
const ketBox = document.getElementById("keteranganBox");
const ketEl = document.getElementById("keterangan");
const kirimBtn = document.getElementById("kirimWA");

// ---------- toggle UI ----------
btnScan.onclick = () => {
  scanSection.classList.remove("hidden");
  formSection.classList.remove("hidden");
  startScanner();
};
btnManual.onclick = () => {
  scanSection.classList.add("hidden");
  formSection.classList.remove("hidden");
  stopScanner();
};

// ---------- status change show keterangan ----------
statusEl.addEventListener("change", () => {
  ketBox.classList.toggle("hidden", statusEl.value === "Hadir");
});

// ---------- QR Scanner ----------
let scannerInstance = null;
function startScanner(){
  if(scannerInstance) return; // sudah jalan
  try {
    scannerInstance = new Html5Qrcode("reader");
    Html5Qrcode.getCameras().then(cameras => {
      if(cameras && cameras.length){
        const cameraId = cameras[0].id;
        scannerInstance.start(
          cameraId,
          { fps: 10, qrbox: 250 },
          qrCodeMessage => {
            // hasil scan akan mengisi NIS; bila tersedia di dataSiswa, isi nama & kelas
            nisEl.value = qrCodeMessage;
            if(dataSiswa[qrCodeMessage]){
              namaEl.value = dataSiswa[qrCodeMessage].nama;
              kelasEl.value = dataSiswa[qrCodeMessage].kelas;
            }
          },
          errorMessage => {
            // ignore small errors
          }
        ).catch(err => {
          console.warn("Gagal start scanner:", err);
        });
      } else {
        console.warn("Tidak ada kamera tersedia.");
      }
    }).catch(err=>{
      console.warn("Gagal getCameras:", err);
    });
  } catch(e){
    console.warn("Scanner init error:", e);
  }
}
function stopScanner(){
  if(!scannerInstance) return;
  scannerInstance.stop().then(() => {
    scannerInstance.clear();
    scannerInstance = null;
  }).catch(()=>{ scannerInstance = null; });
}

// ---------- Build message and open wa.me ----------
function buildMessage(nis, nama, kelas, status, keterangan){
  return `ABSENSI SISWA
------------------------
NIS : ${nis}
Nama : ${nama}
Kelas : ${kelas}
Status : ${status}
Keterangan : ${keterangan || "-"}
------------------------`;
}

kirimBtn.addEventListener("click", () => {
  const nis = nisEl.value.trim();
  const nama = namaEl.value.trim();
  const kelas = kelasEl.value.trim();
  const status = statusEl.value;
  const ket = ketEl.value.trim();

  if(!nis || !nama || !kelas){
    alert("Mohon isi NIS, Nama, dan Kelas terlebih dahulu.");
    return;
  }

  const pesan = buildMessage(nis, nama, kelas, status, ket);
  const target = TARGET_NUMBER; // sudah konversi ke 62...
  if(!target){
    alert("Nomor tujuan belum diatur.");
    return;
  }

  const waUrl = `https://wa.me/${target}?text=${encodeURIComponent(pesan)}`;
  // buka di tab baru; pada ponsel akan buka WA app, pada desktop buka WA Web
  window.open(waUrl, "_blank");
});
