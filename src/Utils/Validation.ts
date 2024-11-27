export class Validation {
  private readonly fields: string[]

  constructor(fields: string[]) {
    this.fields = fields
  }

  public validate(data: any) {
    const errors: string[] = []

    this.fields.forEach((field) => {
      if (!data[field]) {
        errors.push(`Field ${field} is required.`)
      }
    })

    return errors
  }
}
