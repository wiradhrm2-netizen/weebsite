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
