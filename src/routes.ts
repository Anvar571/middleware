import { postRoute } from "./postRoute";
import { Router } from "./createRoute";
import { userRoute } from "./userRoute";
import { Handler } from "./types";

export class Routers {
  private allRoutes: Router[] = [];

  constructor() {
    this.allRoutes.push(userRoute, postRoute);
  }

  public getRoute(path: string): Handler | undefined {
    const res = this.allRoutes.find((value) => value.getRoute()[path]);

    return res?.searchRoutes(path);
  }

  protected add(route: Router) {
    this.allRoutes.push(route);
  }
}
