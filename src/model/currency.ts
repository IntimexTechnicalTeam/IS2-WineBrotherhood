export default class Currency {
    private _Code !: string;
    public get Code () : string {
      return this._Code;
    }
    public set Code (v : string) {
      this._Code = v;
    }

    private _Desc !: string;
    public get Desc () : string {
      return this._Desc;
    }
    public set Desc (v : string) {
      this._Desc = v;
    }

    private _Id : number;
    public get Id () : number {
      return this._Id;
    }
    public set Id (v : number) {
      this._Id = v;
      if (v === 1) {
        this._Code = 'HK';
        this._Name = 'HK';
      } else if (v === 2) {
        this._Code = 'USD';
        this._Name = 'USD';
      } else if (v === 3) {
        this._Code = 'RMB';
        this._Name = 'RMB';
      } else if (v === 4) {
        this._Code = 'PLN';
        this._Name = 'PLN';
      }
    }

    private _Name !: string;
    public get Name () : string {
      return this._Name;
    }
    public set Name (v : string) {
      this._Name = v;
    }
    constructor (_Id:number = 1, _Code:string = 'HK', _Desc:string = '', _Name:string = 'HK') {
      // this._Code = _Code;
      // this._Desc = _Desc;
      this._Id = _Id;
      // this._Name = _Name;
    }
}
