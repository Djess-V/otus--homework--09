import Slider from "./slider/slider";
import "./sass/style.scss";

const wrapper = document.querySelector(".wrapper");

function initial(element) {
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

  const slider = new Slider(element.querySelector(".slider"), { delay: 5000 });

  slider.init();
}

window.addEventListener("load", (e) => initial(wrapper));
