document.addEventListener("DOMContentLoaded", function () {

    console.log("Sözlük sistemi başlatılıyor...");

    /* ----------------------------- JSON SÖZLÜĞÜ ----------------------------- */

    var SOZLUK_URL =
        "https://raw.githubusercontent.com/ahsenulamel/blog_sozluk/refs/heads/main/sozluk.json";

    var sozluk = {};

    fetch(SOZLUK_URL)
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Sözlük dosyası yüklenemedi: " + response.status);
            }

            return response.json();

        })
        .then(function (veri) {

            sozluk = veri;

            console.log("Sözlük yüklendi:", sozluk);

        })
        .catch(function (hata) {

            console.error("Sözlük yüklenirken hata oluştu:", hata);

        });


    /* ----------------------------- AÇIKLAMA KUTUSU ----------------------------- */

    var kutu = document.createElement("div");

    kutu.id = "dic-popup";

    document.body.appendChild(kutu);


    /* ----------------------------- FARE HAREKETİ ----------------------------- */

    document.addEventListener("mouseover", function (event) {

        var hedef = event.target.closest("dic");

        if (!hedef) {
            return;
        }

        var kelime = hedef.textContent.trim();

        console.log("Üzerine gelindi:", kelime);

        if (!sozluk[kelime]) {

            console.log("Sözlükte bulunamadı:", kelime);

            kutu.style.display = "none";

            return;
        }

        kutu.textContent = sozluk[kelime];

        kutu.style.display = "block";


        /* ----------------------------- KONUMLANDIRMA ----------------------------- */

        var x = event.clientX + 12;
        var y = event.clientY + 15;

        var w = kutu.offsetWidth;
        var h = kutu.offsetHeight;


        if (x + w > window.innerWidth - 10) {

            x = window.innerWidth - w - 10;

        }


        if (y + h > window.innerHeight - 10) {

            y = event.clientY - h - 15;

        }


        kutu.style.left = x + "px";
        kutu.style.top = y + "px";

    });


    /* ----------------------------- FARE KELİMEDEN AYRILDI ----------------------------- */

    document.addEventListener("mouseout", function (event) {

        var hedef = event.target.closest("dic");

        if (!hedef) {
            return;
        }

        kutu.style.display = "none";

    });


    console.log("Sözlük sistemi hazır.");

});
