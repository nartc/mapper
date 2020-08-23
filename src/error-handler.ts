export class ErrorHandler {
  private static shouldThrow = true;

  static setShouldThrow(shouldThrow: boolean): void {
    this.shouldThrow = shouldThrow;
  }

  static handleError(errorMessage: string): void {
    if (this.shouldThrow) {
      throw new Error(errorMessage);
    } else {
      console.warn(errorMessage);
      return;
    }
  }
}
