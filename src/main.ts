import "./style.scss";
import confetti, { Options } from "canvas-confetti";
import ColorThief from "colorthief";

// Types

type Color = [number, number, number];

type ColorThief = {
  getColor: (img: HTMLImageElement, quality?: number) => Color;
  getPalette: (
    img: HTMLImageElement,
    colorCount?: number,
    quality?: number
  ) => Color[];
};

// Query selectors

const button = document.querySelector<HTMLButtonElement>("button");
const dogImage = document.querySelector<HTMLImageElement>("#dog-image");
const imgInput = document.querySelector<HTMLInputElement>("#textInput");
// const imgDiv = document.querySelector("#myImageDiv");

if (!button || !dogImage || !imgInput) {
  throw new Error("Issue with query selector");
}

// Functions

const colorThief: ColorThief = new ColorThief();

const onImageLoad = () => {
  const color = colorThief.getColor(dogImage);
  // change the background color of the whole page
  document.body.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  console.log(color);
};

if (dogImage.complete) {
  onImageLoad();
} else {
  dogImage.addEventListener("load", onImageLoad);
}

const onInputSubmit = (event: Event) => {
  const url = (event.target as HTMLInputElement).value as string;
  dogImage.src = url;
  onImageLoad();
};

imgInput.addEventListener("change", onInputSubmit);

console.log("Welcome to NPM!");

const launchConfetti = () => {
  const options: Options = {
    particleCount: 100,
    spread: Math.floor(Math.random() * 180) + 1,
    angle: Math.floor(Math.random() * 180) + 1,
    colors: ["#ee2fbe", "#abe2de", "#65ae3c"],
    shapes: ["square", "circle", "star"],
  };
  confetti(options);
};

button.addEventListener("click", launchConfetti);
