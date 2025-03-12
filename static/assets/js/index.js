const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  try {
    console.log("Registering Service Worker...");
    const registration = await window.navigator.serviceWorker.register("/lab.js", {
      scope: '/assignments/',
    });
    console.log("Service Worker registered:", registration);
    
    let url = input.value.toLowerCase().trim();
    if (!isUrl(url)) {
      url = "https://search.yahoo.com/search?q=" + url;
    } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
      url = "http://" + url;
    }
    
    // Remove or modify this line if you do not want to append ?mobile=true
    // url = url + "?mobile=true";
    
    const encodedUrl = __uv$config.encodeUrl(url);
    localStorage.setItem("encodedUrl", encodedUrl);
    console.log("URL encoded and stored:", encodedUrl);
    
    location.href = "/mastery";
    console.log("Redirecting to /mastery...");
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
});

function isUrl(val = "") {
  if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) return true;
  return false;
}
