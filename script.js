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
const card = document.getElementsByClassName("card");

submitButton.addEventListener("click", function() {
    event.preventDefault()
    
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&units=I&postal_code=${inputData.value}&country=US&key=ec69804a082347b592321d0caf2b15cb`)
    .then(response => response.json())
    .then(response => {
        const fiveDayForecast = response.data.slice(0, 5)
        console.log(fiveDayForecast)

        inputData.value = "";

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

        for (let i = 0; i < day.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                const ymd = fiveDayForecast[j].datetime
                console.log(ymd)
                const workingOnDate = moment(ymd);
                const dow = workingOnDate.day()
                console.log(dow)

                if (dow === 0) {
                    day[j].textContent = "Sunday";
                } else if (dow === 1) {
                    day[j].textContent = "Monday";
                } else if (dow === 2) {
                    day[j].textContent = "Tuesday";
                } else if (dow === 3) {
                    day[j].textContent = "Wednesday";
                } else if (dow === 4) {
                    day[j].textContent = "Thursday";
                } else if (dow === 5) {
                    day[j].textContent = "Friday";
                } else {
                    day[j].textContent = "Saturday";
                } 
            } 
        }

        for (let i = 0; i < narrative.length; i++) {
            for (let j = 0; j < fiveDayForecast.length; j++) {
                const windSpeed = Math.floor(fiveDayForecast[i].wind_spd)
 
                const windDirection = fiveDayForecast[i].wind_cdir_full

                narrative[i].textContent = `${windSpeed} MPH winds from the ${windDirection}`
            }
        }

       for (let i = 0; i < imgSection.length; i++) {
        //    console.log(imgSection[i])
           for (let j = 0; j < fiveDayForecast.length; j++) {
            // console.log(fiveDayForecast[i].weather.icon)
            imgSection[i].style.backgroundImage = `url("icons/icons/${fiveDayForecast[i].weather.icon}.png")`
           }
       }
    })

    for (let i = 0; i < card.length; i++) {
        card[i].style.display = "block";
    }
})