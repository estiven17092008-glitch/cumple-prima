// Exactamente 6:00 AM en Colombia (12:00 PM en España)
const countDownDate = new Date("2026-11-16T06:00:00-05:00").getTime();
const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btn-musica");
let sonando = false;

function reproducirMusica() {
  if (!sonando) {
    musica
      .play()
      .then(() => {
        sonando = true;
        btnMusica.innerText = "⏸️ Pausar música";
      })
      .catch(() => {});
  }
}

btnMusica.addEventListener("click", () => {
  if (sonando) {
    musica.pause();
    sonando = false;
    btnMusica.innerText = "🎵 Poner música";
  } else {
    reproducirMusica();
  }
});

const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = Math.max(0, days)
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").innerText = Math.max(0, hours)
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = Math.max(0, minutes)
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = Math.max(0, seconds)
    .toString()
    .padStart(2, "0");

  if (distance <= 0) {
    clearInterval(x);
    document.getElementById("countdown-container").classList.add("hidden");
    document.getElementById("surprise-container").classList.remove("hidden");
    lanzarConfeti();
    reproducirMusica();
  }
}, 1000);

function lanzarConfeti() {
  let duration = 8 * 1000;
  let animationEnd = Date.now() + duration;
  let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  let interval = setInterval(function () {
    let timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    let particleCount = 50 * (timeLeft / duration);
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      }),
    );
  }, 250);
}

const tarjetas = document.querySelectorAll(".polaroid");
const modal = document.getElementById("modal-foto");
const modalImg = document.getElementById("modal-img");
const modalTexto = document.getElementById("modal-texto");
const btnCerrar = document.getElementById("cerrar-modal");

tarjetas.forEach((tarjeta) => {
  tarjeta.addEventListener("click", () => {
    reproducirMusica();
    const rutaFoto = tarjeta.querySelector("img").src;
    const mensaje = tarjeta.dataset.mensaje;

    modalImg.src = rutaFoto;
    modalTexto.innerText = mensaje;
    modal.classList.remove("hidden");
  });
});

btnCerrar.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
