const { scrapeAmazonProduct } = require("../utils/scrapeAmazonProduct");

const getGift = async (req, res) => {
  let { color } = req.query;

  try {
    if (color !== undefined) {
      let product = "shoes";
      let gender = "male";
      const searchQuery = color + " " + product + " " + gender;

      const productsArray = await scrapeAmazonProduct(searchQuery);
      let urls = {
        url1: productsArray[1].url,
        url2: productsArray[2].url,
        url3: productsArray[3].url,
      };
      console.log(productsArray);
      return res.status(200).json(urls);
    }

    return res.status(200).json({ data: "No params selected yet" });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getGift };
