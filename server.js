const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));


const FILE = path.join(__dirname, 'attendance.xlsx');


function ensureWorkbook(){
if(!fs.existsSync(FILE)){
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet([]);
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
XLSX.writeFile(wb, FILE);
}
}


function appendRow(row){
ensureWorkbook();
const wb = XLSX.readFile(FILE);
const ws = wb.Sheets['Sheet1'];
const data = XLSX.utils.sheet_to_json(ws, {defval:''});
data.push(row);
const newWs = XLSX.utils.json_to_sheet(data);
wb.Sheets['Sheet1'] = newWs;
XLSX.writeFile(wb, FILE);
}


app.post('/attendance', (req,res)=>{
const b = req.body;
const row = {
Timestamp: b.timestamp,
ID: b.id,
Name: b.name,
Class: b.class,
Status: b.status, // hadir, izin, sakit
Note: b.note
};


appendRow(row);
res.json({success:true, message:'Tersimpan ke Excel'});
});


app.listen(3000, ()=> console.log('Server berjalan http://localhost:3000'));
