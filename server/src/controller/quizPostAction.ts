import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Quiz } from "../entity/Quiz";

/**
 * Saves given post.
 */
export async function quizPostAction(request: Request, response: Response) {
  console.log("REQUEST: ", request.body);

  // get a post repository to perform operations with post
  const postRepository = getManager().getRepository(Quiz);

  // create a real post object from post json object sent over http
  const newPost = postRepository.create(request.body);

  // save received post
  await postRepository.save(newPost);

  // return saved post back
  response.send(newPost);
}
