const app = require("./src/index");
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on ${PORT}`);
});
