export default class Message {
    private _Message : string;
    public get Message () : string {
      return this._Message;
    }
    public set Message (v : string) {
      this._Message = v;
    }
    private _ReturnValue : object;
    public get ReturnValue () : object {
      return this._ReturnValue;
    }
    public set ReturnValue (v : object) {
      this._ReturnValue = v;
    }
    private _Succeeded : boolean;
    public get Succeeded () : boolean {
      return this._Succeeded;
    }
    public set Succeeded (v : boolean) {
      this._Succeeded = v;
    }
    constructor (message:string = '', returnValue:object = {}, succeeded:boolean = true) {
      this._Message = message;
      this._ReturnValue = returnValue;
      this._Succeeded = succeeded;
    }
}
