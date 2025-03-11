const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let url = input.value.toLowerCase().trim();

  if (!isUrl(url)) {
    url = "https://search.yahoo.com/search?q=" + encodeURIComponent(url);
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = "http://" + url;
  }

  console.log("Final URL:", url); // Debugging: Check what URL is being used

  // Redirect directly to test if the issue is in encoding or storage
  location.href = url;
});

function isUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val.trim()[0] !== " ");
}
