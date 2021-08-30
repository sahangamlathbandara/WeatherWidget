function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  var mousemoving = false;

  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    var u = 0;

    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;

    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    a.setAttribute("onclick", "weather.search()");
    //a.setAttribute("style", "position:absolute");


    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);

    console.log(arr.some(e => e.includes(val)));
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {


      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() 
      //| (arr[i].toUpperCase()).includes(val.toUpperCase())
      ) {
        
        //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "div-list");
        b.setAttribute("id", u);
        u = u+1;
        /*make the matching letters bold:*/
        //b.innerHTML = '<i class="fa fa-map-marker fa_custom">';
        b.innerHTML = 
        "<span class='material-icons' style='font-size:18px'>place</span><span class='city-span'><strong>  " 
        //"<i class='fa fa-map-marker'></i><span class='city-span'><strong>  " 
        //"<div class='abc'><i class='fa fa-map-marker'></i></div><div class='aaa'><strong>  " 
        + arr[i].substr(0, val.length) + 
        "</strong>" 
        +arr[i].substr(val.length)
        "</span>"
        //<input style='border-radius:20px' type='hidden' value='" 
        //+ arr[i] + 
        //"'>";
        //b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input style='border-radius:20px' type='hidden' value='" + arr[i] + "'>";
        //b.innerHTML += "</div>";
        
        

        /*b.onmouseover = function(e) { 
          console.log("Hover!"); 
          mousemoving = true;
          //removeActive(b.getElementsByClassName("div-list"));
          console.log(e.target.id);
          currentFocus = e.target.id;





          */
          // if ( b.classList.contains('autocomplete-active') ){
          //   console.log("yessss");

          // }else console.log(b);

          //console.log(document.getElementById(currentFocus).classList.add("autocomplete-test"));
          //console.log(document.getElementById(e.target.id))
          //console.log(document.getElementById(currentFocus).classList)
          //.remove("autocomplete-active");

          //ddd = document.getElementsByTagName("input")[0].value;
          //var x = document.getElementById(this.id + "autocomplete-list");
        //if (x) x = x.getElementsByTagName("div");
          //removeActive(ddd);
      //}


     // a.onmouseleave = function(){
      //  console.log("Mouse Leaved");
      //  mousemoving = false;
     // }

      



        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      //if (x[currentFocus]) {
      //x[currentFocus+1].scrollIntoView(true);
      //}
      
      

      currentFocus++;
      //mousemoving = false;

      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      // if(currentFocus <= x.length-1){
      //   x[currentFocus].scrollIntoView(true);
      // }
  
      currentFocus--;
      
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });


  



  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    //if (currentFocus >= x.length) currentFocus = 0;
    //if (currentFocus = x.length) currentFocus = 0;
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    console.log(currentFocus);


    // document.getElementsByClassName("div-list").onmouseleave = function(e) { 
    //   x[currentFocus].classList.add("autocomplete-active");

    // }

    // document.getElementsByClassName("div-list").onmouseover = function(e) { 
    //   x[currentFocus].classList.add("autocomplete-test");

    // }


    // if (!document.getElementsByClassName('autocomplete-items div:hover').length){
    //   //class not there
    //   x[currentFocus].classList.remove("autocomplete-active");
    // }
    // else{
    // //class there
    // x[currentFocus].classList.add("autocomplete-test");

    // }




    x[currentFocus].classList.add("autocomplete-active");




    //if (currentFocus > x.length) currentFocus = 0;
    //x[currentFocus].scrollIntoView(true);
    //x[currentFocus].scrollIntoViewIfNeeded(true);
    x[currentFocus].scrollIntoView( {behavior: 'auto', block: "nearest"} );
    //{block: "start", inline: "nearest"}
    //x[currentFocus].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });

//   document.getElementById(this.id + "autocomplete-list")..addEventListener("mouseover", function( event ) {
//       console.log("hovered")
//       // do what you want to do here
// }, false);

//document.getElementById("mylink").onmouseout  = function() { alert("Out!"); }





}

/*An array containing all the country names in the world:*/
var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];


async function searchText() {
  const res = await fetch('./data/current.city.list.json');
  const states = await res.json();
  let results = states.map(obj => `${obj.name} (${obj.country})`);
  //let rearangedArray = [...new Set(results)];
  //let results = states.map(a => a.name);
  //console.log(rearangedArray);
  autocomplete(document.getElementById("myInput"), results);

  //return states;
};


//const x = Object.entries(test);
//let result = test.map(a => a.name);
searchText();
let result = test.map(obj => `${obj.name} (${obj.capital})`);
let uniqueChars = [...new Set(result)];



/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
//autocomplete(document.getElementById("myInput"), searchText());

