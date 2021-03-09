import { Country } from './country';
import { Province } from './province';

export default class Address {
    private _Address : string;
    public get Address () : string {
      return this._Address;
    }
    public set Address (v : string) {
      this._Address = v;
    }

    private _City : string;
    public get City () : string {
      return this._City;
    }
    public set City (v : string) {
      this._City = v;
    }

    private _CityName : string;
    public get CityName () : string {
      return this._CityName;
    }
    public set CityName (v : string) {
      this._CityName = v;
    }

    private _CompanyName : string;
    public get CompanyName () : string {
      return this._CompanyName;
    }
    public set CompanyName (v : string) {
      this._CompanyName = v;
    }

    private _CountryCode : string;
    public get CountryCode () : string {
      return this._CountryCode;
    }
    public set CountryCode (v : string) {
      this._CountryCode = v;
    }

    private _CountryId : number;
    public get CountryId () : number {
      return this._CountryId;
    }
    public set CountryId (v : number) {
      this._CountryId = v;
    }

    private _CountryName : string;
    public get CountryName () : string {
      return this._CountryName;
    }
    public set CountryName (v : string) {
      this._CountryName = v;
    }

    private _Default : boolean;
    public get Default () : boolean {
      return this._Default;
    }
    public set Default (v : boolean) {
      this._Default = v;
    }

    private _DeliveryId : number;
    public get DeliveryId () : number {
      return this._DeliveryId;
    }
    public set DeliveryId (v : number) {
      this._DeliveryId = v;
    }

    private _Email : string;
    public get Email () : string {
      return this._Email;
    }
    public set Email (v : string) {
      this._Email = v;
    }

    private _FirstName : string;
    public get FirstName () : string {
      return this._FirstName;
    }
    public set FirstName (v : string) {
      this._FirstName = v;
    }

    private _FullName : string;
    public get FullName () : string {
      return this._FullName;
    }
    public set FullName (v : string) {
      this._FullName = v;
    }

    private _LastName : string;
    public get LastName () : string {
      return this._LastName;
    }
    public set LastName (v : string) {
      this._LastName = v;
    }

    private _IsUsable : boolean;
    public get IsUsable () : boolean {
      return this._IsUsable;
    }
    public set IsUsable (v : boolean) {
      this._IsUsable = v;
    }

    private _MemberId : string;
    public get MemberId () : string {
      return this._MemberId;
    }
    public set MemberId (v : string) {
      this._MemberId = v;
    }

    private _Mobile : string;
    public get Mobile () : string {
      return this._Mobile;
    }
    public set Mobile (v : string) {
      this._Mobile = v;
    }

    private _Phone : string;
    public get Phone () : string {
      return this._Phone;
    }
    public set Phone (v : string) {
      this._Phone = v;
    }

    private _PostalCode : string;
    public get PostalCode () : string {
      return this._PostalCode;
    }
    public set PostalCode (v : string) {
      this._PostalCode = v;
    }

    private _Province : string;
    public get Province () : string {
      return this._Province;
    }
    public set Province (v : string) {
      this._Province = v;
    }

    private _ProvinceName: string;
    public get ProvinceName () : string {
      return this._ProvinceName;
    }
    public set ProvinceName (v : string) {
      this._ProvinceName = v;
    }

    private _Country : Country;
    public get Country () : Country {
      return this._Country;
    }
    public set Country (v : Country) {
      this._Country = v;
    }

    private _Provinceo : Province;
    public get Provinceo () : Province {
      return this._Provinceo;
    }
    public set Provinceo (v : Province) {
      this._Provinceo = v;
    }

    constructor (
      _Country:Country = new Country(),
      _Provinceo:Province = new Province(),
      _DeliveryId:number = 0,
      _Address:string = '',
      _City:string = '',
      _CityName:string = '',
      _CompanyName:string = '',
      _CountryCode:string = '',
      _CountryId:number = 0,
      _CountryName:string = '',
      _Default:boolean = false,
      _Email:string = '',
      _FirstName:string = '',
      _FullName:string = '',
      _LastName:string = '',
      _IsUsable:boolean = true,
      _MemberId:string = '',
      _Mobile:string = '',
      _Phone:string = '',
      _PostalCode:string = '',
      _Province:string = '',
      _ProvinceName:string = '') {
      this._Address = _Address;
      this._City = _City;
      this._CityName = _CityName;
      this._CompanyName = _CompanyName;
      this._CountryCode = _CountryCode;
      this._CountryId = _CountryId;
      this._CountryName = _CountryName;
      this._Default = _Default;
      this._DeliveryId = _DeliveryId;
      this._Email = _Email;
      this._FirstName = _FirstName;
      this._FullName = _FullName;
      this._LastName = _LastName;
      this._IsUsable = _IsUsable;
      this._MemberId = _MemberId;
      this._Mobile = _Mobile;
      this._Phone = _Phone;
      this._PostalCode = _PostalCode;
      this._Province = _Province;
      this._ProvinceName = _ProvinceName;
      this._Country = _Country;
      this._Provinceo = _Provinceo;
    }
}
export class AddressResult {
  private _Address : string;
  public get Address () : string {
    return this._Address;
  }
  public set Address (v : string) {
    this._Address = v;
  }
  private _FirstName : string;
  public get FirstName () : string {
    return this._FirstName;
  }
  public set FirstName (v : string) {
    this._FirstName = v;
  }
  private _FullName : string;
  public get FullName () : string {
    return this._FullName;
  }
  public set FullName (v : string) {
    this._FullName = v;
  }
  private _LastName : string;
  public get LastName () : string {
    return this._LastName;
  }
  public set LastName (v : string) {
    this._LastName = v;
  }
  private _DeliveryId : string;
  public get DeliveryId () : string {
    return this._DeliveryId;
  }
  public set DeliveryIde (v : string) {
    this._DeliveryId = v;
  }
  private _PostalCode : string;
  public get PostalCode () : string {
    return this._PostalCode;
  }
  public set PostalCode (v : string) {
    this._PostalCode = v;
  }
  private _ProvinceName : string;
  public get ProvinceName () : string {
    return this._ProvinceName;
  }
  public set ProvinceName (v : string) {
    this._ProvinceName = v;
  }
  private _Mobile : string;
  public get Mobile () : string {
    return this._Mobile;
  }
  public set Mobile (v : string) {
    this._Mobile = v;
  }
  constructor (
    Address:string,
    FirstName:string,
    FullName:string,
    LastName:string,
    DeliveryId:string,
    PostalCode:string,
    ProvinceName:string,
    Mobile:string
  ) {
    this._Address = Address;
    this._FirstName = FirstName;
    this._FullName = FullName;
    this._LastName = LastName;
    this._DeliveryId = DeliveryId;
    this._PostalCode = PostalCode;
    this._ProvinceName = ProvinceName;
    this._Mobile = Mobile;
  }
}
