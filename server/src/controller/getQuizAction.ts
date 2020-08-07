import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Quiz } from "../entity/Quiz";

export async function getQuizAction(request: Request, response: Response) {
  const quizRepository = getManager().getRepository(Quiz);

  const quizzes = await quizRepository.find();

  response.send(quizzes);
}
