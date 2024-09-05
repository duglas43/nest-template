export class ExceptionReqDto {
  id: any;
  method: any;
  url: any;
  query: any;
  params: any;
  headers: any;
  remoteAddress: any;
  remotePort: number;
  constructor(model: any) {
    this.id = model.id;
    this.method = model.method;
    this.url = model.url;
    this.query = model.query;
    this.params = model.params;
    this.headers = model.headers;
    this.remoteAddress = model.remoteAddress;
    this.remotePort = model.remotePort;

    delete this.headers['cookie'];
    delete this.headers['authorization'];
  }
}
