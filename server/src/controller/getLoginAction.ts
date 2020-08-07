import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Users } from "../entity/User";

export async function getLoginAction(request: Request, response: Response) {
  const userRepository = getManager().getRepository(Users);

  const user = await userRepository.findOne(request.params.id);

  if (!user) {
    response.status(404);
    response.end();
    return;
  }

  response.send(user);
}
