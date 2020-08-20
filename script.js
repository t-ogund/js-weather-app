const submitButton = document.getElementById("submit");
const inputData = document.getElementById("input-data");
const day = document.getElementsByClassName("day");
const highTemp = document.getElementsByClassName("high-temp");
const lowTemp = document.getElementsByClassName("low-temp");
const condition = document.getElementsByClassName("condition");
const imgSection = document.getElementsByClassName("img-section");
const date = document.getElementsByClassName("date");

submitButton.addEventListener("click", function() {
    event.preventDefault()
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=${inputData.value}&country=US&key=ec69804a082347b592321d0caf2b15cb`)
    .then(response => response.json())
    .then(response => {
        const fiveDayForecast = response.data.slice(0, 5)
        console.log(fiveDayForecast)

        for (let i = 0; i < highTemp.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                highTemp[i].textContent = Math.floor(((fiveDayForecast[i].high_temp * 9/5) + 32)) + " /"
            }
        }

        for (let i = 0; i < lowTemp.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                lowTemp[i].textContent = Math.floor(((fiveDayForecast[i].low_temp * 9/5) + 32)) 
            }
        }

        for (let i = 0; i < condition.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                condition[i].textContent = fiveDayForecast[i].weather.description
            }
        }

        for (let i = 0; i < date.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                const date = fiveDayForecast[i].datetime
                
                date[i].textContent = fiveDayForecast[i].datetime
            }
        }
    })
    console.log(inputData.value)


    // for (let i = 0; i < highTemp.length; i++) {
    //     highTemp[i].textContent = response.data.high_temp
    // }
})
