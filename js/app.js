//connection variable 
var isoffline = false;
// Required element to set
var weatherIconElement = document.querySelector('.weatherIcon img');
var weatherTextElement = document.querySelector('.weatherText');
var socialBarBtn = document.querySelector('.social-wrapper');

// setup     
//updating default after Dom element lodeds

    updateTime();
    updateDate();
    checkInternet();
    updateWeather();
    UpdateQuote();



// Event Listener
document.querySelector('.hideBtn').addEventListener('click', hideSocialBar)

//socail Bar


//updating time every second
setInterval(() => {
    updateTime();
}, 1000);

//check internet connection in every 2 second
setInterval(() => {
    checkInternet();
}, 2000);




//variabele
//icons functionallity
var setTimeIcon = 'morning';
var setweatherIcon = 'clear'
var TimeMessage = 'Good Morning';
var weatherStatus = 'clear';
var timeStatus = 'morning';
var hour = new Date().getHours();





// event Lister
////////////////////////////////functions



function checkInternet() {

    if (!navigator.onLine) {
        offlineBackground();
        offlineWeather();
        isoffline = true;
    }
    if (isoffline == navigator.onLine) {
        isoffline = false;
        updateWeather();
    }
}

//date updating funtion
function updateDate() {
    var MyDate= new Date();
    var fullDate= MyDate.getDate() +"/"+ MyDate.getMonth() +"/"+ MyDate.getFullYear();
    var dateElement = document.querySelector(".date span");
    dateElement.innerHTML= fullDate;
}

//time updating function
function updateTime() {
    var myTime= new Date();
    var timeData = myTime.getHours() + ":" + myTime.getMinutes() + ":" + myTime.getSeconds()
    //checking is last hour is changed
    if (hour != myTime.getHours()) {
        hourUpdate();
    }
    var timeElement = document.querySelector(".time span");
    timeElement.innerHTML = timeData;
    //update date when hourse get 24
    if (myTime.getHours == 0){
        updateDate();
    }
}
//updating background
function updateBackground(status) {
    hourUpdate()
   

    if ( status == "Partly cloudy" && timeStatus == 'morning') {
        document.body.style.background = "url(Images/background/morning-cloudy.jpg)";
    }
    else if ( status == "Partly cloudy" && timeStatus == 'noon') {
        
        document.body.style.background = "url(Images/background/noon-cloudy.jpg)";
    }
    else if ( status == "Partly cloudy" && timeStatus == 'night') {
     
        document.body.style.background = "url(Images/background/night-cloudy.jpg)";
    }
    else if ( status == "Moderate or heavy rain shower" && timeStatus == 'morning') {
        
        document.body.style.background = "url(Images/background/morning-rainny.jpg)";
    }
    else if ( status == "Moderate or heavy rain shower" && timeStatus == 'noon') {
     
        document.body.style.background = "url(Images/background/noon-rainny.jpg)";
    }
    else if ( status == "Moderate or heavy rain shower" && timeStatus == 'night') {
    
        document.body.style.background = "url(Images/background/night-rainny.jpg)";
    }//
    else if ( timeStatus == 'morning') {
        
        document.body.style.background = "url(Images/background/morning-clear.jpg)";
    }
    else if (timeStatus == 'noon') {
     
        document.body.style.background = "url(Images/background/noon-clear.jpg)";
    }
    else if (timeStatus == 'night') {
    
        document.body.style.background = "url(Images/background/night-clear.png)";
    }
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}


// weather updating
function updateWeather(){ 
    fetch('http://api.weatherapi.com/v1/current.json?key=9245c429cb4e48ad8bb71343202309&q=Dhaka')
    .then(responsive => responsive.json())
    .then(data =>{
        weatherTextElement.textContent = data.current.temp_c + '°C';
        weatherStatus  = data.current.condition.text;
        var iconPath = data.current.condition.icon;
        if (iconPath.charAt(0) == '/'|| iconPath.charAt(1) == '/') {
            iconPath = 'https://' + iconPath.slice(2)
        }
       weatherIconElement.src = iconPath;
      updateBackground(weatherStatus);
    })
}


//updating date time icon and background 
function hourUpdate() {
    var hour = new Date().getHours();
    var dateTimeElement = document.querySelector('.timeIcon img');
    var messageElement = document.querySelector('.timeTitle h2')
    if (hour >= 6 && hour < 13) {
        dateTimeElement.src = "Images/icons/morning.png";
        messageElement.innerHTML ='have a nice day, sir!';
        timeStatus = 'morning';
    }
    else if (hour >= 13 && hour <= 18) {
        dateTimeElement.src = "Images/icons/noon.png";
        messageElement.innerHTML ="how your's day going, sir?";
        timeStatus = 'noon';
        
    }
    else if (hour >= 18 || hour <= 6 ) {
        dateTimeElement.src = "Images/icons/night.png";
        messageElement.innerHTML ='have a sweet Dream, sir!';
        timeStatus = 'night';

    }
    else{
        console.log('time miss match');
    }
}

// socail bar hide section
function hideSocialBar() {
    socialBarBtn.classList.toggle('social-hide');
   
}


//offline profiles

function offlineBackground() {
    hourUpdate();
    if ( timeStatus == 'morning') {
        document.body.style.background = "url(Images/background/morning.jpg)";
    }
    else if ( timeStatus == 'noon') {
        document.body.style.background = "url(Images/background/noon.jpg)";
    }
    else if ( timeStatus == 'night') {
        document.body.style.background = "url(Images/background/night.jpg)";
    }
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}
function offlineWeather() {
    var weatherIconElement = document.querySelector('.weatherIcon img');
    var weatherTextElement = document.querySelector('.weatherText');
    weatherIconElement.src = "Images/icons/no-wifi.png";
    weatherTextElement.innerHTML = "No Internet!"
}

// updating quotes
function UpdateQuote(){
    var quotes = {
        1: {
            'quote':  '“Talk is cheap. Show me the code.”',
            'author': '― Linus Torvalds'
        },
        2: {
            'quote':  '““Any fool can write code that a computer can understand. Good programmers write code that humans can understand.””',
            'author': '― Martin Fowler'
        },
        3: {
            'quote':  "“I'm not a great programmer; I'm just a good programmer with great habits.”",
            'author': '― Kent Beck'
        },
        4: {
            'quote':  '“Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.”',
            'author': '― Muhammad Waseem'
        },
        5: {
            'quote':  "“A language that doesn't affect the way you think about programming is not worth knowing.”",
            'author': '― Alan J. Perlis'
        },
        6: {
            'quote':  '“The most disastrous thing that you can ever learn is your first programming language.”',
            'author': '― Alan Kay'
        },
        7: {
            'quote':  '“Perl – The only language that looks the same before and after RSA encryption.”',
            'author': '― Keith Bostic'
        },
        8: {
            'quote':  '“Websites promote you 24/7: No employee will do that.”',
            'author': '― Paul Cookson'
        },
        9: {
            'quote':  '“A successful website does three things: It attracts the right kinds of visitors. Guides them to the main services or product you offer. Collect Contact details for future ongoing relation.”',
            'author': '― Mohamed Saad'
        },
        10: {
            'quote':  '“Website without visitors is like a ship lost in the horizon.”',
            'author': '― Dr. Christopher Dayagdag'
        },
        11: {
            'quote':  '“Web design is not just about creating pretty layouts. It’s about understanding the marketing challenge behind your business.”',
            'author': '― Mohamed Saad'
        },
        12: {
            'quote':  '“Being first in the search result organically in Google is the dream of all website owners.”',
            'author': '― Dr. Chris Dayagdag'
        },
        13: {
            'quote':  '“It is not enough for code to work.”',
            'author': '― Robert C. Martin'
        },
        14: {
            'quote':  '“Everyday life is like programming, I guess. If you love something you can put beauty into it.”',
            'author': '― Donald Knuth'
        },
        15: {
            'quote':  '“For every minute you are angry you lose sixty seconds of happiness.”',
            'author': '― Ralph Waldo Emerson '
        },
        16: {
            'quote':  '“Time you enjoy wasting is not wasted time.”',
            'author': '― Marthe Troly-Curtin, Phrynette Married'
        },
        17: {
            'quote':  "“I'm a programmer. I like programming. And the best way I've found to have a positive impact on code is to write it.”",
            'author': '― Robert C. Martin'
        },18: {
            'quote':  '“Think twice, code once.”',
            'author': '― Waseem Latif'
        }

        

    }
    var randomNum = Math.floor((Math.random() * 18) + 1);
    document.querySelector('.quote').textContent= quotes[randomNum].quote
    document.querySelector('.quote-author').textContent= quotes[randomNum].author;
}