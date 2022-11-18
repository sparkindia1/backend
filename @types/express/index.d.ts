import { PartialUser } from "../../src/models/types";

declare global {
  namespace Express {
    interface Request {
      // setup a user type here
      user?: PartialUser;
    }
  }
}
