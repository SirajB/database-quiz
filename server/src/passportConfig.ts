import { Strategy as LocalStrategy } from "passport-local";
import { createConnection, getManager } from "typeorm";
import * as bcrypt from "bcrypt";
import { Users } from "./entity/User";

const initialize = (passport) => {
  console.log("Initilised");
  const userRepo = getManager().getRepository(Users);

  const authUser = (username, password, done) => {
    console.log(username, password);

    userRepo.findOne({ username: username });
    console.log("USER REPO: ", userRepo);
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      authUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    const selectedUser = await userRepo.find({
      where: { id: id },
    });
    console.log("SELECTED USER: ", selectedUser);
  });
};

export { initialize };
