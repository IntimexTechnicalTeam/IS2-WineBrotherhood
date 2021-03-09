export default class ProductAttr {
  [x: string]: string;
  private _Id : string;
  public get Id () : string {
    return this._Id;
  }
  public set Id (v : string) {
    this._Id = v;
  }
  private _AdditionalPrice : string;
  public get AdditionalPrice () : string {
    return this.AdditionalPrice;
  }
  public set AdditionalPrice (v : string) {
    this.AdditionalPrice = v;
  }
  private _Name : string;
  public get Name () : string {
    return this._Name;
  }
  public set Name (v : string) {
    this._Name = v;
  }
  private _NameC : string;
  public get NameC () : string {
    return this._NameC;
  }
  public set NameC (v : string) {
    this._NameC = v;
  }
  private _NameE : string;
  public get NameE () : string {
    return this._NameE;
  }
  public set NameE (v : string) {
    this._NameE = v;
  }
  constructor (Id: string, AdditionalPrice: string, Name: string, NameC:string, NameE:string) {
    this._Id = Id;
    this._AdditionalPrice = AdditionalPrice;
    this._Name = Name;
    this._NameC = NameC;
    this._NameE = NameE;
  }
}
