
const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const screenShot = async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/Jerusalem");
  await page.screenshot({ path: "amazing.png", fullPage: true });
  await browser.close();
  console.log("done");
};

// screenShot();

const start = async function (searchInput) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/"+searchInput);

  const namesArr = await page.evaluate(() => {
    const elements = document.querySelectorAll("#toc li.toclevel-2 span.toctext");
    const names = Array.from(elements).map((elem) => elem.textContent);
    return names;
  });
  browser.close()
  await fs.writeFile("names.txt", namesArr.join("\r\n"));
  console.log("done");
};
start('world war 1');

async function startTest() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://learnwebcode.github.io/practice-requests/")
  
    const names = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
    })
    await fs.writeFile("names.txt", names.join("\r\n"))
  
    await page.click("#clickme")
    const clickedData = await page.$eval("#data", el => el.textContent)
    console.log(clickedData)
  
    const photos = await page.$$eval("img", imgs => {
      return imgs.map(x => x.src)
    })
  
    await page.type("#ourfield", "blue")
    await Promise.all([page.click("#ourform button"), page.waitForNavigation()])
    const info = await page.$eval("#message", el => el.textContent)
  
    console.log(info)
  
    for (const photo of photos) {
      const imagepage = await page.goto(photo)
      await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
    }
  
    await browser.close()
  }
  startTest()

