const form = document.querySelector("form");
const input = document.querySelector("input");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Form submitted");
  
  // Check if the browser supports service workers
  if ('serviceWorker' in navigator) {
    window.navigator.serviceWorker.register("/lab.js", {
      scope: '/assignments/',
    }).then(() => {
      processInput();
    }).catch(error => {
      console.error("Service worker registration failed:", error);
      processInput();
    });
  } else {
    console.warn("Service workers are not supported in this browser.");
    processInput();
  }
});

function processInput() {
  let url = input.value.toLowerCase().trim();
  console.log("Input URL:", url);
  if (!isUrl(url)) url = "https://search.yahoo.com/search?q=" + encodeURIComponent(url);
  else if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url;
  localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
  console.log("Encoded URL:", url);
  location.href = "/mastery";
}

function isUrl(val = "") {
  if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) return true;
  return false;
}
