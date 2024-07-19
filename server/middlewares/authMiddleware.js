const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.header.authorization.split(' ')[1];
    //console.log(token,"token")
    const userId = jwt.verify(token, process.env.jwt_secret).userId;
    //console.log(userId,"userid")
    req.body.userId = userId;
    //console.log(req.body,"body")
    next();
  } catch (error) {
    res.status(403).send({
        success:false, 
        message:"User is unauthorized"
    })
  }
};
