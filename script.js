

// const sub_btn=document.getElementById('submit-btn')
// const loc=document.getElementById('location-input')




// sub_btn.addEventListener('click',async()=>{


//     console.log(loc.value);

//         const resp=await fetch(`http://api.weatherapi.com/v1/current.json?key=1808283b59f942f4952224329242504&q=${loc.value}&aqi=no`)
//         const data=await resp.json()
        
//         console.log(data);
        // const weatherInfo = {
        //     location: {
        //         name: data.location.name,
        //         country: data.location.country,
        //         region: data.location.region
        //     },
        //     currentWeather: {
        //         temperatureC: data.current.temp_c,
        //         temperatureF: data.current.temp_f,
        //         condition: {
        //             text: data.current.condition.text,
        //             icon: data.current.condition.icon
        //         },
        //         humidity: data.current.humidity,
        //         windSpeedKph: data.current.wind_kph,
        //         windSpeedMph: data.current.wind_mph
        //     }
        // };
    
        // displayWeather(weatherInfo);


// })


document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit-btn");
    const locationInput = document.getElementById("location-input");
    const weatherInfo = document.getElementById("weather-info");
  
    submitButton.addEventListener("click", async () => {
      let location = locationInput.value.trim();
      if (location === "") {
        try {
          const position = await getCurrentLocation();
          location = `${position.coords.latitude},${position.coords.longitude}`;
        } catch (error) {
          weatherInfo.innerHTML = "<p>Error: Unable to retrieve location</p>";
          return;
        }
        
      }
  
      try {
        console.log(location);
        const weatherData = await fetchWeatherData(location);
         const data=weatherData
        console.log(weatherData);
        const weatherInfo = {
            location: {
                name: data.location.name,
                country: data.location.country,
                region: data.location.region
            },
            currentWeather: {
                temperatureC: data.current.temp_c,
                temperatureF: data.current.temp_f,
                condition: {
                    text: data.current.condition.text,
                    icon: data.current.condition.icon
                },
                humidity: data.current.humidity,
                windSpeedKph: data.current.wind_kph,
                windSpeedMph: data.current.wind_mph
            }
        };
    
        displayWeather(weatherInfo);
      } catch (error) {
        weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    });
  });
  
  async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("Geolocation is not supported by your browser"));
      }
    });
  }
  
  async function fetchWeatherData(location) {
    
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=1808283b59f942f4952224329242504&q=${location}&aqi=no`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch weather data");
    }
  }

function displayWeather(weatherInfo) {
    const weatherInfoContainer = document.getElementById('weather-info');
    weatherInfoContainer.innerHTML = `
        <h2>Location: ${weatherInfo.location.name}, ${weatherInfo.location.region}, ${weatherInfo.location.country}</h2>
        <h3>Current Weather</h3>
        <p>Temperature: ${weatherInfo.currentWeather.temperatureC} °C / ${weatherInfo.currentWeather.temperatureF} °F</p>
        <p>Condition: ${weatherInfo.currentWeather.condition.text}</p>
        <img src="${weatherInfo.currentWeather.condition.icon}" alt="Weather Icon">
        <p>Humidity: ${weatherInfo.currentWeather.humidity}%</p>
        <p>Wind Speed: ${weatherInfo.currentWeather.windSpeedKph} km/h / ${weatherInfo.currentWeather.windSpeedMph} mph</p>
    `;
}

