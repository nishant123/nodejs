
export default class CustomError extends Error {
  code: number

  serviceName: string;

  type : any

  severity:string

  constructor({
    message, type = 'UNKNOWN', code = 500, serviceName = 'UNKNOWN', severity = 'UNKNOWN'
  }) {
    super(message);
    this.type = type;
    this.message = message;
    this.code = code;
    this.name = this.constructor.name;
    this.serviceName = serviceName;
    this.severity = severity;
  }
}
