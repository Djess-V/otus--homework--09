import Slider from "./slider/Slider";
import "./sass/style.scss";

const wrapper = document.querySelector(".wrapper");

function initial(element) {
  try {
    const links = element.querySelectorAll(".nav-header__link");

    if (links) {
      links.forEach((link) => {
        if (window.location.pathname === `/${link.id}.html`) {
          link.classList.add("nav-header__link_active");
        }
      });
    }

    const form = element.querySelector(".form-contacts");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const message = element.querySelector(".contacts-container__message");

        message.style.opacity = "1";
      });
    }

    // Задержка отображения слайдов должна быть от 6000 до 20000 мс.
    const slider = new Slider(element.querySelector(".slider"), {
      delay: 5000,
    });

    slider.init();
  } catch (e) {
    console.log(e);
  }
}

window.addEventListener("load", (e) => initial(wrapper));
