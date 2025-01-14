class BadRequestException extends Error {
  code: number;

  constructor(message: string) {
    super();

    this.message = message;
  }
}

export default BadRequestException;
