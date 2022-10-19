module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    // return res.status(401).redirect('/login');
    //! I'm sending a 300 status code but of course we could add status 401 here to kind of also make clear what the problem
    //! but it will be overwritten with a 300 code due to redirect.
    return res.redirect('/login');
  }
  next();
};