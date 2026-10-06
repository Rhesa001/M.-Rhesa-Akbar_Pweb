document.addEventListener("DOMContentLoaded", () => {
    const formNilai = document.getElementById("formNilai");
    const hasilContainer = document.getElementById("hasil");

    formNilai.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1. Ambil nilai dari input form
        const nama = document.getElementById("nama").value.trim();
        const tugas = parseFloat(document.getElementById("tugas").value);
        const uts = parseFloat(document.getElementById("uts").value);
        const uas = parseFloat(document.getElementById("uas").value);

        // 2. Hitung nilai akhir (Bobot: Tugas 30%, UTS 30%, UAS 40%)
        const nilaiAkhir = (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);

        // 3. Tentukan Grade
        let grade = "";
        if (nilaiAkhir >= 85) {
            grade = "A";
        } else if (nilaiAkhir >= 75) {
            grade = "B";
        } else if (nilaiAkhir >= 65) {
            grade = "C";
        } else if (nilaiAkhir >= 50) {
            grade = "D";
        } else {
            grade = "E";
        }

        // 4. Tentukan Status Kelulusan (Lulus jika nilai akhir >= 65)
        const isLulus = nilaiAkhir >= 65;
        const status = isLulus ? "Lulus" : "Tidak Lulus";
        const statusColor = isLulus ? "#10b981" : "#ef4444";

        // 5. Render/Tampilkan hasil ke dalam modul kanan (#hasil)
        hasilContainer.innerHTML = `
            <h2>Hasil Perhitungan</h2>
            <p style="margin-bottom: 8px;">Mahasiswa: <strong>${nama}</strong></p>
            
            <div class="result-score">${nilaiAkhir.toFixed(1)}</div>
            
            <p class="result-status">
                Status: <span style="color: ${statusColor};">${status}</span>
            </p>
            
            <div class="result-details">
                <div class="result-card">Grade: <strong>${grade}</strong></div>
                <div class="result-card">Tugas: ${tugas}</div>
                <div class="result-card">UTS: ${uts}</div>
                <div class="result-card">UAS: ${uas}</div>
            </div>
        `;
    });
});