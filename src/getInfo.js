const pw = require("playwright");

const getInfo = async () => {
  const browser = await pw.chromium.connectOverCDP(
    "wss://chrome.browserless.io?token=7d906df3-14a7-4ab3-9944-824d7a6f51a4"
  );

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

  const dolarSolidario = await page.$eval(
    "a[href='/cotizaciondolarturista']",
    (element) => {
      const name = element.textContent;
      const venta =
        element.nextElementSibling.querySelector(".venta .val").textContent;

      return {
        name,
        venta,
      };
    }
  );

  await browser.close();
  if (!dolarOficial || !dolarBlue || !dolarSolidario)
    throw Error("Error al obtener datos");
  return { dolarOficial, dolarBlue, dolarSolidario };
};

module.exports = getInfo;
