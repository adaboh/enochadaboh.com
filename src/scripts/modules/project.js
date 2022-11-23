//* select all btns

// const navLinks = document.querySelectorAll("li:not(:first-of-type) .p-nav__link");
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
