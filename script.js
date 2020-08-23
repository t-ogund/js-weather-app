const submitButton = document.getElementById("submit");
const inputData = document.getElementById("input-data");
const day = document.getElementsByClassName("day");
const highTemp = document.getElementsByClassName("high-temp");
const lowTemp = document.getElementsByClassName("low-temp");
const condition = document.getElementsByClassName("condition");
const imgSection = document.getElementsByClassName("img-section");
const date = document.getElementsByClassName("date");
const narrative = document.getElementsByClassName("narrative");
const icon = document.getElementsByClassName("icon");

submitButton.addEventListener("click", function() {
    event.preventDefault()
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&units=I&postal_code=${inputData.value}&country=US&key=ec69804a082347b592321d0caf2b15cb`)
    .then(response => response.json())
    .then(response => {
        const fiveDayForecast = response.data.slice(0, 5)
        console.log(fiveDayForecast)

        for (let i = 0; i < highTemp.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                highTemp[i].textContent = Math.floor(fiveDayForecast[i].high_temp) + " /"
            }
        }

        for (let i = 0; i < lowTemp.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                lowTemp[i].textContent = Math.floor(fiveDayForecast[i].low_temp) 
            }
        }

        for (let i = 0; i < condition.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                condition[i].textContent = fiveDayForecast[i].weather.description
            }
        }

        for (let k = 0; k < date.length; k++) {
            console.log(date[k])
            for (let l = 0; l < fiveDayForecast.length; l++) {
                const formattedDate = fiveDayForecast[k].datetime.slice(6)
                
                console.log(formattedDate.replace("-", "/"))
                date[k].textContent = formattedDate.replace("-", "/");
            }

        }

        for (let i = 0; i < narrative.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                const windSpeed = Math.floor(fiveDayForecast[i].wind_spd)
                console.log(windSpeed)

                const windDirection = fiveDayForecast[i].wind_cdir_full
                console.log(windDirection)

                narrative[i].textContent = `${windSpeed} MPH winds from the ${windDirection}`
            }
        }

        // for (let i = 0; i < icon.length; i++) {
        //     for (let j = 0; j < fiveDayForecast.length; j++) {
        //         console.log(icon[i])
        //         icon[i].textContent = fiveDayForecast[i].weather.icon
        //     }
        // }

       for (let i = 0; i < imgSection.length; i++) {
           console.log(imgSection[i])
           for (let j = 0; j < fiveDayForecast.length; j++) {
            console.log(fiveDayForecast[i].weather.icon)
            imgSection[i].style.backgroundImage = `url("icons/icons/${fiveDayForecast[i].weather.icon}.png")`
           }
       }
    })


    console.log(inputData.value)


    // for (let i = 0; i < highTemp.length; i++) {
    //     highTemp[i].textContent = response.data.high_temp
    // }
})