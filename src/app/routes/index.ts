import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { DivisionsRoutes } from "../modules/divisions/divisions.routes";
import { TourRoutes } from "../modules/tour/tour.routes";
import { bookingRouter } from "../modules/booking/booking.routes";
import { paymentRoutes } from "../modules/payments/payment.routes";

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
  {
    path: "/tours",
    route: TourRoutes,
  },
  {
    path: "/booking",
    route: bookingRouter,
  },
  {
    path: "/payments",
    route: paymentRoutes,
  },

];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);


});
