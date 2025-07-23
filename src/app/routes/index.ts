import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { DivisionsRoutes } from "../modules/divisions/divisions.routes";

export const router = Router();



const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/divisions",
    route: DivisionsRoutes,
  },

];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);


});
