const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await window.navigator.serviceWorker.register("/lab.js", {
      scope: "/assignments/",
    });

    let url = input.value.toLowerCase().trim();
    if (!isUrl(url)) {
      url = "https://search.yahoo.com/search?q=" + encodeURIComponent(url);
    } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
      url = "http://" + url;
    }

    localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
    window.location.href = "/mastery";
  } catch (error) {
    console.error("Service worker registration failed:", error);
  }
});

function isUrl(val = "") {
  const pattern = /^http(s?):\/\//;
  return pattern.test(val) || (val.includes(".") && val.charAt(0) !== " ");
}
