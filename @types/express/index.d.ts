declare global {
  namespace Express {
    interface Request {
      // setup a user type here
      user?: any;
    }
  }
}
