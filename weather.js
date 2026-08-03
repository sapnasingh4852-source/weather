const input = document.querySelector("input");
const form = document.querySelector("form");
const cityElement = document.querySelector(".city");
const cloudElement = document.querySelector(".cloud");
const tempElement = document.querySelector(".temp");
const iconElement = document.querySelector(".icon");
const minElement = document.querySelector(".min");
const maxElement = document.querySelector(".max");
const feelsElement = document.querySelector(".feels");
const humidityElement = document.querySelector(".humidity");
const pressureElement = document.querySelector(".pressure");
const windElement = document.querySelector(".wind");


const API_KEY = "cc78f577884fde13d63d61e54989e331";

const getCountryName = (code) => {
	return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getWeather = async (city) => {
	if (!city) return;

	const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

	try {
		const res = await fetch(api);
		const data = await res.json();

		localStorage.setItem("weather", JSON.stringify(data))
		console.log(data);

		if (data.cod === "404") {
			alert("City not found!");
			return;
		}

		const { main, name, weather, wind: windData, sys } = data;

		cityElement.innerHTML = `${name}, ${getCountryName(sys.country)}`;
		iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="weather icon">`;
		tempElement.innerHTML = `${main.temp}&#176;C`;
		cloudElement.innerHTML = `${weather[0].main}`;
		minElement.innerHTML = `Min: ${main.temp_min.toFixed()}&#176;`;
		maxElement.innerHTML = `Max: ${main.temp_max.toFixed()}&#176;`;

		feelsElement.innerHTML = `${main.feels_like.toFixed()}&#176;`;
		pressureElement.innerHTML = `${main.pressure} hPa`;
		windElement.innerHTML = `${windData.speed} m/s`;
		humidityElement.innerHTML = `${main.humidity}%`;

	} catch (error) {
		console.error("Error fetching weather data:", error);
		alert("An error occurred while fetching weather data.");
	}
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const city = input.value.trim();
	if (city === "") {
		alert("Please Enter A City Name!");
	} else {
		getWeather(city);
	}
});

window.addEventListener("load", () => {
	// getWeather("Delhi");
	let data = JSON.parse(localStorage.getItem("weather"));
	if(data){
		getWeather(data.name)
	}
});