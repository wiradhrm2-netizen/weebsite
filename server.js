const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Environment variables (set these in Railway / hosting)
// WA_TOKEN: WhatsApp Cloud API access token
// PHONE_ID: Phone Number ID from WhatsApp Cloud API
// GURU: target recipient number in international format (e.g. 6282228266317)
const TOKEN = process.env.WA_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_ID;
const NOMOR_GURU = process.env.GURU || "6282228266317";

if(!TOKEN || !PHONE_NUMBER_ID){
  console.warn("WARNING: WA_TOKEN or PHONE_ID not set in environment variables.");
}

// POST /kirim-absen
app.post("/kirim-absen", async (req, res) => {
  const { nis, nama, kelas, status, keterangan } = req.body;
  const pesan = `ABSENSI SISWA
------------------------
NIS : ${nis}
Nama : ${nama}
Kelas : ${kelas}
Status : ${status}
Keterangan : ${keterangan || "-"}
------------------------
(Dikirim otomatis oleh sistem)`;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: NOMOR_GURU,
          type: "text",
          text: { body: pesan }
        })
      }
    );
    const data = await response.json();
    console.log("WA response:", data);
    if (data.messages) return res.json({ success: true });
    return res.json({ success: false, message: "WA API error", data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error", error: err.toString() });
  }
});

app.get("/test", async (req, res) => {
  const pesan = "TEST: pesan dari server";
  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: NOMOR_GURU,
        type: "text",
        text: { body: pesan }
      })
    });
    const data = await response.json();
    console.log("TEST response:", data);
    if (data.messages) return res.send("✅ Test sukses");
    return res.send("❌ Test gagal: " + JSON.stringify(data));
  } catch (err) {
    console.error(err);
    return res.send("❌ Error: " + err.toString());
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server ready on port " + PORT));
