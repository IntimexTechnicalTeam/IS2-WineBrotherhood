export default class Order {
    private _CreateAt : string;
    public get CreateAt () : string {
      return this._CreateAt;
    }
    public set CreateAt (v : string) {
      this._CreateAt = v;
    }

    private _InvoiceNO : string;
    public get InvoiceNO () : string {
      return this._InvoiceNO;
    }
    public set InvoiceNO (v : string) {
      this._InvoiceNO = v;
    }

    private _DeliveryCharge : number;
    public get DeliveryCharge () : number {
      return this._DeliveryCharge;
    }
    public set DeliveryCharge (v : number) {
      this._DeliveryCharge = v;
    }

    private _ItemsAmount : number;
    public get ItemsAmount () : number {
      return this._ItemsAmount;
    }
    public set ItemsAmount (v : number) {
      this._ItemsAmount = v;
    }

    private _StatusName : string;
    public get StatusName () : string {
      return this._StatusName;
    }
    public set StatusName (v : string) {
      this._StatusName = v;
    }
    private _TotalAmount : number;
    public get TotalAmount () : number {
      return this._TotalAmount;
    }
    public set TotalAmount (v : number) {
      this._TotalAmount = v;
    }
    private _PaymentMethod : string;
    public get PaymentMethod () : string {
      return this._PaymentMethod;
    }
    public set PaymentMethod (v : string) {
      this._PaymentMethod = v;
    }
    private _OffLinePay : boolean;
    public get OffLinePay () : boolean {
      return this._OffLinePay;
    }
    public set OffLinePay (v : boolean) {
      this._OffLinePay = v;
    }
    constructor (_CreateAt:string = '', _InvoiceNO:string = '', _DeliveryCharge:number = 0, _ItemsAmount = 0, _StatusName = '', _TotalAmount = 0, _PaymentMethod = '', _OffLinePay:boolean = false) {
      this._CreateAt = _CreateAt;
      this._InvoiceNO = _InvoiceNO;
      this._DeliveryCharge = _DeliveryCharge;
      this._ItemsAmount = _ItemsAmount;
      this._StatusName = _StatusName;
      this._TotalAmount = _TotalAmount;
      this._PaymentMethod = _PaymentMethod;
      this._OffLinePay = _OffLinePay;
    }
}
export class CreateOrder {
    AddressId : number;
    ExpressId : string;
    DeliveryType : string;
    PaymentMethod : number;
    PickupDate : string;
    PickupTime : string;
    PromotionCode : string;
    ExpressPointId : string;
    PickupPhone: string;
    PickupName : string;
    CouponIds : string[];
    TimeRangeId: string;
    DeliveryDate: string;
    Remark: string;
    PickupAddressPhone: string;
    PickupAddress: string;
    PickupCompanyName: string;
    constructor (_AddressId:number, _ExpressId:string, _PaymentMethod:number, _DeliverType:string = 'D', _PickupDate:string = '', _PickupTime:string = '', _PickupPhone = '', _PickupName = '', _PromotionCode:string = '', _TimeRangeId:string = ' ', _DeliveryDate:string = '', _Remark:string = '', _ExpressPointId:string = '', _PickupAddress:string = '', _PickupAddressPhone:string = '', _PickupCompanyName:string = '', _Coupons:string[] = []) {
      this.AddressId = _AddressId;
      this.ExpressId = _ExpressId;
      this.PaymentMethod = _PaymentMethod;
      this.DeliveryType = _DeliverType;
      this.PickupDate = _PickupDate;
      this.PickupTime = _PickupTime;
      this.PickupPhone = _PickupPhone;
      this.PickupName = _PickupName;
      this.PromotionCode = _PromotionCode;
      this.ExpressPointId = _ExpressPointId;
      this.CouponIds = _Coupons;
      this.TimeRangeId = _TimeRangeId;
      this.DeliveryDate = _DeliveryDate;
      this.Remark = _Remark;
      this.PickupAddressPhone = _PickupAddressPhone;
      this.PickupAddress = _PickupAddress;
      this.PickupCompanyName = _PickupCompanyName;
    }
}
