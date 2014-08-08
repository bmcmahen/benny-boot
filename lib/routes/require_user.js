module.exports = requireUser;

function requireUser(redirect){
  return function(req, res, next){
    if (req.user) return next();
    if (redirect) return res.redirect('/');
    return res.send(403);
  } 
}