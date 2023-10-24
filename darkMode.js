// //darkmode:-

let darkMode = localStorage.getItem("darkMode");

// const darkModeToggle = document.querySelector("#dark-mode-toggle");
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeID = document.getElementById('this-btn');
var darkModeCheck = document.getElementById('theme');
var stroke = document.getElementsByClassName('swap-on');

const enableDarkMode = () =>{
    stroke.stroke = "white";
    darkModeCheck.checked = true;
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode", "enabled");

};

const disableDarkMode = () => {
    stroke.stroke = "currentColor";
    darkModeCheck.checked = false;
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkMode", null);

};

if(darkMode === "enabled"){
    darkModeCheck.checked = true;
    enableDarkMode();
}

function changeTheme(){
    darkMode = localStorage.getItem("darkMode");

    if(darkMode !== "enabled"){

        enableDarkMode();
        // console.log(darkMode); 
    }
    else{
        
        disableDarkMode();
        // console.log(darkMode);
    }
}

darkModeToggle.addEventListener("click", () => {
    changeTheme();
});


darkModeID.addEventListener("click", () => {
    changeTheme();
});
