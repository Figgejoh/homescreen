// watch + title
const title = document.querySelector(".title");
const clock = document.querySelector(".clock");

let today = new Date();
let time = today.getHours();
let greet = "";

if (time < 12) {
  greet = "<h1>God Morgon, Fredrik</h1>";
} else if (time === 12 || time < 18) {
  greet = "<h1>God Dag, Fredrik</h1>";
} else {
  greet = "<h1>God Kväll, Fredrik</h1>";
}

title.innerHTML = greet;

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();

  m = checkTime(m);
  s = checkTime(s);
  clock.innerHTML = `${h}:${m}:${s}`;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

clock.innerHTML = `Klockan är: ${startTime()}`;

// Todo List

const inputBox = document.querySelector(".input-box");
const listContainer = document.querySelector(".list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Du änna glömde något du...");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// WEATHER APP

const apiKey = "1df4cfce79cb00f20cee663ff16c153b";
const apiBase = "https://api.openweathermap.org/data/2.5/weather";

const city = document.querySelector(".city-span");
const temperature = document.querySelector(".temp");
const searchBtn = document.querySelector(".search-btn");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

city.innerHTML = "Stenungsund";
