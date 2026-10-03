document.addEventListener("DOMContentLoaded", function () {

    var sozluk = {
        "tenzil": "İndirme, peyderpey indirme anlamına gelir.",
        "vahiy": "Allah'ın peygamberlerine bildirdiği ilahî mesaj.",
        "tevil": "Bir sözü veya ifadeyi, delile dayanarak muhtemel anlamlarından birine yorumlama."
    };

    var kutu = document.createElement("div");

    kutu.id = "dic-popup";

    document.body.appendChild(kutu);

    document.addEventListener("mouseover", function (event) {

        var hedef = event.target.closest("dic");

        if (!hedef) {
            return;
        }

        var kelime = hedef.textContent.trim();

        if (!sozluk[kelime]) {
            return;
        }

        kutu.textContent = sozluk[kelime];

        kutu.style.display = "block";

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

    document.addEventListener("mouseout", function (event) {

        var hedef = event.target.closest("dic");

        if (!hedef) {
            return;
        }

        kutu.style.display = "none";

    });

});
