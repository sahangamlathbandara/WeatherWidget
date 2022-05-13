var temp;
var feelslike;
var wind_speed;
var input  = document.getElementById("myInput").value.trim();
let weather = {
    
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid=b190a0605344cc4f3af08d0dd473dd25"

        )
            .then((response) => response.json())
            .then((data) => { this.displayWeather(data, data.name)
            
            })
            .catch(() => {
            

              fetch('https://nominatim.openstreetmap.org/search?q='

              +window.location.search.slice(1)+
              
              '&format=geojson')

                .then((respo) => respo.json())
                .then((dal) => {

                    //console.log(dal.features[0].geometry.coordinates[1]);
                    fetch(
                        "https://api.openweathermap.org/data/2.5/weather?lat="
                        +dal.features[0].geometry.coordinates[1]+
                        "&lon="
                        +dal.features[0].geometry.coordinates[0]+
                        "&units=metric&appid=b190a0605344cc4f3af08d0dd473dd25"
            
                    )
                        .then((resp) => resp.json())
                        .then((da) => this.displayWeather(
                            da, 
                            dal.features[0].properties.display_name.split(',')[0]));

                }
                
                    );

            });

    },
    displayWeather: function (data, test) {


        const { name, id, dt } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { humidity } = data.main;
        temp = data.main.temp;
        feelslike = data.main.feels_like;
        wind_speed = data.wind.speed;
        const { deg } = data.wind;
     
        document.querySelector(".city").innerText = test;
        document.querySelector(".country").innerText = country;
      
        const url = "https://openweathermap.org/city/" + id;
        
        document.getElementById("moreinfo").addEventListener("click", function (){

            window.open(url, '-blank');
       
        });



        // Icons from https://basmilius.github.io/weather-icons/index-fill.html
        document.querySelector(".icon").src = "./data/icons/" + icon + ".svg";

        document.querySelector(".description").innerText = description;
  

        if (localStorage.getItem("metric") !== null){
            this.unitConverter(localStorage.metric);

        }else this.unitConverter("true");


        console.log("SSSSSSSS "+localStorage.metric);
        console.log(typeof(localStorage.metric));

        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
       
        document.querySelector(".weather").classList.remove("loading");
        document.querySelector(".dots-cont").style.visibility = "hidden";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + ",city')";


        var date = new Date();
        date.setTime(dt*1000);

        document.querySelector(".date-stamp").innerText = "Weather Data Collected at " +date;


        if (deg != 0){
            document.querySelector(".wind_rotation").style.transform = `rotate(${deg-180}deg)` 
            document.querySelector(".wind_rotation").title = deg-180 + "°";
        }
        else {
            document.querySelector(".wind_rotation").style.display = "none";

        }
        


    },
    search: function () {
     
        //replace the country part of the String

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
        

        console.log(cityName);
        console.log(countryCode);
        console.log(checkIfSimiler);
   
        this.fetchWeather(checkIfSimiler);
        document.getElementById("myInput").blur();
        location.search = checkIfSimiler.replace(/%20/g, " ");


    },

    unitConverter:function(isMetric){
        //isMetric is used as a String, because the localstorage.metric value cant't be a boolean.
        if(isMetric == "true"){

            document.querySelector(".temp").innerText = Math.round(temp) + "°";
            document.querySelector(".feelslike").innerText = "Feels Like " +Math.round(feelslike)+ "°";
            document.querySelector(".wind").innerText = "Wind : " + (wind_speed*3.6).toFixed(2) + " km/h";
            console.log(temp);
            console.log(feelslike);
            console.log((wind_speed*3.6).toFixed(2));
            document.getElementById("celsius").style.fontWeight = "950";
            document.getElementById("fahrenheit").style.fontWeight = null;
        

        }
        //isMetric is used as a String, because the localstorage.metric value cant't be a boolean.
        if(isMetric == "false"){
            var tem = (temp*(1.8)) + 32;
            var feels = (feelslike*(1.8)) + 32;
            document.querySelector(".temp").innerText = Math.round(tem) + "°";
            document.querySelector(".feelslike").innerText = "Feels Like " +Math.round(feels)+ "°";
            document.querySelector(".wind").innerText = "Wind : " + ((wind_speed*3.6)/1.609).toFixed(2) + " mph";
            console.log(tem);
            console.log(feels);
            console.log(((wind_speed*3.6)/1.609).toFixed(2));
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
            console.log(document.getElementById("myInput").value)
        }
    });

    document
    .querySelector("button")
    .addEventListener("click", function () {
        weather.search();
        console.log(document.getElementById("myInput").value)

    });

document.getElementById("celsius")
    .addEventListener("click", function (){
    weather.unitConverter("true");

    //localStorage.setItem("metric", "true");
    localStorage.metric = "true";
    console.log(localStorage.metric);


});
document.getElementById("fahrenheit").addEventListener("click", function(){

    localStorage.metric = "false";
    weather.unitConverter("false");
    
    console.log(localStorage.metric);


});


console.log(localStorage.metric);
console.log(typeof(localStorage.metric));


if (localStorage.getItem("darkMode") == null){
    document.getElementById("light_mode").style.display = "none";
    darkMode();


    localStorage.darkMode ="true";
    console.log(localStorage.darkMode);

}

if (localStorage.darkMode == "false"){
    document.getElementById("light_mode").style.display = "block";
    lightMode();

    localStorage.darkMode ="false";
   
}
if (localStorage.darkMode =="true"){
    document.getElementById("light_mode").style.display = "none";
    darkMode();

    localStorage.darkMode ="true";
    console.log(localStorage.darkMode);
  
}


document.getElementById("light_mode").addEventListener("click", function () {
    darkMode();
    localStorage.darkMode ="true";

});

document.getElementById("dark_mode").addEventListener("click", function () {
    lightMode();
    localStorage.darkMode ="false";

});


function darkMode() {

        document.getElementById("bodyId").style.color = "white";
        document.getElementById("bodyId").style.backgroundColor = "#000000b5";
        document.getElementById("light_mode").style.display = "none";
        document.getElementById("dark_mode").style.display = "block";
        document.getElementById("icon").style.setProperty("filter", "drop-shadow(0px 0px 20px #fff)");
        document.getElementById("icon3").style.setProperty("filter", "drop-shadow(0px 0px 20px #fff)");

}

function lightMode() {

        document.getElementById("bodyId").style.color = "black";
        document.getElementById("bodyId").style.backgroundColor = "#ffffffe8";
        document.getElementById("dark_mode").style.display = "none";
        document.getElementById("light_mode").style.display = "block";
        document.getElementById("icon").style.setProperty("filter", "drop-shadow(0px 0px 20px #00000061)");
        document.getElementById("icon3").style.setProperty("filter", "drop-shadow(0px 0px 20px #00000061)");

}


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
