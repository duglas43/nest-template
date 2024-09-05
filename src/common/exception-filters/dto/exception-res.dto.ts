export class ExceptionResDto {
  statusCode: any;
  headers: any;
  responseTime: any;
  constructor(model: any) {
    this.statusCode = model.statusCode;
    this.headers = model.headers;
    this.responseTime = model.responseTime;
  }
}
