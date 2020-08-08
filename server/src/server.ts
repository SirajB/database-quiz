import * as express from "express";
import * as cors from "cors";
import "reflect-metadata";
import { createConnection, getManager } from "typeorm";
import { Users } from "./entity/User";
import { userArray } from "./data/user.list";
import * as bcrypt from "bcrypt";
import { Quiz } from "./entity/Quiz";
import * as passport from "passport";
import { initialize } from "./passportConfig";
import { NextFunction, Response, Request } from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const initializePassport = initialize;

createConnection()
  .then(async (connection) => {
    initializePassport(passport);
    app.use(cors());

    app.use(express.json());

    app.use(passport.initialize());
    app.use(passport.session());

    app.get("/login", checkAuth, async (req: Request, res: Response) => {
      try {
        const allUsers = await connection.manager.find(Users);
        console.log("Loaded users: ", allUsers);
      } catch (error) {}
    });

    app.post(
      "/login",
      passport.authenticate("local", {
        successRedirect: "/quiz",
        failureRedirect: "/login",
        failureFlash: false,
      })
    );

    app.post("/quiz", async (req: Request, res: Response) => {
      try {
        console.log("REQUEST BODY: ", req.body);
        const { quizTitle } = req.body;
        console.log("Inserting a new quiz into the database...");
        const quiz = new Quiz();
        quiz.title = quizTitle;
        const savedQuiz = await connection.manager.save(quiz);
        console.log("Saved a new Quiz with id: " + quiz.id);
        res.json(savedQuiz);
      } catch (error) {
        console.error(error.message);
      }
    });

    app.get("/quiz", async (req: Request, res: Response) => {
      try {
        const quizzes = await connection.manager.find(Quiz);
        console.log("Loaded quizzes: ", quizzes);
        res.json(quizzes);
      } catch (error) {
        console.error(error.message);
      }
    });
    app.get("/quiz/:id", async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        console.log("ID: ", id);
        const quizRepo = await getManager().getRepository(Quiz);
        const quiz = await quizRepo.findOne(id);
        console.log("Loaded quiz: ", quiz);
        res.json(quiz);
      } catch (error) {
        console.error(error.message);
      }
    });
    app.put("/quiz/:id", async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const { title } = req.body;
        const quizRepo = getManager().getRepository(Quiz);
        await quizRepo.update(
          { id: parseInt(id) },
          { title: title.toString() }
        );
        res.json("quiz was updated!");
      } catch (error) {
        console.error(error.message);
      }
    });
    app.delete("/quiz/:id", async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        // const { title } = req.body;
        const quizRepo = getManager().getRepository(Quiz);
        await quizRepo.delete({ id: parseInt(id) });
        console.log("Quiz Deleted");
        res.json("quiz was deleted!");
      } catch (error) {
        console.error(error.message);
      }
    });

    function checkAuth(req: Request, res: Response, next: NextFunction) {
      if (req.isAuthenticated()) {
        return res.redirect("/quiz");
      }
      next();
    }

    function checkNotAuth(req: Request, res: Response, next: NextFunction) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect("/login");
    }

    app.listen(PORT, () => {
      console.log("Inserting a new user into the database...");
      userArray.forEach(async (user) => {
        let hashedPassword = await bcrypt.hash(user.password, 10);
        // console.log(`User ${user.username} Password ${hashedPassword}`);
        try {
          const databaseUser = new Users();
          databaseUser.username = user.username;
          databaseUser.password = hashedPassword;
          databaseUser.permission = user.level;
          await connection.manager.save(databaseUser);
          console.log("Saved a new user with id: " + databaseUser.id);
        } catch (error) {
          console.log("User Exists: ", user.username);
        }

        // console.log("Loading users from the database...");
        // const users = await connection.manager.find(Users);
        // console.log("Loaded users: ", users);

        // bcrypt.compare("JuniperB3rri3s", hashedPassword, (err, result) => {
        //   console.log(`RESULT: ${user.username} ${result}`);
        // });
      });

      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Some error, ", error));
