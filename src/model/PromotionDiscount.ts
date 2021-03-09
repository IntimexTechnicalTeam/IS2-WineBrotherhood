export default class PromotionDiscount {
    private _Favorable : number;
    public get Favorable () : number {
      return this._Favorable;
    }
    public set Favorable (v : number) {
      this._Favorable = v;
    }

    private _FillAmount : number;
    public get FillAmount () : number {
      return this._FillAmount;
    }
    public set FillAmount (v : number) {
      this._FillAmount = v;
    }

    private _Id : string;
    public get Id () : string {
      return this._Id;
    }
    public set Id (v : string) {
      this._Id = v;
    }

    private _IsDiscount : boolean;
    public get IsDiscount () : boolean {
      return this._IsDiscount;
    }
    public set IsDiscount (v : boolean) {
      this._IsDiscount = v;
    }

    private _IsSuperpostion : string;
    public get IsSuperpostion () : string {
      return this._IsSuperpostion;
    }
    public set IsSuperpostion (v : string) {
      this._IsSuperpostion = v;
    }

    private _MemberName : string;
    public get MemberName () : string {
      return this._MemberName;
    }
    public set MemberName (v : string) {
      this._MemberName = v;
    }
    constructor (_Favorable: number = 0, _FillAmount: number = 0, _Id:string = '-1', _IsDiscount:boolean = false, _IsSuperposition: string = '', _MemberName:string = '') {
      this._Favorable = _Favorable;
      this._FillAmount = _FillAmount;
      this._Id = _Id;
      this._IsDiscount = _IsDiscount;
      this._IsSuperpostion = _IsSuperposition;
      this._MemberName = _MemberName;
    }
}
