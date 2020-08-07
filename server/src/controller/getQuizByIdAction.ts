import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Quiz } from "../entity/Quiz";

export async function getQuizByIdAction(request: Request, response: Response) {
  const quizRepository = getManager().getRepository(Quiz);

  const quiz = await quizRepository.findOne(request.params.id);

  if (!quiz) {
    response.status(404);
    response.end();
    return;
  }

  response.send(quiz);
}
