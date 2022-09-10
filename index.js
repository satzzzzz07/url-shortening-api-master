"use strict";

// Mobile Menu Functionality
let isMenuOpen = false;
document.getElementById("mob-menu-btn").addEventListener("click", function () {
  if (isMenuOpen === false) {
    document.getElementById("menu-mobile").classList.remove("hidden");
    isMenuOpen = true;
  } else {
    document.getElementById("menu-mobile").classList.add("hidden");
    isMenuOpen = false;
  }
});
// Array declaration
let arrayLinks = [];

// function Index declaration
let functionIndex = 0;

// function getArrayElements declaration
function getArrayElements(indexValue) {
  navigator.clipboard.writeText(arrayLinks[indexValue]).then(() => {
    document.getElementById(`cpyBTN-${indexValue}`).textContent = "COPIED !";
    document.getElementById(`cpyBTN-${indexValue}`).style.backgroundColor =
      "hsl(257, 27%, 26%)";
  });
}
// Shorten URL Function
document.getElementById("shortenBTN").addEventListener("click", function () {
  const urlValue = document.getElementById("inpEL").value;

  if (urlValue.length > 0) {
    // URL SHortening
    fetch(`https://api.shrtco.de/v2/shorten?url=${urlValue}`,{cache: 'no-cache'})
      .then((response) => response.json())
      .then((data) => {
        // Add links in a array
        arrayLinks.push(data.result.full_short_link);

        // getArrayElements(0);

        // Render HTML
        document.getElementById("container-links").innerHTML += `
          <div id="card-link">
            <h4>${
              urlValue.length > 30 ? urlValue.slice(0, 30) + `...` : urlValue
            }</h4>
            <hr />
            <h4 id="linkFinal">${data.result.full_short_link}</h4>
            <button class="btn cpyBTN" onclick="getArrayElements(${functionIndex})" id="cpyBTN-${functionIndex}">Copy</button>
          </div>
        `;
        functionIndex += 1;
      });
  } else {
    // No Input Error Render
    document.getElementById("inpEL").style.border =
      "3px solid hsl(0, 87%, 67%)";
    placeholderErrorRender();
  }
});

// Error Function for placeholder
function placeholderErrorRender() {
  document.getElementById("inpEL").placeholder = "Please add a Link";
}
