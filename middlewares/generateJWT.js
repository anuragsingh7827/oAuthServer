const jwt = require("jsonwebtoken");

module.exports.generateJWT = ({ username, email, name, avatar }) => {
  const secretOrKey = process.env.JWT_SECRET_DEV;
  const token = jwt.sign(
    {
      expiresIn: "12h",
      username,
      email,
      name,
      avatar,
    },
    secretOrKey,
  );
  return token;
};
