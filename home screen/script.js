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
/*
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

// clock.innerHTML = `Klockan är: ${startTime()}`;
*/

setInterval(setClock, 1000);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minutes-hand]");
const secondHand = document.querySelector("[data-second-hand]");

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hourRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hourRatio);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();
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
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiKey = "1df4cfce79cb00f20cee663ff16c153b";
const apiBase = `https://api.openweathermap.org/data/2.5/weather`;
const queryParams = {
  appid: apiKey,
  q: "Stenungsund",
  units: "metric",
};
const urlParams = new URLSearchParams(queryParams);
const apiUrl = `${apiBase}?${urlParams.toString()}`;
const city = document.querySelector(".city-span");
const cityInput = document.querySelector(".city-input");
const temperature = document.querySelector(".temp");
const searchBtn = document.querySelector(".search-btn");
const forecast = document.querySelector(".forecast");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

city.textContent = "Stenungsund";

fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    populateWeather(data);
  });

searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value;
  if (cityName) {
    fetchWeather(cityName);
    cityInput.value = "";
  } else {
    alert("Please enter a city");
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const cityName = cityInput.value.trim();

    if (cityName) {
      fetchWeather(cityName);
      cityInput.value = "";
    } else {
      alert("Please enter a city name");
    }
  }
});

function fetchWeather(cityName) {
  const apiKey = "1df4cfce79cb00f20cee663ff16c153b";
  const apiBase = `https://api.openweathermap.org/data/2.5/weather`;

  const queryParams = {
    appid: apiKey,
    q: cityName,
    units: "metric",
  };
  const urlParams = new URLSearchParams(queryParams);
  const apiUrl = `${apiBase}?${urlParams.toString()}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      populateWeather(data);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function populateWeather(data) {
  city.textContent = data.name;
  temperature.textContent = data.main.temp;
  humidity.textContent = data.main.humidity;
  wind.textContent = data.wind.speed;
}

// Quote container

const quoteToday = document.querySelector(".today-quote");
const quoter = document.querySelector(".quoter");

function generateQuote() {
  fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: { "X-Api-Key": "+WHTVY9JQAtwrOLrW4ohrQ==JU17aEWUdBzce5Yu" },
  })
    .then((response) => response.json())
    .then((data) => {
      quoteToday.textContent = `"${data[0].quote}"`;
      quoter.textContent = `- ${data[0].author}`;
    });
}
generateQuote();
