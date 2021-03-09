export default class PickupAddress {
  private _Address : string;
  public get Address () : string {
    return this._Address;
  }
  public set Address (v : string) {
    this._Address = v;
  }

  private _Id : string;
  public get Id () : string {
    return this._Id;
  }
  public set Id (v : string) {
    this._Id = v;
  }

  private _Name : string;
  public get Name () : string {
    return this._Name;
  }
  public set Name (v : string) {
    this._Name = v;
  }

  private _Phone : string;
  public get Phone () : string {
    return this._Phone;
  }
  public set Phone (v : string) {
    this._Phone = v;
  }
  private _Seq : string;
  public get Seq () : string {
    return this._Seq;
  }
  public set Seq (v : string) {
    this._Seq = v;
  }
  private _PickupDate : string;
  public get PickupDate () : string {
    return this._PickupDate;
  }
  public set PickupDate (v : string) {
    this._PickupDate = v;
  }
  private _PD : Date;
  public get PD () : Date {
    return this._PD;
  }
  public set PD (v : Date) {
    // if (v) this.PickupDate = (v.getUTCDate() + 1) + '-' + (v.getUTCMonth() + 1) + '-' + v.getUTCFullYear();
    if (v) {
      // this.PickupDate = (v.getUTCDate() + 1) + '-' + (v.getUTCMonth() + 1) + '-' + v.getUTCFullYear();
      this.PickupDate = new Date(v).getUTCFullYear() + '-' + ((new Date(v).getUTCMonth() + 1) < 10 ? ('0' + (new Date(v).getUTCMonth() + 1)) : (new Date(v).getUTCMonth() + 1)) + '-' + (new Date(v).getUTCDate() < 10 ? ('0' + new Date(v).getUTCDate()) : new Date(v).getUTCDate());
    } else {
      this.PickupDate = '';
    };
    this._PD = v;
  }
  private _PickupTime : number;
  public get PickupTime () : number {
    return this._PickupTime;
  }
  public set PickupTime (v : number) {
    this._PickupTime = v;
  }

  private _CompanyAddress : string;
  public get CompanyAddress () : string {
    return this._CompanyAddress;
  }
  public set CompanyAddress (v : string) {
    this._CompanyAddress = v;
  }

  private _ExpressPointId : string;
  public get ExpressPointId () : string {
    return this._ExpressPointId;
  }
  public set ExpressPointId (v : string) {
    this._ExpressPointId = v;
  }

  private _PickupAddress : string;
  public get PickupAddress () : string {
    return this._PickupAddress;
  }
  public set PickupAddress (v : string) {
    this._PickupAddress = v;
  }

  private _PickupAddressPhone : string;
  public get PickupAddressPhone () : string {
    return this._PickupAddressPhone;
  }
  public set PickupAddressPhone (v : string) {
    this._PickupAddressPhone = v;
  }

  private _PickupCompanyName : string;
  public get PickupCompanyName () : string {
    return this._PickupCompanyName;
  }
  public set PickupCompanyName (v : string) {
    this._PickupCompanyName = v;
  }

  constructor (_Address:string = '', _Id:string = '', _Name:string = '', _Phone:string = '', _Seq:string = '', _PickupDate:string = '', _PickupTime:number = 1, _ExpressPointId:string = '', _PickupAddress:string = '', _PickupAddressPhone:string = '', _PickupCompanyName:string = '') {
    this._Address = _Address;
    this._Id = _Id;
    this._Name = _Name;
    this._Phone = _Phone;
    this._Seq = _Seq;
    this._PickupDate = _PickupDate;
    this._PickupTime = _PickupTime;
    this._PD = this.PD = new Date();
    this.PD.setDate(this.PD.getDate() + 1);
    this._CompanyAddress = '';
    this._ExpressPointId = _ExpressPointId;
    this._PickupAddressPhone = _PickupAddressPhone;
    this._PickupAddress = _PickupAddress;
    this._PickupCompanyName = _PickupCompanyName;
  }
}
