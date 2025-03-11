const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  window.navigator.serviceWorker.register("/lab.js", {
    scope: '/assignments/',
  }).then(() => {
    let url = input.value.toLowerCase().trim();
    if (!isUrl(url)) url = "https://search.yahoo.com/search?q=" + url;
    else if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url;
    
    // Remove or modify this line if you do not want to append ?mobile=true
    // url = url + "?mobile=true";
    
    localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
    location.href = "/mastery";
  });
});

function isUrl(val = "") {
  if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) return true;
  return false;
}
