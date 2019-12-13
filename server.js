const puppeteer = require("puppeteer");
const $ = require("cheerio");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 8080;
app.use(cors());

var searchKey;
app.get("/gsearch", (req, res) => {
  res.send("Welcome to post Node API");
});
app.post("/postData", bodyParser.json(), (req, res) => {
  searchKey = req.body.input;
  searchKey = searchKey.replace(/ /g, "+");
  console.log(searchKey);

  var url = "https://www.google.co.in/search?q=" + searchKey + "&num=10";
  google_scrape(url, res);
});
var server = app.listen(process.env.PORT || 8080, () =>
  console.log("App listening on port " + PORT)
);
// var arr4 = [];

// function google_scrape(url, res) {
//   var arr = [];
//   var arr1 = [];
//   var output;
//   puppeteer
//     .launch({ args: ["--no-sandbox"] })
//     .then(function(browser) {
//       return browser.newPage();
//     })
//     .then(function(page) {
//       return page.goto(url).then(function() {
//         return page.content();
//       });
//     })

//     .then(function(html) {
//       $(" .LC20lb", html).each(function() {
//         arr.push(
//           $(this)
//             .parent()
//             .attr("href")
//         );
//         arr1.push($(this).text());
//       });
//       a = 0;
//       // $("span.st", html).each(function() {
//       //   arr4.push($(this).text());
//       // });
//     })

//     .then(function() {
//       // var arr2 = Array.from(new Set(arr));
//       // var arr3 = Array.from(new Set(arr1));
//       output = { link: url, titles: arr1, urls: arr };
//       console.log(output);
//       res.json(output);

//       // browser.close(); //   process.exit();
//       // console.log(output);
//       // return output;
//     })
//     .catch(function(err) {
//       //handle error
//       console.log(err);
//     });
// }

function google_scrape(url, res) {
  (async () => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2"
    });
    var arr = [],
      arr1 = [];
    var HTML = await page.content();
    $(" .LC20lb", HTML).each(function() {
      arr.push(
        $(this)
          .parent()
          .attr("href")
      );
      arr1.push($(this).text());
    });
    var output = { link: url, titles: arr1, urls: arr };
    console.log(output);

    res.json(output);

    browser.close();
    return;
  })();
  // console.log("hello");
}
