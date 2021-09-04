var temp;
var feelslike;
var wind_speed;
let weather = {
    
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid=b190a0605344cc4f3af08d0dd473dd25"

        )
            .then((response) => response.json())
            .then((data) => {
            
            fetch("https://restcountries.eu/rest/v2/alpha/" + data.sys.country)
                .then((res) => res.json())
                .then((dat) => this.displayWeather(data, dat));
            
            
            }
            
            );


    },
    displayWeather: function (data ,dat) {


        const { name, id, dt } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { humidity } = data.main;
        temp = data.main.temp;
        feelslike = data.main.feels_like;
        wind_speed = data.wind.speed;
        const { deg } = data.wind;



        document.querySelector(".city").innerText = name;
        document.querySelector(".country").innerText = country;
        document.getElementById("country").title = dat.name;
        

        const url = "https://openweathermap.org/city/" + id;
        
        document.getElementById("moreinfo").addEventListener("click", function (){

            window.open(url, '-blank');
       
        });









        
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        this.unitConverter(true);
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".weather").classList.remove("loading");
        document.querySelector(".dots-cont").style.visibility = "hidden";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + ",city')";


        var date = new Date();
        date.setTime(dt*1000);

        document.querySelector(".date-stamp").innerText = "Weather Data Collected at " +date;
        document.querySelector(".wind_rotation").style.transform = `rotate(${deg-180}deg)`

    },
    search: function () {
        let cityName;
        
        if ( document.getElementById("myInput").value.includes("(") ){
        cityName = document.getElementById("myInput").value
        .substr(0, document.getElementById("myInput").value.lastIndexOf("(")).trim();

        }else cityName = document.getElementById("myInput").value.trim();

        
        const countryCode = document.getElementById("myInput").value.replace(/.*\(|\).*/g, '').trim();
        let checkIfSimiler;


        if(cityName==countryCode) {
            checkIfSimiler = cityName;
        }else checkIfSimiler = cityName+ ","+countryCode;
        

        this.fetchWeather(checkIfSimiler);
        document.getElementById("myInput").blur();
        location.search = checkIfSimiler.replace(/%20/g, " ");


    },

    unitConverter:function(isMetric){
        if(isMetric){

            document.querySelector(".temp").innerText = Math.round(temp) + "°";
            document.querySelector(".feelslike").innerText = "Feels Like " +Math.round(feelslike)+ "°";
            document.querySelector(".wind").innerText = "Wind : " + (wind_speed*3.6).toFixed(2) + " km/h";
            document.getElementById("celsius").style.fontWeight = "950";
            document.getElementById("fahrenheit").style.fontWeight = null;


        }
        else{
            var tem = (temp*(1.8)) + 32;
            var feels = (feelslike*(1.8)) + 32;
            document.querySelector(".temp").innerText = Math.round(tem) + "°";
            document.querySelector(".feelslike").innerText = "Feels Like " +Math.round(feels)+ "°";
            document.querySelector(".wind").innerText = "Wind : " + ((wind_speed*3.6)/1.609).toFixed(2) + " mph";
            document.getElementById("fahrenheit").style.fontWeight = "950";
            document.getElementById("celsius").style.fontWeight = null;

        }

    },
    
};



document
    .getElementById("myInput")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

    document
    .querySelector("button")
    .addEventListener("click", function () {
        weather.search();
    });

document.getElementById("celsius")
    .addEventListener("click", function (){
    weather.unitConverter(true);

});
document.getElementById("fahrenheit").addEventListener("click", function(){
    weather.unitConverter(false);

});


async function ipCheck() {

    const res = await fetch('https://ipapi.co/json/');
    const datas = await res.json();
    
    if (window.location.search == "") {

        weather.fetchWeather(datas.city.replace(/ \([\s\S]*?\)/g, ''));
        console.log(window.location.search);
    }
    else {

        weather.fetchWeather(window.location.search.substr(1).replace(/%20/g, " "));
    }
    
}

ipCheck();


