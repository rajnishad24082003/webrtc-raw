const get404 = (req, res) => {
  return res
    .status(404)
    .render("../views/error.ejs", { msg: "page not found" });
};
const getHome = (req, res) => {
  return res.status(200).render("../views/home.ejs");
};

module.exports = { get404, getHome };
