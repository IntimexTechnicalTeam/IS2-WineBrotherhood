export class LoginResult {
  private _Code: string;
  public get Code (): string {
    return this._Code;
  }
  public set Code (v: string) {
    this._Code = v;
  }

  private _ReturnValue : any;
  public get ReturnValue () : any {
    return this._ReturnValue;
  }
  public set ReturnValue (v : any) {
    this._ReturnValue = v;
  }

  private _Message: string;
  public get Message (): string {
    return this._Message;
  }
  public set Message (v: string) {
    this._Message = v;
  }

  constructor () {
    this._ReturnValue = '';
    this._Code = '';
    this._Message = '';
  }
}
