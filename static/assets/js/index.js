const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Register service worker (if necessary)
  try {
    await window.navigator.serviceWorker.register("/lab.js", {
      scope: "/assignments/",
    });
  } catch (err) {
    console.error("Service Worker Registration Failed:", err);
  }

  let url = input.value.toLowerCase().trim();

  // Check if it's a valid URL, otherwise treat it as a search query
  if (!isUrl(url)) {
    url = "https://search.yahoo.com/search?q=" + encodeURIComponent(url);
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = "http://" + url;
  }

  console.log("Encoded URL:", url); // Debugging: Check if URL is correct

  // Store URL for use in /mastery
  localStorage.setItem("encodedUrl", url);

  // Redirect to /mastery to handle the display
  location.href = "/mastery";
});

function isUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val.trim()[0] !== " ");
}
