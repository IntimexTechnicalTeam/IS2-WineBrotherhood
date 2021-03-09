export default class Coupon {
    private _DiscountAmount : number;
    public get DiscountAmount () : number {
      return this._DiscountAmount;
    }
    public set DiscountAmount (v : number) {
      this._DiscountAmount = v;
    }

    private _EffectiveDate : string;
    public get EffectiveDate () : string {
      return this._EffectiveDate;
    }
    public set EffectiveDate (v : string) {
      this._EffectiveDate = v.split(' ')[0];
    }

    private _ExpiryDate : string;
    public get ExpiryDate () : string {
      return this._ExpiryDate;
    }
    public set ExpiryDate (v : string) {
      this._ExpiryDate = v.split(' ')[0];
    }

    private _Id : string;
    public get Id () : string {
      return this._Id;
    }
    public set Id (v : string) {
      this._Id = v;
    }

    private _IsAdditional : boolean;
    public get IsAdditional () : boolean {
      return this._IsAdditional;
    }
    public set IsAdditional (v : boolean) {
      this._IsAdditional = v;
    }

    private _IsDiscount : boolean;
    public get IsDiscount () : boolean {
      return this._IsDiscount;
    }
    public set IsDiscount (v : boolean) {
      this._IsDiscount = v;
    }

    private _IsExpiry : boolean;
    public get IsExpiry () : boolean {
      return this._IsExpiry;
    }
    public set IsExpiry (v : boolean) {
      this._IsExpiry = v;
    }

    private _IsUsed : boolean;
    public get IsUsed () : boolean {
      return this._IsUsed;
    }
    public set IsUsed (v : boolean) {
      this._IsUsed = v;
    }

    private _MeetAmount : number;
    public get MeetAmount () : number {
      return this._MeetAmount;
    }
    public set MeetAmount (v : number) {
      this._MeetAmount = v;
    }

    private _Remark : string;
    public get Remark () : string {
      return this._Remark;
    }
    public set Remark (v : string) {
      this._Remark = v;
    }

    private _Title : string;
    public get Title () : string {
      return this._Title;
    }
    public set Title (v : string) {
      this._Title = v;
    }

    private __check : boolean;
    public get check () : boolean {
      return this.__check;
    }
    public set check (v : boolean) {
      this.__check = v;
    }

    private __canCheck : boolean;
    public get canCheck () : boolean {
      return this.__canCheck;
    }
    public set canCheck (v : boolean) {
      this.__canCheck = v;
    }

    constructor (_DiscountAmount = 0, _EffectiveDate = '', _ExpiryDate = '', _Id = '-1', _IsAdditional = false, _IsDiscount = false, _IsExpiry = false, _IsUsed = false, _MeetAmount = 0, _Remark = '', _Title = '', _check = false, _canCheck = true) {
      this._DiscountAmount = _DiscountAmount;
      this._EffectiveDate = _EffectiveDate;
      this._ExpiryDate = _ExpiryDate;
      this._Id = _Id;
      this._IsAdditional = _IsAdditional;
      this._IsDiscount = _IsDiscount;
      this._IsDiscount = _IsDiscount;
      this._IsExpiry = _IsExpiry;
      this._IsUsed = _IsUsed;
      this._MeetAmount = _MeetAmount;
      this._Remark = _Remark;
      this._Title = _Title;
      this.__check = _check;
      this.__canCheck = _canCheck;
    }
}
