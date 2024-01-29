// active hamburger menu 
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click",()=>{
  menuIcon.classList.toggle("active");
  navlist.classList.toggle("active");
  document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click",()=>{
  navlist.classList.remove("active");
  menuIcon.classList.remove("active");
  document.body.classList.remove("open");
})

// switch between about buttons 

const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    contents.forEach(content => content.style.display = 'none');
    contents[index].style.display = 'block';
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// portfolio fillter 

var mixer = mixitup('.portfolio',{
  selectors: {
    target: '.portfolio-box'
  },
  animation: {
    duration: 500
  }
});

// Initialize swiperjs 

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay:{
    delay:3000,
    disableOnInteraction:false,
  },

  breakpoints: {
    576:{
      slidesPerView:2,
      spaceBetween:10,
    },
    1200:{
      slidesPerView:3,
      spaceBetween:20,
    },
  }
});

//   skill Progress bar 

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll",()=>{
  if(!skillsPlayed)
  skillsCounter();
})


function hasReached(el){
  let topPosition = el.getBoundingClientRect().top;
  if(window.innerHeight >= topPosition + el.offsetHeight)return true;
  return false;
}

function updateCount(num,maxNum){
  let currentNum = +num.innerText;
  
  if(currentNum < maxNum){
    num.innerText = currentNum + 1;
    setTimeout(()=>{
      updateCount(num,maxNum)
    },12)
  }
}


let skillsPlayed = false;

function skillsCounter(){
  if(!hasReached(first_skill))return;
  skillsPlayed = true;
  sk_counters.forEach((counter,i)=>{
    let target = +counter.dataset.target;
    let strokeValue = 465 - 465 * (target / 100);

    progress_bars[i].style.setProperty("--target",strokeValue);

    setTimeout(()=>{
      updateCount(counter,target);
    },400)
  });

  progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}

// side progress bar 

let calcScrollValue = ()=>{
  let scrollProgress = document.getElementById("progress");
  let pos = document.documentElement.scrollTop;

  let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100)/calcHeight);
  
  if(pos > 100){
    scrollProgress.style.display = "grid";
  }else{
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click",()=>{
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu(){
  let len = section.length;
  while(--len && window.scrollY + 97 < section[len].offsetTop){}
  menuLi.forEach(sec => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll",activeMenu);


// // Email connect
// src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">

// (function(){
//   emailjs.init("user_gXeV0nUT7NGxVTLulkZvI");
// })();

// Email
function sendMail() {
  var params = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_dxpqdmg";
  const templateID = "template_k8v4nhw";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
      document.getElementById("first_name").value = "";
      document.getElementById("last_name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Your message sent successfully!!")

    })
    .catch(err=>console.log(err));

}


// scroll reveal

ScrollReveal({ 
  distance:"90px",
  duration:2000,
  delay:200,
  // reset: true ,
});


ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio,.blog-box,footer,.img-hero', { origin: "bottom" });

