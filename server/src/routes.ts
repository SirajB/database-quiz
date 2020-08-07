import { getLoginAction } from "./controller/getLoginAction";
import { getQuizAction } from "./controller/getQuizAction";
import { getQuizByIdAction } from "./controller/getQuizByIdAction";
import { quizPostAction } from "./controller/quizPostAction";

export const AppRoutes = [
  {
    path: "/login",
    method: "get",
    action: getLoginAction,
  },
  {
    path: "/quiz",
    method: "get",
    action: getQuizAction,
  },
  {
    path: "/quiz/:id",
    method: "get",
    action: getQuizByIdAction,
  },
  {
    path: "/quiz",
    method: "post",
    action: quizPostAction,
  },
  // {
  //     path: "/quiz/:id/question",
  //     method: "get",
  //     action: getQuestionAction
  // },
  // {
  //     path: "/quiz/:id/question",
  //     method: "post",
  //     action: postQuestionAction
  // },
  // {
  //     path: "/quiz/:id/question/:id",
  //     method: "get",
  //     action: getQuestionByIdAction
  // },
];
