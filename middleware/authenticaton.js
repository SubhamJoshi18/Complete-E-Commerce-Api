//check the token is valid or not
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "./verifytoken.js";

// async function givePayload(token) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(payload);
//       }
//     });
//   });
// }

export const authenticatedUser = async (req, res, next) => {
  const { accessToken } = req.signedCookies;
  console.log(accessToken);

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN);

    console.log(payload);
    req.user = payload;
    console.log(req.user);

    next();
  } catch (err) {
    console.error(err);
  }
};
