
export class EmailMessageTemplate  {
  private subject: string
  private message: string

  constructor(subject: string, message: string) {
    this.subject = subject
    this.message = message
  }

  get getMessage(): string {
    return this.message
  }
  get getSubject(): string {
    return this.subject
  }
}