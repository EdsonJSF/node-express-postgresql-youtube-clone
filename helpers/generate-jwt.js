import jwt from "jsonwebtoken";

export const generateJWT = (user_id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { user_id };

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: "4h" },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Fail generate JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
