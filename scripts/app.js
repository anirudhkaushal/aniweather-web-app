const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const details = document.querySelector(".details");

const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    // another way to write the above code is by using destructing properties
    // const {cityDets, weather} = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.LocalizedName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the night and day and the icon images
    let timeSrc = null;
    if(weather.IsDayTime) {
        timeSrc = "img/day.svg";
    } else {
        timeSrc = "img/night.svg";
    }
    time.setAttribute("src", timeSrc);

    //applying the above condition using ternary operator
    // let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    // remove the d-none class if present
    if(card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }
    
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };
    
    // object shorthand notation...below

    // return {
    //     cityDets,
    //     weather
    // };

};

cityForm.addEventListener("submit", e => {
    e.preventDefault(); // prevent default action

    // get the city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem("city", city);
});

if(localStorage.getItem("city")) {
    updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}