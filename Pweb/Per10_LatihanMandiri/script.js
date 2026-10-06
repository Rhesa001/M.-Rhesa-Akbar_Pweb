// Array untuk menyimpan data mahasiswa
const dataMahasiswa = [];

// Mengambil elemen HTML
const formMahasiswa = document.getElementById("formMahasiswa");
const tabelMahasiswa = document.getElementById("tabelMahasiswa");
const pesanKosong = document.getElementById("pesanKosong");

const jumlahMahasiswa = document.getElementById("jumlahMahasiswa");
const jumlahLulus = document.getElementById("jumlahLulus");
const jumlahTidakLulus = document.getElementById("jumlahTidakLulus");
const rataRata = document.getElementById("rataRata");

// ======================================================
// FUNCTION UNTUK MENENTUKAN GRADE
// ======================================================

function tentukanGrade(nilai) {
    if (nilai >= 85) {
        return "A";
    } else if (nilai >= 75) {
        return "B";
    } else if (nilai >= 65) {
        return "C";
    } else if (nilai >= 50) {
        return "D";
    } else {
        return "E";
    }
}

// ======================================================
// FUNCTION UNTUK MENENTUKAN STATUS
// ======================================================

function tentukanStatus(nilai) {
    if (nilai >= 60) {
        return "Lulus";
    } else {
        return "Tidak Lulus";
    }
}

// ======================================================
// FUNCTION UNTUK MENGHITUNG NILAI AKHIR
// ======================================================

function hitungNilaiAkhir(tugas, uts, uas) {
    // Bobot:
    // Tugas = 30%
    // UTS   = 30%
    // UAS   = 40%

    const nilaiAkhir =
        (tugas * 0.30) +
        (uts * 0.30) +
        (uas * 0.40);

    return nilaiAkhir;
}

// ======================================================
// EVENT KETIKA FORM DIKIRIM
// ======================================================

formMahasiswa.addEventListener("submit", function(event) {

    // Mencegah halaman melakukan refresh
    event.preventDefault();

    // Mengambil nilai dari input
    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;

    const tugas = Number(document.getElementById("tugas").value);
    const uts = Number(document.getElementById("uts").value);
    const uas = Number(document.getElementById("uas").value);

    // ==================================================
    // DEBUGGING 1
    // Menampilkan data input ke Console
    // ==================================================

    console.log("DEBUG 1 - Data Input:");
    console.log("Nama:", nama);
    console.log("NIM:", nim);
    console.log("Nilai Tugas:", tugas);
    console.log("Nilai UTS:", uts);
    console.log("Nilai UAS:", uas);

    // Menghitung nilai akhir
    const nilaiAkhir = hitungNilaiAkhir(tugas, uts, uas);

    // Menentukan grade
    const grade = tentukanGrade(nilaiAkhir);

    // Menentukan status
    const status = tentukanStatus(nilaiAkhir);

    // ==================================================
    // DEBUGGING 2
    // Menampilkan hasil proses
    // ==================================================

    console.log("DEBUG 2 - Hasil Perhitungan:");
    console.log("Nilai Akhir:", nilaiAkhir.toFixed(2));
    console.log("Grade:", grade);
    console.log("Status:", status);

    // Membuat object mahasiswa
    const mahasiswa = {
        nama: nama,
        nim: nim,
        tugas: tugas,
        uts: uts,
        uas: uas,
        nilaiAkhir: nilaiAkhir,
        grade: grade,
        status: status
    };

    // Memasukkan object ke dalam array
    dataMahasiswa.push(mahasiswa);

    // ==================================================
    // DEBUGGING 3
    // Melihat seluruh data mahasiswa
    // ==================================================

    console.log("DEBUG 3 - Array Data Mahasiswa:");
    console.log(dataMahasiswa);

    // Menampilkan data ke tabel
    tampilkanData();

    // Mengosongkan form
    formMahasiswa.reset();
});

// ======================================================
// FUNCTION MENAMPILKAN DATA KE HTML
// ======================================================

function tampilkanData() {

    // Menghapus isi tabel sebelumnya
    tabelMahasiswa.innerHTML = "";

    // Jika belum ada data
    if (dataMahasiswa.length === 0) {
        pesanKosong.style.display = "block";
        return;
    }

    // Menyembunyikan pesan kosong
    pesanKosong.style.display = "none";

    // Loop untuk mengambil setiap mahasiswa
    dataMahasiswa.forEach(function(mahasiswa, index) {

        // Membuat baris baru
        const baris = document.createElement("tr");

        // Menentukan class status
        const classStatus =
            mahasiswa.status === "Lulus"
                ? "lulus"
                : "tidak-lulus";

        // Memasukkan data ke tabel
        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${mahasiswa.nama}</td>
            <td>${mahasiswa.nim}</td>
            <td>${mahasiswa.tugas}</td>
            <td>${mahasiswa.uts}</td>
            <td>${mahasiswa.uas}</td>
            <td>${mahasiswa.nilaiAkhir.toFixed(2)}</td>
            <td class="grade">${mahasiswa.grade}</td>
            <td class="${classStatus}">
                ${mahasiswa.status}
            </td>
        `;

        // Memasukkan baris ke tabel
        tabelMahasiswa.appendChild(baris);
    });

    // Memperbarui statistik
    tampilkanStatistik();
}

// ======================================================
// FUNCTION MENAMPILKAN STATISTIK
// ======================================================

function tampilkanStatistik() {

    // Jumlah mahasiswa
    const totalMahasiswa = dataMahasiswa.length;

    // Menghitung jumlah mahasiswa lulus
    let totalLulus = 0;

    // Loop untuk menghitung mahasiswa lulus
    dataMahasiswa.forEach(function(mahasiswa) {

        if (mahasiswa.status === "Lulus") {
            totalLulus++;
        }
    });

    // Menghitung mahasiswa tidak lulus
    const totalTidakLulus = totalMahasiswa - totalLulus;

    // Menghitung total nilai
    let totalNilai = 0;

    dataMahasiswa.forEach(function(mahasiswa) {
        totalNilai += mahasiswa.nilaiAkhir;
    });

    // Menghitung rata-rata
    let nilaiRataRata = 0;

    if (totalMahasiswa > 0) {
        nilaiRataRata = totalNilai / totalMahasiswa;
    }

    // Menampilkan hasil ke HTML
    jumlahMahasiswa.textContent = totalMahasiswa;
    jumlahLulus.textContent = totalLulus;
    jumlahTidakLulus.textContent = totalTidakLulus;
    rataRata.textContent = nilaiRataRata.toFixed(2);

    // ==================================================
    // DEBUGGING 4
    // Menampilkan statistik ke Console
    // ==================================================

    console.log("DEBUG 4 - Statistik:");
    console.log("Jumlah Mahasiswa:", totalMahasiswa);
    console.log("Jumlah Lulus:", totalLulus);
    console.log("Jumlah Tidak Lulus:", totalTidakLulus);
    console.log("Rata-rata:", nilaiRataRata.toFixed(2));
}
