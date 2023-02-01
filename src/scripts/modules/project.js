//* select all btns

const navLinks = document.querySelectorAll("li:not(:first-of-type) .p-nav__link");
const homePage = document.querySelector(".main-nav__list");

// console.log("webpack compiled successfully");

//! Default or common footer accross pages
/* ref: https://stackoverflow.com/questions/18712338/make-header-and-footer-files-to-be-included-in-multiple-html-pages */

const footerTemplate = `
      <div class="container">
        <div class="row row-1">
          <div class="six columns">
            <p class="footer--text">Living Each Day Blessed &amp; Fulfiled</p>
            <p class="footer--copyright">&copy; KAY, 2020&#8211;Today &verbar; <strong>All Rights Reserved.</strong> </p>
          </div>

          <div class="six columns">
            <div class="footer__social">
              <a href="#!" class="btn btn--footer">
                <svg class="icon icon--footer">
                  <use href="./images/sprites.svg#icon-linkedin2"></use>
                </svg>
              </a>
              <a href="#!" class="btn btn--footer">
                <svg class="icon icon--footer">
                  <use href="./images/sprites.svg#icon-twitter"></use>
                </svg>
              </a>
              <a href="#!" class="btn btn--footer">
                <svg class="icon icon--footer">
                  <use href="./images/sprites.svg#icon-github"></use>
                </svg>
              </a>
            </div>

            <p>
              Built with
              <a href="http://getskeleton.com/" class="uses__link" target="_blank">Skeleton CSS</a>
              & Hosted on
              <a href="https://www.netlify.com/" class="uses__link" target="_blank">Netlify</a>
            </p>
          </div>
        </div>
</div>`;

const mainContainer = document.querySelector("main.container");
// console.log(mainContainer);
const footer = document.createElement("footer");
footer.classList.add("footer");
footer.innerHTML = footerTemplate;
// console.log(footer);
// console.log(mainContainer);
// mainContainer.parentNode.insertBefore(footer, footer.nextSibling);

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

  mainContainer.parentNode.insertBefore(footer, footer.nextSibling);
}

//! Read More - About page code
