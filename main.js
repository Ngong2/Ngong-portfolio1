toggleModalForm();
submitForm();
ae_animations();

function toggleModalForm() {
    const ctas = document.querySelectorAll("[data-cta]");
    const closeModal = document.querySelector(".close-modal");
    const body = document.body;
    const modal = document.querySelector(".modal");
    const isVisible = "is-visible";
    const opened = "is-modal-opened";

    ctas.forEach((cta) => {
        cta.addEventListener("click", () => {
            modal.classList.add(isVisible);
            body.classList.add(opened);
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove(isVisible);
        body.classList.remove(opened);
    });

    document.addEventListener("keyup", (e) => {
        if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
            document
                .querySelector(".modal.is-visible")
                .classList.remove(isVisible);
        }
    });

    document.addEventListener("click", (e) => {
        if (e.target == document.querySelector(".modal.is-visible")) {
            document
                .querySelector(".modal.is-visible")
                .classList.remove(isVisible);
        }
    });
}

function submitForm() {
    const modalContent = document.querySelector(".modal-content");
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = new FormData(this);

      fetch("process.php", {
            method: "POST",
            body: data,
        })
            .then((response) => response.text())
            .then(function () {
                modalContent.textContent =
                    "Thank you for your message! I'll get back to you soon :)";
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
}

function ae_animations() {
    const logo = document.querySelector(".logo");
    const animatedEls = document.querySelectorAll(".animated");
    for (const animatedEl of animatedEls) {
        const id = animatedEl.id;
        lottie.loadAnimation({
            container: document.getElementById(id),
            renderer: "svg",
            loop: true,
            autoplay: false,
            name: id,
            path: `assets/json/${id}.json`,
        });
    }

    window.addEventListener("load", function () {
        lottie.play("avatar");
    });

    logo.addEventListener("mouseenter", function () {
        lottie.play("logo");
    });

    logo.addEventListener("mouseleave", function () {
        lottie.stop("logo");
    });
}