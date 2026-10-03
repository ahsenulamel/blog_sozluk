
(function () {
  "use strict";

  var SOZLUK_JSON_URL =
    "https://kullanici.github.io/sozluk/sozluk.json";

  // Sözlük verilerini dış dosyadan yükle
  fetch(SOZLUK_JSON_URL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Sözlük yüklenemedi.");
      }
      return response.json();
    })
    .then(function (sozluk) {
      var kutu = document.createElement("div");
      kutu.id = "dic-popup";

      kutu.style.cssText =
        "display:none;position:fixed;z-index:99999;" +
        "max-width:320px;padding:10px 14px;" +
        "background:#222;color:#fff;border-radius:6px;" +
        "font-size:14px;line-height:1.6;" +
        "pointer-events:none;";

      document.body.appendChild(kutu);

      document.addEventListener("mouseover", function (event) {
        var hedef = event.target.closest("dic");
        if (!hedef) return;

        var kelime = hedef.textContent
          .trim()
          .toLocaleLowerCase("tr-TR");

        if (!sozluk[kelime]) {
          kutu.style.display = "none";
          return;
        }

        kutu.textContent = sozluk[kelime];
        kutu.style.display = "block";

        var x = event.clientX + 12;
        var y = event.clientY + 15;

        var rect = kutu.getBoundingClientRect();

        if (x + rect.width > window.innerWidth - 10) {
          x = window.innerWidth - rect.width - 10;
        }

        if (y + rect.height > window.innerHeight - 10) {
          y = event.clientY - rect.height - 15;
        }

        kutu.style.left = Math.max(5, x) + "px";
        kutu.style.top = Math.max(5, y) + "px";
      });

      document.addEventListener("mouseout", function (event) {
        var hedef = event.target.closest("dic");
        if (hedef) kutu.style.display = "none";
      });
    })
    .catch(function (error) {
      console.error("Sözlük sistemi:", error);
    });
})();
