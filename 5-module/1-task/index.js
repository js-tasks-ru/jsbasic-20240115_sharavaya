function hideSelf() {
 
  let hiddenButton = document.querySelector(".hide-self-button");
  hiddenButton.addEventListener("click", function (event) {
    event.currentTarget.setAttribute("hidden", true);
  });
  
}
