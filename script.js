const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const searchbtn = document.querySelector(".search-btn");
const cityName = document.querySelector(".city-name");

// console.log(city, temp, wind, humidity, searchbtn, cityName);
searchbtn.addEventListener("click", () => {
  let val = city.value;
  getWeather(val);
});
const getWeather = async (city) => {
  const apiKey = "e9b6486ee44d565ecbfd2838cd5c85d5";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const reponse = await fetch(apiUrl);
    const data = await reponse.json();
    console.log(data);
    if (data.cod === "404") {
      alert("city not found");
      return;
    }
    if (data.cod === "401") {
        alert("Unauthorized access - invalid API key.");
        return;
      }
    temp.innerText = `${Math.round(data.main.temp)} °C`;
    cityName.innerText = data.name;
    humidity.innerText = data.main.humidity + "%";
    wind.innerText = Math.round(data.wind.speed) + "  Km/h";
    document.querySelector(".weather-details").style.display="block";
  } catch (error) {
    alert("error fetching the weather data", error);
  }
};
