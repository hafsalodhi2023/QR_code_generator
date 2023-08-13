const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");
let QR_Code;
let sizeChoice, BGColorChoice, FGColorChoice;

sizeOptions.addEventListener("change", () => {
  sizeChoice = sizeOptions.value;
});

BGColor.addEventListener("input", () => {
  BGColorChoice = BGColor.value;
});

FGColor.addEventListener("input", () => {
  FGColorChoice = FGColor.value;
});

const inputFormatter = (value) => {
  value = value.replace(/[^a-z0-9A-Z]+/g, "");
  return value;
};

submitBtn.addEventListener("click", async () => {
  container.innerHTML = "";

  QR_Code = await new QRCode(container, {
    text: userInput.value,
    width: sizeChoice,
    height: sizeChoice,
    colorDark: FGColorChoice,
    colorLight: BGColorChoice,
  });

  const src = container.firstChild.toDataURL("image/pmg");
  downloadBtn.href = src;
  let userValue = userInput.value;
  try {
    userValue = new URL(userValue).hostname;
  } catch (_) {
    userValue = inputFormatter(userValue);
    downloadBtn.download = `${userValue}QR`;
    downloadBtn.classList.remove("hide");
  }
});

userInput.addEventListener("input", () => {
  if (userInput.value.trim().length < 1) {
    submitBtn.disabled = true;
    downloadBtn.href = "";
    downloadBtn.classList.add("hide");
  } else {
    submitBtn.disabled = false;
  }
});

window.onload = () => {
  container.innerHTML = "";
  sizeChoice = 100;
  sizeOptions.value = 100;
  userInput.value = "";
  BGColor.value = BGColorChoice = "#ffffff";
  FGColor.value = FGColorChoice = "#377dff";
  downloadBtn.classList.add("hide");
  submitBtn.disabled = true;
};
