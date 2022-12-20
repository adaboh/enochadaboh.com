//* select all btns

const navLinks = document.querySelectorAll("li:not(:first-of-type) .p-nav__link");
const homePage = document.querySelector(".main-nav__list");

if (!homePage) {
  const currentLocation = location.href;
  const pNavLink = document.querySelectorAll(".p-nav__link");
  for (let i = 0; i < pNavLink.length; i++) {
    const pNavLinkHref = pNavLink[i].href;
    // console.log("pNavLinkHref", i, pNavLinkHref);
    if (currentLocation == pNavLinkHref) {
      pNavLink[i].classList.add("current");
    }
  }
}

// console.log("webpack compiled successfully");

//! Read More - About page code
const buttonReadMore = document.querySelector(".button-readmore");
// const aboutMoreText = document.querySelector(".about__readmore");
let aboutMoreText = document.getElementById("about__readmore");

// console.log(aboutMoreText);

buttonReadMore.addEventListener("click", function () {
  if (aboutMoreText.style.display === "none") {
    buttonReadMore.textContent = "Read Less";
    aboutMoreText.style.display = "block";
  } else {
    buttonReadMore.textContent = "Read More";
    aboutMoreText.style.display = "none";
  }
});
//*[@id="landmark-main"]/div/div[1]/div[7]/div[1]/div/div[3]/div/span/div/text()

// 1768 E 24th Ave, 43219
