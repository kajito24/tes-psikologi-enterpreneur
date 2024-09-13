
        let chartInstance = null; // Variabel untuk menyimpan instance grafik

        document.getElementById('testForm').addEventListener('submit', function(e) {
            e.preventDefault();

            // Ambil semua jawaban
            let formData = new FormData(e.target);
            let totalScore = 0;

            for (let value of formData.values()) {
                totalScore += parseInt(value);
            }

            // Tentukan kategori dan pesan hasil
            let category, resultMessage;
            let dataValues = [0, 0, 0, 0]; // Tinggi, Sedang, Rendah, Sangat Rendah

            if (totalScore >= 80) {
                category = 'Tinggi';
                dataValues[0] = totalScore;
                resultImage.src = 'Tinggi.png'
                resultMessage = "Tinggi – Anda memiliki jiwa entrepreneur yang sangat kuat. Anda cenderung berani mengambil risiko, inovatif, dan tahan banting, kualitas yang penting untuk menjadi entrepreneur sukses.";
            } else if (totalScore >= 60) {
                category = 'Sedang';
                dataValues[1] = totalScore;
                resultImage.src = 'sedang.png';
                resultMessage = "Sedang – Anda memiliki potensi besar sebagai entrepreneur. Dengan pengembangan lebih lanjut dalam area tertentu, Anda bisa menjadi lebih sukses di dunia kewirausahaan.";
            } else if (totalScore >= 40) {
                category = 'Rendah';
                dataValues[2] = totalScore;
                resultImage.src = 'rendah.png';
                resultMessage = "Rendah – Anda mungkin memiliki beberapa kualitas entrepreneur, tetapi perlu lebih banyak pengembangan dalam hal pengambilan risiko, kreativitas, atau ketekunan.";
            } else {
                category = 'Sangat Rendah';
                dataValues[3] = totalScore;
                resultImage.src = 'sangat-rendah.png';
                resultMessage = "Sangat Rendah – Mungkin jiwa entrepreneur Anda belum berkembang. Jika tertarik, Anda bisa mulai mengasah keterampilan-keterampilan yang mendukung kewirausahaan.";
            }

            // Tampilkan hasil
            document.getElementById('resultText').innerHTML = `<strong>Skor Anda: ${totalScore}</strong><br>${resultMessage}`;

            // Hancurkan chart lama jika ada
            if (chartInstance) {
                chartInstance.destroy();
            }

            // Tampilkan modal
            document.getElementById('resultModal').classList.remove('hidden');
            resultModal.classList.add('flex');
        });

        // Tutup modal
        document.getElementById('closeModal').addEventListener('click', function() {
            document.getElementById('resultModal').classList.add('hidden');
            resultModal.classList.remove('flex');
        });