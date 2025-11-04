const startBtn = document.getElementById('start-scan');
function log(msg){
const t = new Date().toLocaleString();
logEl.textContent = `[${t}] ${msg}
` + logEl.textContent;
}


startBtn.addEventListener('click', ()=>{
if (!html5QrCode){ html5QrCode = new Html5Qrcode("reader"); }


Html5Qrcode.getCameras().then(cameras=>{
const cam = cameras[0].id;
html5QrCode.start(cam, { fps:10, qrbox:250 }, qr=>{
resultP.textContent = 'Hasil: ' + qr;
log('QR terbaca: ' + qr);


let payload = { raw: qr };
try{ payload = JSON.parse(qr); }catch{}


fetch('/attendance', {
method:'POST', headers:{'Content-Type':'application/json'},
body: JSON.stringify({
id: payload.id || 'unknown',
name: payload.name || 'Unknown',
class: payload.class || '',
status:'hadir',
note:'scan',
timestamp:new Date().toISOString()
})
}).then(r=>r.json()).then(res=> log('Server: ' + res.message));


});
});
});


stopBtn.addEventListener('click', ()=> html5QrCode?.stop() );


const form = document.getElementById('manual-form');
const statusP = document.getElementById('form-status');
form.addEventListener('submit', e=>{
e.preventDefault();
const fd = new FormData(form);


const payload = {
id: fd.get('id'),
name: fd.get('name'),
class: fd.get('class'),
status: fd.get('status'),
note: fd.get('note') || 'manual',
timestamp: new Date().toISOString()
};


fetch('/attendance',{
method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)
}).then(r=>r.json()).then(res=>{
statusP.textContent = res.message;
log('Manual kirim: ' + JSON.stringify(payload));
form.reset();
});
});
