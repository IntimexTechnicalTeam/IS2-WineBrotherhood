export default class Payment {
    private _Code : string;
    public get Code () : string {
      return this._Code;
    }
    public set Code (v : string) {
      this._Code = v;
    }

    private _Id : number;
    public get Id () : number {
      return this._Id;
    }
    public set Id (v : number) {
      this._Id = v;
    }

    private _Img : string;
    public get Img () : string {
      return this._Img;
    }
    public set Img (v : string) {
      this._Img = v;
    }

    private _Name : string;
    public get Name () : string {
      return this._Name;
    }
    public set Name (v : string) {
      this._Name = v;
    }
    private _Desc : string;
    public get Desc () : string {
      return this._Desc;
    }
    public set Desc (v : string) {
      this._Desc = v;
    }
    constructor (_Code:string = '', _Id:number = 0, _Img:string = '', _Name:string = '', _Desc:string = '') {
      this._Code = _Code;
      this._Id = _Id;
      this._Img = _Img;
      this._Name = _Name;
      this._Desc = _Desc;
    }
}
