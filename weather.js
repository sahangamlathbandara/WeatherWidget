var temp;
var feelslike;
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
                .then((dat) => this.dispalyWeather(data, dat));
            
            
            }
            
            );


    },
    dispalyWeather: function (data ,dat) {


        const { name, id } = data;
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { humidity } = data.main;
        temp = data.main.temp;
        feelslike = data.main.feels_like;
        const { speed } = data.wind;
        const { dt } = data;

        //console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = name;
        document.querySelector(".country").innerText = country;
        document.getElementById("country").title = dat.name;
        //console.log("Country name is : "+ dat.name);
        //console.log(id);



        const url = "https://openweathermap.org/city/" + id;
        
        document.getElementById("moreinfo").addEventListener("click", function (){
        //     //window.history.replaceState({}, '', '/dashboard');
        //     //localStorage.clear();
        //     document.getElementById("info").href = "https://openweathermap.org/city/" + id;
        //     newFunction(id);
        //console.log(url);

        window.open(url, '-blank');
        //     //console.log(id);
            

        });









        
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        this.tempConvert(true);
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind : " + (speed*3.6).toFixed(2) + " km/h";
        console.log(speed);
        console.log(speed*3.6);
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + ",city')";


        var d = new Date();
        d.setTime(dt*1000);

        document.querySelector(".date-stamp").innerText = "Weather Data Collected at "+d;
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


    },
    search: function () {
        //this.fetchWeather(document.querySelector(".search-bar").value);
        //replace the country part of the String
        const x = document.getElementById("myInput").value.replace(/ \([\s\S]*?\)/g, '').trim();
        //catch the country part of the String
        const y = document.getElementById("myInput").value
        //.match(/\(.*?\)/g);
        //.match(/\((.*)\)/).pop();
        .replace(/.*\(|\).*/g, '').trim();
        //.match(/\$\d+(?=\))/g);
        //cunstruct the two strings
        
        let z;
        let aaa;

        if(x==y) {
            z = x;
        }else z = x+ ","+y;
        

        console.log(x);
        console.log(y);
        console.log(z);
        //console.log(aaa);

        this.fetchWeather(z);
        //document.querySelector(".search-bar").blur();
        console.log(document.getElementById("myInput").value.replace(/ *\([^)]*\) */g, "")+"sssss");
        console.log(document.getElementById("myInput").value.replace(/ \([\s\S]*?\)/g, '').trim()+"sssss");

    },

    tempConvert:function(isCelsius){
        if(isCelsius){

            document.querySelector(".temp").innerText = Math.round(temp) + "°";
            document.querySelector(".feelslike").innerText = "Feels Like " +Math.round(feelslike)+ "°";
            console.log(temp);
            console.log(feelslike);
            document.getElementById("celsius").style.fontWeight = "950";
            document.getElementById("fahrenheit").style.fontWeight = null;
            //document.getElementById("celsius").setAttribute("style", "cursor:pointer");


        }
        else{
            var tem = (temp*(1.8)) + 32;
            var feels = (feelslike*(1.8)) + 32;
            document.querySelector(".temp").innerText = Math.round(tem) + "°";
            document.querySelector(".feelslike").innerText = "Feels Like " +Math.round(feels)+ "°";
            console.log(tem);
            console.log(feels);
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
        }
    });

    document
    .querySelector("button")
    .addEventListener("click", function () {
        weather.search();
    });

document.getElementById("celsius")
    .addEventListener("click", function (){
    weather.tempConvert(true);

});
document.getElementById("fahrenheit").addEventListener("click", function(){
    weather.tempConvert(false);

});




   


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
function ipCheck() {
    var url = "https://ipapi.co/json/"
    fetch(url)
        .then((response) => response.json())
        .then((data) => weather.fetchWeather(data.city.replace(/ \([\s\S]*?\)/g, '')));

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

