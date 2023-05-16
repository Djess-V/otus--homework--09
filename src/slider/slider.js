export default class Slider {
  timer = null;

  delay = 8000;

  slider = null;

  images = {
    items: [],
    length: 0,
  };

  paginations = {
    items: [],
    length: 0,
  };

  btnPrev = null;

  btnNext = null;

  handlerPaging = this.handlerPagination.bind(this);

  constructor(element, options) {
    if (
      options instanceof Object &&
      "delay" in options &&
      typeof options.delay === "number" &&
      options.delay >= 6000 &&
      options.delay <= 20000
    ) {
      this.delay = options.delay;
    }

    if (!element) {
      throw new Error("Элемент не передан!");
    }
    this.slider = element;
    this.images.items = this.slider.querySelectorAll(".slider-images__image");
    this.images.length = this.images.items.length;
    this.paginations.items = this.slider.querySelectorAll(
      ".slider-pagination__item"
    );
    this.paginations.length = this.paginations.items.length;
    this.btnPrev = this.slider.querySelector(".button-prev");
    this.btnNext = this.slider.querySelector(".button-next");
  }

  init() {
    this.run();

    this.slider.addEventListener("mouseover", this.clearTimer.bind(this));

    this.slider.addEventListener("mouseout", this.run.bind(this));

    this.btnNext.addEventListener("click", this.next.bind(this));

    this.btnPrev.addEventListener("click", this.prev.bind(this));

    for (const item of this.paginations.items) {
      item.addEventListener("click", (e) => this.handlerPaging(e));
    }
  }

  run() {
    this.timer = setInterval(() => this.next(), this.delay);
  }

  next() {
    let count = 0;
    for (let i = 0; i < this.images.length; i += 1) {
      if (
        this.images.items[i].classList.contains("slider-images__image_next") ||
        this.images.items[i].classList.contains("slider-images__image_prev")
      ) {
        count += 1;
      }
    }

    if (count !== 0) {
      return;
    }

    for (let i = 0; i < this.images.length; i += 1) {
      if (
        this.images.items[i].classList.contains("slider-images__image_active")
      ) {
        const index = i;

        if (index === this.images.length - 1) {
          this.images.items[0].classList.add("slider-images__image_next");

          setTimeout(() => {
            this.images.items[i].classList.add("slider-images__image_left");
            this.images.items[0].classList.add("slider-images__image_left");
            this.paginations.items[i].classList.remove(
              "slider-pagination__item_active"
            );
            this.paginations.items[0].classList.add(
              "slider-pagination__item_active"
            );
          }, this.delay / 8);

          setTimeout(() => {
            this.images.items[0].classList.remove("slider-images__image_next");
            this.images.items[0].classList.remove("slider-images__image_left");

            this.images.items[0].classList.add("slider-images__image_active");
          }, this.delay / 3);
        } else {
          this.images.items[index + 1].classList.add(
            "slider-images__image_next"
          );

          setTimeout(() => {
            this.images.items[i].classList.add("slider-images__image_left");
            this.images.items[index + 1].classList.add(
              "slider-images__image_left"
            );
            this.paginations.items[i].classList.remove(
              "slider-pagination__item_active"
            );
            this.paginations.items[index + 1].classList.add(
              "slider-pagination__item_active"
            );
          }, this.delay / 8);

          setTimeout(() => {
            this.images.items[index + 1].classList.remove(
              "slider-images__image_next"
            );
            this.images.items[index + 1].classList.remove(
              "slider-images__image_left"
            );
            this.images.items[index + 1].classList.add(
              "slider-images__image_active"
            );
          }, this.delay / 3);
        }

        setTimeout(() => {
          this.images.items[index].classList.remove(
            "slider-images__image_left"
          );
          this.images.items[index].classList.remove(
            "slider-images__image_active"
          );
        }, this.delay / 3);

        break;
      }
    }
  }

  prev() {
    let count = 0;
    for (let i = 0; i < this.images.length; i += 1) {
      if (
        this.images.items[i].classList.contains("slider-images__image_next") ||
        this.images.items[i].classList.contains("slider-images__image_prev")
      ) {
        count += 1;
      }
    }

    if (count !== 0) {
      return;
    }

    for (let i = 0; i < this.images.length; i += 1) {
      if (
        this.images.items[i].classList.contains("slider-images__image_active")
      ) {
        const index = i;

        if (index === 0) {
          this.images.items[this.images.length - 1].classList.add(
            "slider-images__image_prev"
          );

          setTimeout(() => {
            this.images.items[0].classList.add("slider-images__image_right");
            this.images.items[this.images.length - 1].classList.add(
              "slider-images__image_right"
            );
            this.paginations.items[0].classList.remove(
              "slider-pagination__item_active"
            );
            this.paginations.items[this.paginations.length - 1].classList.add(
              "slider-pagination__item_active"
            );
          }, this.delay / 8);

          setTimeout(() => {
            this.images.items[this.images.length - 1].classList.remove(
              "slider-images__image_prev"
            );
            this.images.items[this.images.length - 1].classList.remove(
              "slider-images__image_right"
            );

            this.images.items[this.images.length - 1].classList.add(
              "slider-images__image_active"
            );
          }, this.delay / 3);
        } else {
          this.images.items[index - 1].classList.add(
            "slider-images__image_prev"
          );

          setTimeout(() => {
            this.images.items[index].classList.add(
              "slider-images__image_right"
            );
            this.images.items[index - 1].classList.add(
              "slider-images__image_right"
            );
            this.paginations.items[index].classList.remove(
              "slider-pagination__item_active"
            );
            this.paginations.items[index - 1].classList.add(
              "slider-pagination__item_active"
            );
          }, this.delay / 8);

          setTimeout(() => {
            this.images.items[index - 1].classList.remove(
              "slider-images__image_prev"
            );
            this.images.items[index - 1].classList.remove(
              "slider-images__image_right"
            );
            this.images.items[index - 1].classList.add(
              "slider-images__image_active"
            );
          }, this.delay / 3);
        }

        setTimeout(() => {
          this.images.items[index].classList.remove(
            "slider-images__image_right"
          );
          this.images.items[index].classList.remove(
            "slider-images__image_active"
          );
        }, this.delay / 3);

        break;
      }
    }
  }

  handlerPagination(e) {
    if (e.target.classList.contains("slider-pagination__item_active")) {
      return;
    }

    let idActive;

    for (const item of this.paginations.items) {
      if (item.classList.contains("slider-pagination__item_active")) {
        idActive = Number(item.dataset.id);
        break;
      }
    }

    const id = Number(e.target.dataset.id);

    if (idActive === this.paginations.length - 1 && id === 0) {
      this.next();
      return;
    }

    if (idActive === 0 && id === this.paginations.length - 1) {
      this.prev();
      return;
    }

    if (id > idActive) {
      this.next();
    } else {
      this.prev();
    }
  }

  clearTimer() {
    clearInterval(this.timer);
  }
}
