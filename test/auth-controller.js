const expect = require("chai").expect;
const sinon = require("sinon");

const User = require("../models/user");

const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", () => {
  it("should throw an error with code 500 if accesssing the database fails", function(done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "tester"
      }
    };

    AuthController.login(req, {}, () => {}).then(result => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });

    User.findOne.restore();
  });

  it("should send a response with a valid user status for an existing user", function() {
    mongoose
      .connect(
        "mongodb+srv://Poula:ZNS86TrVJ8tamPk9@cluster0-br09l.mongodb.net/test-messages?retryWrites=true&w=majority"
      )
      .then(result => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          posts: [],
          _id: "5c0f66b979af55031b34728a"
        });
        return user.save();
      })
      .then(() => {
        const req = { userId: "5c0f66b979af55031b34728a" };
      })
      .catch(err => console.log(err));
  });
});
