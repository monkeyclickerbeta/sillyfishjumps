const form = document.getElementById("uform");
const input = document.getElementById("searchInput");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Form submitted");

  try {
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register("/lab.js", {
        scope: '/assignments/',
      });
      console.log("Service worker registered");
    } else {
      console.warn("Service workers are not supported in this browser.");
    }

    processInput();
  } catch (error) {
    console.error("Error during service worker registration or input processing:", error);
    alert("An error occurred. Please try again.");
  }
});

function processInput() {
  let url = input.value.toLowerCase().trim();
  console.log("Input URL:", url);

  if (!isUrl(url)) {
    url = "https://search.yahoo.com/search?q=" + encodeURIComponent(url);
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = "http://" + url;
  }

  localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
  console.log("Encoded URL:", url);
  location.href = "/mastery";
}

function isUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ");
}
