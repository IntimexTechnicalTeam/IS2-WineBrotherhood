import shopCartItem from './shopCartItem';
import Currency from './currency';

export default class ShopCart {
  // public name!:string;
  // public count!:number;
  // public price!:number;
  // public src!:string;
  // constructor (src:string, name:string, count:number, price:number) {
  //   this.src = src;
  //   this.name = name;
  //   this.count = count;
  //   this.price = price;
  // }

  private _Currency : Currency;
  public get Currency () : Currency {
    return this._Currency;
  }
  public set Currency (v : Currency) {
    this._Currency = v;
  }

  private _DefaultCurrency : Currency;
  public get DefaultCurrency () : Currency {
    return this._DefaultCurrency;
  }
  public set DefaultCurrency (v : Currency) {
    this._DefaultCurrency = v;
  }

  private _DeliveryCharge : number;
  public get DeliveryCharge () : number {
    return this._DeliveryCharge;
  }
  public set DeliveryCharge (v : number) {
    this._DeliveryCharge = v;
  }

  private _DicountAmount : number;
  public get DicountAmount () : number {
    return this._DicountAmount;
  }
  public set DicountAmount (v : number) {
    this._DicountAmount = v;
  }

  private _IsTemp : string;
  public get IsTemp () : string {
    return this._IsTemp;
  }
  public set IsTemp (v : string) {
    this._IsTemp = v;
  }

  private _ItemsAmount : number;
  public get ItemsAmount () : number {
    return this._ItemsAmount;
  }
  public set ItemsAmount (v : number) {
    this._ItemsAmount = v;
  }

  private _ExchangeRate : number;
  public get ExchangeRate () : number {
    return this._ExchangeRate;
  }
  public set ExchangeRate (v : number) {
    this._ExchangeRate = v;
  }
  private _ItemsTaxAmount : number;
  public get ItemsTaxAmount () : number {
    return this._ItemsTaxAmount;
  }
  public set ItemsTaxAmount (v : number) {
    this._ItemsTaxAmount = v;
  }

  private _Qty : number;
  public get Qty () : number {
    return this._Qty;
  }
  public set Qty (v : number) {
    this._Qty = v;
  }

  private _TotalAmount : number;
  public get TotalAmount () : number {
    return this._TotalAmount;
  }
  public set TotalAmount (v : number) {
    this._TotalAmount = v;
  }

  private _TotalWeight : number;
  public get TotalWeight () : number {
    return this._TotalWeight;
  }
  public set TotalWeight (v : number) {
    this._TotalWeight = v;
  }

  private _PayMethodTypeId : string;
  public get PayMethodTypeId () : string {
    return this._PayMethodTypeId;
  }
  public set PayMethodTypeId (v : string) {
    this._PayMethodTypeId = v;
  }

  private _PayMethodType : string;
  public get PayMethodType () : string {
    return this._PayMethodType;
  }
  public set PayMethodType (v : string) {
    this._PayMethodType = v;
  }

  private _Items : shopCartItem[];
  public get Items () : shopCartItem[] {
    return this._Items;
  }
  public set Items (v : shopCartItem[]) {
    this._Items = v;
  }
  constructor (_DeliveryCharge = 0,
    _DicountAmount = 0,
    _IsTemp = '',
    _ItemsAmount = 0,
    _ItemsTaxAmount = 0,
    _Qty = 0,
    _TotalAmount = 0,
    _ExchangeRate = 0,
    _TotalWeight = 0,
    _PayMethodTypeId = '',
    _PayMethodType = '',
    _Items = [],
    _Currency = new Currency(), _DefaultCurrency = new Currency()) {
    this._DeliveryCharge = _DeliveryCharge;
    this._DicountAmount = _DicountAmount;
    this._IsTemp = _IsTemp;
    this._ItemsAmount = _ItemsAmount;
    this._ItemsTaxAmount = _ItemsTaxAmount;
    this._Qty = _Qty;
    this._TotalAmount = _TotalAmount;
    this._ExchangeRate = _ExchangeRate;
    this._TotalWeight = _TotalWeight;
    this._PayMethodTypeId = _PayMethodTypeId;
    this._PayMethodType = _PayMethodType;
    this._Items = _Items;
    this._Currency = _Currency;
    this._DefaultCurrency = _DefaultCurrency;
  }
}
