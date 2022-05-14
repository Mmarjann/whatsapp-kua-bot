const { makeWALegacySocket, useSingleFileLegacyAuthState, DisconnectReason } = require("@adiwajshing/baileys");
const { Boom } = require("@hapi/boom");

const {state, saveState} = useSingleFileLegacyAuthState("./sesi.json");

function startBot(){
	const sock = makeWALegacySocket({
		printQRInTerminal: true,
		auth: state
	});
	
	sock.ev.on('connection.update', (update) => {
		console.log(update);
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                startBot();
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    });
	
	sock.ev.on("creds.update", saveState);
	
	sock.ev.on("messages.upsert", ({messages, type}) => {
		console.log(messages);
		const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Razan Aqila\n' // full name
            + 'ORG:Razan Dev;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=6285736800927:+62 857 3680 0927\n' // WhatsApp ID + phone number
            + 'END:VCARD'
		const pesan = messages[0].message.conversation;
		const responseButton = messages[0].message.buttonsResponseMessage;
		const responseList = messages[0].message.listResponseMessage;
		const noHp = messages[0].key.remoteJid;
		
		if(!messages[0].key.fromMe&&pesan == "ping"){
			sock.sendMessage(noHp, { 
				text: "pong" 
			});
		}
		if(!messages[0].key.fromMe&&pesan == "p"){
			sock.sendMessage(noHp, { 
				text: `Halo, Ini Adalah Bot Layanan KUA Kec. Kanigoro, Untuk Mengetahui Jenis Layanan Silahkan Ketik *INFO*.`
			});
		}
		if(!messages[0].key.fromMe&&pesan == "Assalamualaikum"){
			sock.sendMessage(noHp, { 
				text: `Waalaikumsallam, Ini Adalah Bot Layanan KUA Kec. Kanigoro, Untuk Mengetahui Jenis Layanan Silahkan Ketik *INFO*.`
			});
		}
		if(!messages[0].key.fromMe&&pesan == "assalamualaikum"){
			sock.sendMessage(noHp, { 
				text: `Waalaikumsallam, Ini Adalah Bot Layanan KUA Kec. Kanigoro, Untuk Mengetahui Jenis Layanan Silahkan Ketik *INFO*.`
			});
		}
		if(!messages[0].key.fromMe&&pesan == "halo"){
			sock.sendMessage(noHp, { 
				text: "Haloo, Ini Adalah Bot Layanan KUA Kec. Kanigoro, Untuk Mengetahui Jenis Layanan Silahkan Ketik *INFO*." 
			});
		}
		if(!messages[0].key.fromMe&&pesan == "INFO"){
			const buttons = [{
				buttonId: '1',
				buttonText: {
					displayText: '👤Developer'
				},
				type: 1
			}, {
				buttonId: '0',
				buttonText: {
					displayText: '🤖Info Bot'
				},
				type: 1
			}];
			sock.sendMessage(noHp, { 
				image: {
					url: "./img/banner.jpg"
				},
				caption: `Selamat Datang di Informasi Layanan KUA Kec Kanigoro. 
Untuk informasi jenis layanan, silahkan ketik :

- *NIKAH* Untuk Informasi Syarat Pernikahan
- *PNIKAH* Untuk Prosedur Pernikahan
- *RUJUK* Untuk Informasi Syarat Rujuk
- *REKOM* Untuk Informasi Syarat Rekomendasi/Numpang Nikah
- *DUPLIKAT* Untuk Informasi Pembuatan Duplikat
- *LEGALISIR* Untuk Informasi Syarat Legalisir 
- *HAJI* Untuk Informasi Syarat Pendaftaran Haji
- *WAKAF* Untuk Informasi Syarat Wakaf
- *MUALAF* Untuk Informasi Syarat Pensyahadatan
- *PENGEMBALIAN* Untuk Informasi Pengembalian Biaya Nikah

Untuk Contoh Form Blangko silahkan Ketik *FORM*`,
				buttons,
				footer: 'Bot Layanan KUA Kec. Kanigoro',
				headerType: 1,
			});
		}
		if (!messages[0].key.fromMe&&pesan == "NIKAH") {
			sock.sendMessage(noHp, {
				text: `Informasi Syarat Pernikahan Sebagai Berikut :

1. Surat pengantar dari Kelurahan/Desa 
2. Foto copy Kartu Tanda Penduduk (KTP)
3. Foto copy Kartu Keluarga (KK)
4. Minta Surat Keterangan untuk Nikah (N1, N2, N4) dari Kelurahan/Desa setempat
5. Pass foto ukuran (2 x 3) sebanyak 4 lembar
6. Jika calon Suami bukan dari wilayah Kec. Kanigoro, harus ada Surat Numpang Nikah dari KUA setempat.
7. Jika calon Istri bukan dari wilayah Kec. Kanigoro harus ada Surat Rekomendasi dari KUA setempat.
8. Jika calon Suami/Istri berstatus Duda/Janda hidup, harus ada Akta Cerai dari Pengadilan Agama
9. Jika calon Suami/Istri berstatus Duda/Janda mati, harus ada Surat Kematian (N6) dari Kelurahan
10. Bagi anggota POLRI / TNI harus ada Surat Izin Kawin dari Komandan/kesatuan
11. Foto copy buku nikah orang tua bagi anak perempuan pertama
12. Ijin Kedubes jika pernikahan campuran`,
				footer: "Bot Layanan KUA",
				headerType: 1
			})
		}
		if (!messages[0].key.fromMe&&pesan == "PNIKAH") {
			sock.sendMessage(noHp, {
				text: `Prosedur Nikah: 

1. Surat pengantar dari Kelurahan/Desa 
2. Foto copy Kartu Tanda Penduduk (KTP)
3. Foto copy Kartu Keluarga (KK)
4. Pemeriksaan Berkas Nikah Oleh Petugas KUA
5. Dianjurkan Mengikuti Bimbingan Perkawinan (BINWIN)
6. Biaya Rp.0 Nikah Di KUA, Warga Miskin, Terdampak Bencana Alam
   Biaya Rp.600.000,- Diluar KUA/Diluar jam kerja, WNA`
			})
		}
		if (!messages[0].key.fromMe&&pesan == "RUJUK") {
			sock.sendMessage(noHp, {
				text: `Syarat Untuk Rujuk Sebagai Berikut :
				
1. Model R1
2. Surat pengantar dari kantor kelurahan setempat
3. Akta Cerai/penetapan Talak dari Pengadilan Agama yang masih dalam masa iddah`
			})
		}
		if (!messages[0].key.fromMe&&pesan == "REKOM") {
			sock.sendMessage(noHp, {
				text: `Informasi Syarat Rekomendasi/Numpang Nikah Sebagai Berikut :
				
1. Surat pengantar dari Kelurahan/Desa 
2. Foto copy Kartu Tanda Penduduk (KTP)
3. Foto copy Kartu Keluarga (KK)
4. Minta Surat Keterangan untuk Nikah (N1, N2, N4) dari Kelurahan/Desa setempat
5. Pass foto ukuran (2 x 3) sebanyak 4 lembar
6. Jika calon Suami/Istri berstatus Duda/Janda hidup, harus ada Akta Cerai dari Pengadilan Agama
7. Jika calon Suami/Istri berstatus Duda/Janda mati, harus ada Surat Kematian (N6) dari Kelurahan
8. Bagi anggota POLRI / TNI harus ada Surat Izin Kawin dari Komandan/Kesatuan`
			})
		}
		if (!messages[0].key.fromMe&&pesan == "DUPLIKAT") {
			sock.sendMessage(noHp, {
				text: `Informasi Pembuatan Duplikat Sebagai Berikut :
				
1. Mengisi permohonan duplikat
2. Surat pengantar dari kantor Kelurahan/Desa
3. Surat kehilangan dari Polsek,
4. Bukti Surat Nikah, jika rusak
5. Materai 6000
6. Foto ukuran 2x3 masing-masing (2 lembar)`
			})
		}
		if (!messages[0].key.fromMe&&pesan == "LEGALISIR") {
			sock.sendMessage(noHp, {
				text: `Informasi Syarat Legalisir Sebagai Berikut :
				
1. Foto copy Buku Kutipan Akta Nikah
2. Membawa Buku Kutipan Akta Nikah yang asli`
			})
		}
		if (!messages[0].key.fromMe&&pesan == "HAJI") {
			sock.sendMessage(noHp, {
				text: `Informasi Syarat Pendaftaran Haji Sebagai Berikut :
				
1.Fotokopi rekening tabungan haji
2. Fotokopi KTP ukuran
3. Fotokopi Kartu Keluarga
4. Fotokopi akta atau buku nikah/akta lahir/ijazah
5. Fotokopi surat kesehatan ukuran 100% yang mencantumkan tinggi badan, berat badan, dan golongan darah
6. Foto ukuran 3x4 (20 lembar), ukuran 4x6 (5 lembar). Foto harus 80% wajah dengan latar belakang putih.
7. Map (merek map ditentukan oleh pihak bank) untuk menyimpan berbagai berkas yang telah diminta)
8. Lembar validasi dari bank asli 
9. Surat pernyataan bank (materai) asli 
10. Surat kuasa dari bank (materai) asli 
11. Slip setoran awal bank Rp25 juta asli `
			})
		}
		if (!messages[0].key.fromMe&&pesan == "WAKAF") {
			sock.sendMessage(noHp, {
				text: `Informasi Syarat Wakaf Sebagai Berikut :
				
1. Mengisi formulir wakaf yang disediakan
2. Foto copy KTP Wakif yang legalisir
3. Foto copy KTP Nadzir yang dilegalisir
4. SPPT
5. Sertipikat (Jika sudah)
6. SK Pengesahan Nadzir
7. Surat Keterangan C Desa, Persil dan Kelas tanah
8. Surat Pengantar Wakaf dari Desa/Kelurahan
9. Surat Keterangan Tidak Dalam Sengketa dari Desa/Kelurahan
10. Keterangan Batas-batas tanah
11. Gambaran denah lokasi
12. Materai 6000`
			})
		}
		if (!messages[0].key.fromMe&&pesan == "MUALAF") {
			sock.sendMessage(noHp, {
				text: `Informasi Syarat Pensyahadatan / Mualaf Sebagai Berikut :

1. Pernyataan Masuk Islam ber materai
2. Foto copy KTP yang masih berlaku
3. Foto ukuran 3×4 
4. Saksi beragama Islam 2 Orang`
			})
		}
		if (!messages[0].key.fromMe&&pesan == "PENGEMBALIAN") {
			sock.sendMessage(noHp, {
				text: `Informasi Pengembalian Biaya Nikah Sebagai Berikut :
				
1. Surat permohonan
2. Foto copy KTP kedua mempelai
3. Fotocopy model N2 yang dilegalisir Kepala KUA
4. Foto copy Rekening Tabungan pemohon (Rekening Aktif)
5. Bukti Transfer atau Bukti Penerimaan Negara yang dilegalisir Kepala KUA
6. Nomor kontak Pemohon
7. Materai 6000
8. Foto copy NPWP (jika ada)`
			})
		}
		if (!messages[0].key.fromMe&&pesan == "FORM") {
			sock.sendMessage(noHp, {
				text: `1. Untuk Contoh Blangko Nikah silahkan ketik *FNIKAH*
2. Untuk Contoh Blangko Permohonan Duplikat silahkan ketik *FDUPLIKAT*
3. Untuk Contoh Blangko Surat Keterangan Belum Nikah silahkan ketik *FBELUMNIKAH*
4. Untuk Contoh Blangko Pengembalian Biaya Nikah silahkan ketik *FPENGEMBALIAN*
5. Untuk Contoh Blangko Wali silahkan ketik *FWALI*
6. Untuk Contoh Blangko Sumpah Jejaka silahkan ketik *FJEJAKA*
7. Untuk Contoh Blangko Wakaf silahkan ketik *FWAKAF*
8. Untuk Contoh Blangko Taukil Wali silahkan ketik *FTWALI*`
			})
		}
		if (!messages[0].key.fromMe&&pesan == "FNIKAH") {
			sock.sendMessage(noHp, {
				text: 'https://bit.ly/FNIKAH'
			})
		}
		if (!messages[0].key.fromMe&&pesan == "FDUPLIKAT") {
			sock.sendMessage(noHp, {
				text: 'hhttps://bit.ly/FDUPLIKAT'
			})
		}
		if (!messages[0].key.fromMe&&pesan == "FBELUMNIKAH") {
			sock.sendMessage(noHp, {
				text: 'https://bit.ly/FBELUMNIKAH'
			})
		}
		if (!messages[0].key.fromMe&&pesan == "FPENGEMBALIAN") {
			sock.sendMessage(noHp, {
				text: 'https://bit.ly/FPENGEMBALIAN'
			})
		}
		if (!messages[0].key.fromMe&&pesan == "FWALI") {
			sock.sendMessage(noHp, {
				text: 'https://bit.ly/FRMWALI'
			})
		}
		if (!messages[0].key.fromMe&&pesan == "FJEJAKA") {
			sock.sendMessage(noHp, {
				text: 'https://bit.ly/FJEJAKA'
			})
		}
		if (!messages[0].key.fromMe&&pesan == "FWAKAF") {
			sock.sendMessage(noHp, {
				text: 'https://bit.ly/FWAKAF'
			})
		}
		if (!messages[0].key.fromMe&&pesan == "FTWALI") {
			sock.sendMessage(noHp, {
				text: 'https://bit.ly/FTWALI'
			})
		}
		if (responseButton) {
			responseButton.selectedButtonId == "1"?sock.sendMessage(noHp, {
				text: `Jika Anda Menemukan Error Atau Bug Silahkan Email / Hubungi Developer Dengan Email : razanaauva@gmail.com`
			}): sock.sendMessage(noHp, {
				text: `Whatsapp bot layanan KUA Kec. Kanigoro dibuat oleh Razan. Nodejs v16.0.5, baileys v4.0.0`
			})
		}
	})
}
startBot();