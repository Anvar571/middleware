export class ExceptionHandler {
  static init() {
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err.message);
    });

    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Promise Rejection:", reason);
    });
  }
}
