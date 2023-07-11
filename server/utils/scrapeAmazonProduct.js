const puppeteer = require('puppeteer');

async function scrapeAmazonProduct(searchQuery) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the search results page
  const searchURL = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`;
  await page.goto(searchURL);

  // Wait for the search results to load
  await page.waitForSelector('.s-result-item');

  // Extract product details
  const products = await page.$$eval('.s-result-item', (elements) =>
    elements.slice(0, 5).map((element) => {
      const titleElement = element.querySelector('h2 > a');
      const title = titleElement ? titleElement.innerText : '';

      const priceElement = element.querySelector('.a-price-whole');
      const price = priceElement ? priceElement.innerText : '';

      const url = titleElement ? titleElement.href : '';

      return { title, price, url };
    })
  );

  await browser.close();

  return products;
}
module.exports={scrapeAmazonProduct}



// const {scrapeAmazonProduct} = require("./scrapper/scrappervone")


// let color = "purple"
// let product = "shoes"
// let gender  = 'male'
// const searchQuery = color+" "+product+" "+gender;
// scrapeAmazonProduct(searchQuery)
//   .then((products) => {
//     console.log(products);
//   })
//   .catch((error) => {
//     console.error('An error occurred:', error);
//   });
