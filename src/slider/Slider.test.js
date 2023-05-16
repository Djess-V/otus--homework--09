import Slider from "./Slider";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

describe("Slider", () => {
  let element;
  beforeEach(() => {
    element = document.createElement("div");
    element.classList.add("slider");

    element.innerHTML = `
      <div class="slider__images slider-images">
      <div class="slider-images__image slider-images__image_active">
        <img src="../assets/images/slider_image1.png" alt="Slider_image1" />
      </div>
      <div class="slider-images__image">
        <img src="../assets/images/slider_image2.png" alt="Slider_image2" />
      </div>
      <div class="slider-images__image">
        <img src="../assets/images/slider_image3.png" alt="Slider_image3" />
      </div>
    </div>
    <div class="slider__pagination slider-pagination">
      <span
        class="slider-pagination__item slider-pagination__item_active"
        data-id="0"
      ></span>
      <span class="slider-pagination__item" data-id="1"></span>
      <span class="slider-pagination__item" data-id="2"></span>
    </div>
    <div class="slider__buttons slider-buttons">
      <a
        class="slider-buttons__prev button-prev"
        href="#headerSlider"
        role="button"
      >
        <span class="button-prev__icon" aria-hidden="true"></span>
      </a>
      <a
        class="slider-buttons__next button-next"
        href="#headerSlider"
        role="button"
      >
        <span class="button-next__icon" aria-hidden="true"></span>
      </a>
    </div>
      `;
  });

  describe("сhecking slider creation", () => {
    describe("without the parameter - 'options'", () => {
      it("proper creation", () => {
        const slider = new Slider(element);

        expect(slider).toBeInstanceOf(Slider);
        expect(slider.delay).toBe(8000);
        expect(slider.images.length).toBe(3);
        expect(slider.paginations.length).toBe(3);
      });

      it("incorrect creation", () => {
        expect(() => new Slider()).toThrow();
      });
    });

    describe("with the parameter - 'options'", () => {
      it("incorrect options", () => {
        const slider1 = new Slider(element, "string");
        expect(slider1.delay).toBe(8000);

        const slider2 = new Slider(element, { id: 45 });
        expect(slider2.delay).toBe(8000);

        const slider3 = new Slider(element, { delay: -56787 });
        expect(slider3.delay).toBe(8000);
      });

      it("correct options", () => {
        const slider = new Slider(element, { delay: 6000 });
        expect(slider.delay).toBe(6000);
      });
    });
  });

  it("initialization check", () => {
    const slider = new Slider(element);
    slider.init();

    expect(slider.timer).not.toBeNull();
  });

  it("click-through check - btnPrev", async () => {
    const slider = new Slider(element, { delay: 6000 });
    const clearSpyOn = jest.spyOn(window, "clearInterval");
    slider.init();

    slider.slider.dispatchEvent(new MouseEvent("mouseover"));

    expect(clearSpyOn).toHaveBeenCalled();

    const btnPrev = element.querySelector(".button-prev");

    btnPrev.dispatchEvent(new Event("click"));

    expect(
      slider.images.items[2].classList.contains("slider-images__image_prev")
    ).toBeTruthy();
  });

  it("click-through check - btnNext", async () => {
    const slider = new Slider(element, { delay: 6000 });
    slider.init();

    slider.slider.dispatchEvent(new MouseEvent("mouseover"));

    const btnNext = element.querySelector(".button-next");

    btnNext.dispatchEvent(new Event("click"));

    expect(
      slider.images.items[1].classList.contains("slider-images__image_next")
    ).toBeTruthy();
  });

  it("pagination check", async () => {
    const slider = new Slider(element, { delay: 6000 });
    const nextSpyon = jest.spyOn(slider, "next");
    const prevSpyon = jest.spyOn(slider, "prev");

    slider.init();

    slider.slider.dispatchEvent(new MouseEvent("mouseover"));

    slider.paginations.items[2].dispatchEvent(new Event("click"));

    await sleep(7000);

    expect(prevSpyon).toHaveBeenCalled();

    slider.paginations.items[0].dispatchEvent(new Event("click"));

    expect(nextSpyon).toHaveBeenCalled();

    slider.paginations.items[1].dispatchEvent(new Event("click"));

    await sleep(7000);

    expect(nextSpyon).toHaveBeenCalled();
  }, 20000);
});
