<script>
// ================== DATA SISWA ==================
const daftarSiswa = [
 {no:1,nama:"Afgan Aditya Syahreza",absen:false},
 {no:2,nama:"Andin Amelian",absen:false},
 {no:3,nama:"Anindya Novika",absen:false},
 {no:4,nama:"Aryasatya Toru Mustofa",absen:false},
 {no:5,nama:"Asyla Nayla Diah Susanto",absen:false},
 {no:6,nama:"Audy Melinda Putri",absen:false},
 {no:7,nama:"Aurelia Zera Indri Calista",absen:false},
 {no:8,nama:"Avansya Syaputra Pratama",absen:false},
 {no:9,nama:"Dava Alreza Saputra",absen:false},
 {no:10,nama:"Dhiva Gina Rosita",absen:false},
 {no:11,nama:"Dienda Rafita Cahaya",absen:false},
 {no:12,nama:"Friska Aprilliana",absen:false},
 {no:13,nama:"Icha Ajeng Sevtiana",absen:false},
 {no:14,nama:"Jazila Rahma Mufidah",absen:false},
 {no:15,nama:"Mei Wulansari",absen:false},
 {no:16,nama:"Melati Putri Zahratusita",absen:false},
 {no:17,nama:"Moh Ardiansyah Tri",absen:false},
 {no:18,nama:"Moh Maulana Ridlo",absen:false},
 {no:19,nama:"Mutiara Citra Widiasari",absen:false},
 {no:20,nama:"Naufal Agastian Wiyanata",absen:false}
];

// ================== LOG ABSENSI ==================
function renderLogAbsensi(){
    const tbody=document.querySelector("#tabelAbsensi tbody");
    if(!tbody) return;
    tbody.innerHTML="";
    daftarSiswa.forEach(s=>{
        tbody.innerHTML+=`
        <tr>
            <td>-</td>
            <td>${s.no}</td>
            <td>${s.nama}</td>
            <td>-</td>
            <td>${s.absen?"HADIR":"-"}</td>
            <td>${s.absen?"Sudah Absen":"-"}</td>
        </tr>`;
    });
}
renderLogAbsensi();

// ================== NOTIFIKASI ==================
function showNotif(msg){
    const n=document.getElementById("notif");
    if(!n) return;
    n.innerText=msg;
    setTimeout(()=>n.innerText="",2000);
}

function showSuccess(){
    const s=document.getElementById("successMsg");
    if(s) s.style.display="block";
}

// ================== QR SCAN ==================
let sudahAbsen=false;
const qrReader=new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras=>{
    if(!cameras.length){
        showNotif("Kamera tidak ditemukan");
        return;
    }

    qrReader.start(
        cameras[0].id,
        {fps:10,qrbox:250},
        qr=>{
            if(sudahAbsen) return;

            const data=qr.split("|");
            if(data.length<3){
                showNotif("Absensi salah");
                return;
            }

            const no=parseInt(data[2]);
            const siswa=daftarSiswa.find(s=>s.no===no);

            if(!siswa){
                showNotif("Absensi salah");
                return;
            }

            if(siswa.absen){
                showNotif("Sudah absen");
                return;
            }

            siswa.absen=true;
            sudahAbsen=true;

            showSuccess();
            renderLogAbsensi();
        }
    );
});

// ================== KIRIM WA (REKAP) ==================
function kirimWAmanual(){
    let pesan="DAFTAR ABSENSI SISWA\n\n";
    daftarSiswa.forEach(s=>{
        pesan+=`${s.no}. ${s.nama}`;
        if(s.absen) pesan+=" - Sudah Absen";
        pesan+="\n";
    });

    window.open(
        "https://wa.me/6285604757431?text="+encodeURIComponent(pesan),
        "_blank"
    );
}

// ================== TOMBOL WA ==================
const btnWA=document.getElementById("kirimWAQR");
if(btnWA){
    btnWA.addEventListener("click",()=>{
        kirimWAmanual();
    });
}
</script>
