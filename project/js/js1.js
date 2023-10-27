let backgroundop = true;

let backgroundInterval;
// //skills  sector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  if (window.scrollY <= 750) {
    document.querySelectorAll(".skill-progress span").forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};
//localstorage background
let backgroundlocal = localStorage.getItem("background-option");
if (backgroundlocal !== null) {
  document.querySelectorAll(".backGround span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundlocal === "true") {
    backgroundop = true;
    document.querySelector(".backGround .yes").classList.add("active");
  } else {
    backgroundop = false;
    document.querySelector(".backGround .no").classList.add("active");
  }
  }
 
// local storage color
let maincolor = localStorage.getItem("color-option");
if (maincolor !== null) {
  document.documentElement.style.setProperty("--main--color", maincolor);
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === maincolor) {
      element.classList.add("active");
    }
  });
}

// open setting
let setting = document.querySelector(".setting-box svg");
setting.onclick = function () {
  document.querySelector(".setting-box").classList.toggle("open");
};

//color switcher
const colorLi = document.querySelectorAll(".color-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    handeleActiveClass(e);
  });
});

//selecting landing page element
let landingPage = document.querySelector(".landing-page");

let backgrounds = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function radomizeImg() {
  if (backgroundop === true) {
    backgroundInterval = setInterval(() => {
      let rendomNum = Math.floor(Math.random() * backgrounds.length);
      landingPage.style.backgroundImage =
        "url(images/" + backgrounds[rendomNum] + ")";
    }, 5000);
  }
}
radomizeImg();
//background switcher
const background = document.querySelectorAll(".backGround .option-box span");
background.forEach((span) => {
  span.addEventListener("click", (e) => {
    handeleActiveClass(e);
    if (e.target.dataset.background === "yes") {
      backgroundop = true;
      radomizeImg();
      localStorage.setItem("background-option", true);
    } else {
      backgroundop = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
//bullet navigate
let allbullets = document.querySelectorAll(".conta-fixed .bullet");

let links = document.querySelectorAll(".head .links a");
function scrollTOdivs(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTOdivs(allbullets);

scrollTOdivs(links);

//show bullets
let bulletSpan = document.querySelectorAll(".bullets span");
let bulletContainer = document.querySelector(".conta-fixed");
let bulletLocal=localStorage.getItem("bullet-op");
if(bulletLocal!== null){
  bulletSpan.forEach(span=>{
    span.classList.remove("active");

})
if(bulletLocal==="block"){
  
  bulletContainer.style.display = "block";
  document.querySelector(".bullets .yes").classList.add("active");

}
else{
  bulletContainer.style.display = "none";
  
  document.querySelector(".bullets .no").classList.add("active");
}
}
bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletContainer.style.display = "block";
      localStorage.setItem("bullet-op","block");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("bullet-op","none");
    }
    handeleActiveClass(e);
  });
});

//popup image
let ourGallary = document.querySelectorAll("#gallary img");
ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overLay = document.createElement("div");
    overLay.className = "overLay";
    document.body.appendChild(overLay);
    let popUp = document.createElement("div");
    popUp.className = "popUp";
    if (img.alt !== null) {
      let heading = document.createElement("h3");
      let textHeading = document.createTextNode(img.alt);
      heading.appendChild(textHeading);
      popUp.appendChild(heading);
    }
    let popUpImg = document.createElement("img");
    popUpImg.src = img.src;
    popUp.appendChild(popUpImg);
    overLay.appendChild(popUp);
    let closeBtn = document.createElement("span");
    let closeBtntext = document.createTextNode("X");
    closeBtn.appendChild(closeBtntext);
    closeBtn.className = "close-btn";
    popUp.appendChild(closeBtn);
  });
});
document.addEventListener("click", function (e) {
  if (e.target.className === "close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".overLay").remove();
  }
});
//handle active
function handeleActiveClass(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}
//restBtn

document.querySelector(".setting-container .reset").onclick=function(){
  localStorage.clear();
// localStorage.remove("bullet-op");
// localStorage.remove("color-option");

// localStorage.remove("background-option");
window.location.reload();
};