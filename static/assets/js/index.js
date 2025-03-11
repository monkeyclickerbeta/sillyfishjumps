const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  window.navigator.serviceWorker.register("/lab.js", {
    scope: '/assignments/',
  }).then(() => {
    let url = input.value.trim().toLowerCase();

    if (!isUrl(url)) {
      url = "https://search.yahoo.com/search?p=" + encodeURIComponent(url);
    } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
      url = "http://" + url;
    }

    console.log("Redirecting to:", url); // Debugging - Check the final URL in the browser console

    try {
      localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      setTimeout(() => {
        location.href = "/mastery";
      }, 10);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }).catch(error => {
    console.error("Service Worker registration failed:", error);
  });
});

function isUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val[0] !== " ");
}
