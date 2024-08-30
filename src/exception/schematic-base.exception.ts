export class SchematicBaseException <Code extends string = 'UNKNOWN'> extends Error {
  constructor(public message: string, public code?: Code, public context = {}) {
    super(JSON.stringify({ message, code }));

    if (!this.code) this.createCodeFromMessage();
  }

  override toString(): string
  {
    return JSON.stringify(this.toJSON());
  }

  toJSON()
  {
    return {
      message: this.message,
      code: this.code,
      context: this.context,
    };
  }

  private createCodeFromMessage() {
    this.code = (this.message?.replace(/\s/g, '_').toUpperCase() ?? 'UNKNOWN') as Code;
  }
}