const queryString = require("querystring");
const user = require("../index");

console.log(user);
// parseRequestData(user.body);

// class UserData {
//   constructor(userEmail, userPassword) {
//     this.userEmail = userEmail;
//     this.userPassword = userPassword;
//   }
// }
// function parseRequestData(body) {
//   userSignInData = queryString.parse(body);
//   userSignInEmail = JSON.stringify(userSignInData.email);
//   userSignInPassword = JSON.stringify(userSignInData.password);

//   const userInput = new UserData(userSignInEmail, userSignInPassword);
//   addDataToDB(userInput);
// }

// function addDataToDB(userBody) {
//   console.log(userBody);
//   //   let userE = userBody.userEmail;
//   //   let userP = userBody.userPassword;
// }

// module.exports = parseRequestData();
