const { chromium, selectors } = require("playwright");

const getInfo = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://dolarhoy.com/");
  const dolarBlue = await page.$eval(
    "a[href='/cotizaciondolarblue']",
    (element) => {
      const name = element.textContent;
      const compra =
        element.nextElementSibling.querySelector(".compra .val").textContent;
      const venta =
        element.nextElementSibling.querySelector(".venta .val").textContent;

      return {
        name,
        compra,
        venta,
      };
    }
  );

  const dolarOficial = await page.$eval(
    "a[href='/cotizaciondolaroficial']",
    (element) => {
      const name = element.textContent;
      const compra =
        element.nextElementSibling.querySelector(".compra .val").textContent;
      const venta =
        element.nextElementSibling.querySelector(".venta .val").textContent;

      return {
        name,
        compra,
        venta,
      };
    }
  );

  await browser.close();
  return { dolarBlue, dolarOficial };
};

module.exports = getInfo;
