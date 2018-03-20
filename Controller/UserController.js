const express = require('express');
const router = express();
exports.getUser = function(req,res,next){
  res.send(req.user);
};
// router.get('/profile', function(req, res, next) {
//   res.send(req.user);
// });
//
//   /* GET user profile. */
// router.get('/profile', function(req, res, next) {
//     res.send(req.user);
// });
// module.exports = router;
