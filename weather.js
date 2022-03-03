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
              //console.log("SSSSSSSSSSSSSSSS");

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
        //const { dt } = data;






        //console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = test;
        //document.querySelector(".city").innerText = window.location.search.slice(1).split(',')[0];
        document.querySelector(".country").innerText = country;
        //document.getElementById("country").title = dat[1][0].name;
        //console.log("Country name is : "+ dat[1][0].name);
        //console.log(id);



        const url = "https://openweathermap.org/city/" + id;
        
        document.getElementById("moreinfo").addEventListener("click", function (){

            window.open(url, '-blank');
       
        });









        
        //document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


        // Icons from https://basmilius.github.io/weather-icons/index-fill.html
        document.querySelector(".icon").src = "./data/icons/" + icon + ".svg";

        document.querySelector(".description").innerText = description;
        //this.unitConverter(true);

        if (localStorage.getItem("metric") !== null){
            this.unitConverter(localStorage.metric);

        }else this.unitConverter("true");


        console.log("SSSSSSSS "+localStorage.metric);
        console.log(typeof(localStorage.metric));

        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        //console.log(wind_speed);
        //console.log(speed*3.6);
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
        

        //document.querySelector(".wind_rotation").style.animation = 'arrow 0.6s infinite alternate ease-in-out;';

        //console.log(d);


        //console.log("City name is : " + name);


        //let  url = "https://openweathermap.org/city/" + id;




        // function moreinfo(id){

        //     window.open("https://openweathermap.org/city/" + id);
        //     console.log(id);
        
        // }
          




        //document.addEventListener("click", function(){
            
         //   document.getElementById("country").title = dat.name;
         //   console.log("Country name is : "+ dat.name);

        //  });


        //document.getElementById(".country").setAttribute('title', dat.name).addEventListener()
        //addEventListener("click");
       

        
        //document.querySelector(".country").addEventListener("click", )




        // if (cod == 404 && dat.status == 400){
        //     document.querySelector(".weather").classList.add("loading");

        // }















    },
    search: function () {
        //this.fetchWeather(document.querySelector(".search-bar").value);
        //replace the country part of the String

        let cityName;
        //const cityName = document.getElementById("myInput").value.replace(/ \([\s\S]*?\)/g, '').trim();
        if ( document.getElementById("myInput").value.includes("(") ){
        cityName = document.getElementById("myInput").value
        .substr(0, document.getElementById("myInput").value.lastIndexOf("(")).trim();

        }else cityName = document.getElementById("myInput").value.trim();

        //const cityName = document.getElementById("myInput").value
        //.substr(0, document.getElementById("myInput").value.replace(/\s*\(.*?\)\s*/g, ''));


        //catch the country part of the String
        const countryCode = document.getElementById("myInput").value.replace(/.*\(|\).*/g, '').trim();
        //.match(/\(.*?\)/g);
        //.match(/\((.*)\)/).pop();
        //.match(/\$\d+(?=\))/g);
        //cunstruct the two strings
        
        let checkIfSimiler;
        //let aaa;

        if(cityName==countryCode) {
            checkIfSimiler = cityName;
        }else checkIfSimiler = cityName+ ","+countryCode;
        

        console.log(cityName);
        console.log(countryCode);
        console.log(checkIfSimiler);
        //console.log(aaa);


        this.fetchWeather(checkIfSimiler);
        document.getElementById("myInput").blur();
        location.search = checkIfSimiler.replace(/%20/g, " ");

        //document.getElementById("autocomplete-items").style.display = 'none';
        
        //console.log(document.getElementById("myInput").value.replace(/ *\([^)]*\) */g, "")+"sssss");
        //console.log(document.getElementById("myInput").value.replace(/ \([\s\S]*?\)/g, '').trim()+"sssss");

    },

    unitConverter:function(isMetric){
        //isMetric is used as a String, because the localstorage.metric value cant't be a boolean.
        if(isMetric == "true"){

            //console.log(typeof(isMetric));


            document.querySelector(".temp").innerText = Math.round(temp) + "°";
            document.querySelector(".feelslike").innerText = "Feels Like " +Math.round(feelslike)+ "°";
            document.querySelector(".wind").innerText = "Wind : " + (wind_speed*3.6).toFixed(2) + " km/h";
            console.log(temp);
            console.log(feelslike);
            console.log((wind_speed*3.6).toFixed(2));
            document.getElementById("celsius").style.fontWeight = "950";
            document.getElementById("fahrenheit").style.fontWeight = null;
            //document.getElementById("celsius").setAttribute("style", "cursor:pointer");


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
            //document.getElementById("fahrenheit").setAttribute("style", "cursor:pointer");


            
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

    //localStorage.setItem("metric", "false");
    
    console.log(localStorage.metric);



});


console.log(localStorage.metric);
console.log(typeof(localStorage.metric));


if (localStorage.getItem("darkMode") == null){
    document.getElementById("light_mode").style.display = "none";
    darkMode();

    //localStorage.setItem("darkMode", "true");

    localStorage.darkMode ="true";
    console.log(localStorage.darkMode);
    //console.log(typeof(localStorage.darkMode));
}

if (localStorage.darkMode == "false"){
    document.getElementById("light_mode").style.display = "block";
    lightMode();

    //localStorage.setItem("darkMode", "false");
    localStorage.darkMode ="false";
    //console.log(localStorage.darkMode);
}
if (localStorage.darkMode =="true"){
    document.getElementById("light_mode").style.display = "none";
    darkMode();

    //localStorage.setItem("darkMode", "true");

    localStorage.darkMode ="true";
    console.log(localStorage.darkMode);
    //console.log(typeof(localStorage.darkMode));
}



//document.getElementById("light_mode").style.display = "none";


document.getElementById("light_mode").addEventListener("click", function () {
    darkMode();
    localStorage.darkMode ="true";

});

document.getElementById("dark_mode").addEventListener("click", function () {
    lightMode();
    localStorage.darkMode ="false";

});


function darkMode() {
    //document.getElementById("light_mode").addEventListener("click", function () {


        document.getElementById("bodyId").style.color = "white";
        document.getElementById("bodyId").style.backgroundColor = "#000000b5";
        document.getElementById("light_mode").style.display = "none";
        document.getElementById("dark_mode").style.display = "block";
        document.getElementById("icon").style.setProperty("filter", "drop-shadow(0px 0px 20px #fff)");
        document.getElementById("icon3").style.setProperty("filter", "drop-shadow(0px 0px 20px #fff)");


        


   // });
}

function lightMode() {
    //document.getElementById("dark_mode").addEventListener("click", function () {
        //if (localStorage.darkMode=="true"){



        document.getElementById("bodyId").style.color = "black";
        document.getElementById("bodyId").style.backgroundColor = "#ffffffe8";
        document.getElementById("dark_mode").style.display = "none";
        document.getElementById("light_mode").style.display = "block";
        document.getElementById("icon").style.setProperty("filter", "drop-shadow(0px 0px 20px #00000061)");
        document.getElementById("icon3").style.setProperty("filter", "drop-shadow(0px 0px 20px #00000061)");

       


   // });
}










//function newFunction(id) {
    // document.getElementById("info").onclick = function () {
    //     // Do some processing here, maybe 
    //     window.location = this.href;
    //     // Return false to prevent the default action if you did redirect with script
    //     return false;
    // };

   // window.open("https://openweathermap.org/city/" + id);
//}

//async function getIpApi() {
//   fetch("https://api.db-ip.com/v2/free/self")
//   .then((responseH) => responseH.json())
//   .then((dat) => weather.fetchWeather(dat.countryName));


//var response = await fetch("https://api.db-ip.com/v2/free/self");
//var data = await response.json();
//city = data.city;

//console.log(city);







//  weather.fetchWeather(city.replace(/ \([\s\S]*?\)/g, ''));


//}

//getIpApi();
//weather.fetchWeather("Colombo");
//}

//setInterval(function(){
//location.reload();
//  getIpApi();
//}, 5000);






//data = 0;
async function ipCheck() {

    const res = await fetch('https://ipapi.co/json/');
    const datas = await res.json();

    //  if (window.location.search != ""){

    //      document.getElementById("myInput").value = window.location.search.substr(1).replace(/%20/g, " ");
    //      weather.fetchWeather(document.getElementById("myInput").value.replace(/ \([\s\S]*?\)/g, ''));

    //  }
    //  else {

    if (window.location.search == "") {

        weather.fetchWeather(datas.city.replace(/ \([\s\S]*?\)/g, ''));
        console.log(window.location.search);
    }
    else {

        //weather.search();
        weather.fetchWeather(window.location.search.substr(1).replace(/%20/g, " "));
    }
    

    

    
    //console.log(localStorage.getItem('item'));





    // var url = "https://ipapi.co/json/"
    // fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => weather.fetchWeather(data.city.replace(/ \([\s\S]*?\)/g, '')));

     

    //.then((data) => {const {city} = data});

    //console.log(data.city);
    //url = 0;
    //response.json() = 0;
    //data = 0;
}

ipCheck();



// setInterval(function () {

//     if (document.querySelector(".search-bar").value == null){

//         ipCheck();

//     }

    

// }, 30000);




        //weather.fetchWeather(x.city.replace(/ \([\s\S]*?\)/g, ''));
/*

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var json_obj = JSON.parse(Get("http://www.geoplugin.net/json.gp"));
console.log(json_obj.geoplugin_city);


*/


// componentDidMount(){
//     // console.log(loginEmail)
//       fetch(`http://localhost:9000/api/item/list`,)
//       .then((resp)=>
      
//       {
//         resp.json().then((res)=>{ console.log(res.data); this.setState({data: res.data}); const id = data.id; 
        
        
//         fetch(`http://localhost:9000/api/item/photo/view/${id}`,)
//         .then((resp)=>{ resp.json().then((res)=>{ console.log(res); this.setState({res});}) })

//         })
//       })
//     }

