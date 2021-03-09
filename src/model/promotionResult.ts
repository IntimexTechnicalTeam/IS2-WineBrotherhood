/* eslint-disable camelcase */
import Currency from './currency';
export class BannerResult {
  Content!: string;
  Id!: number;
  Image!: string;
  IsRedirect!: boolean;
  Seq!: number;
  Url: string = '';
  constructor (
    Content: string = '',
    Id: number,
    Image: string = '',
    IsRedirect: boolean = false,
    Seq: number,
    Url: string = ''
  ) {
    this.Content = Content;
    this.Id = Id;
    this.Image = Image;
    this.IsRedirect = IsRedirect;
    this.Seq = Seq;
    this.Url = Url;
  }
}

export class PromotionResult {
  BannerList!: object[];
  CatTypeName!: string;
  Desc!: string;
  Id!: number;
  ImgName!: string;
  ImgPath!: string;
  Lang!: string;
  LangDesc!: string;
  Name!: string;
  PrmtProductList!: object[];
  Seq!: number;
  Layout: object = {
    BorderType: 2,
    CoverType: 4,
    HeaderType: 2,
    Id: 'c728f1f2-2568-47e7-849b-74f3e7db2854',
    ProductLstType: 2
  };
  Style: object = {
    Color1: '',
    Color2: '#263238',
    Color3: '#fbefdd'
  };
  constructor (
    item
  ) {
    this.BannerList = item.BannerList;
    this.CatTypeName = item.CatTypeName;
    this.Desc = item.Desc;
    this.Id = item.Id;
    this.ImgName = item.ImgName;
    this.ImgPath = item.ImgPath;
    this.Lang = item.Lang;
    this.LangDesc = item.LangDesc;
    this.Name = item.Name;
    this.PrmtProductList = item.PrmtProductList;
    this.Seq = item.Seq;
    this.Layout = item.Layout || this.Layout;
    this.Style = item.Style || this.Style;
  }
}
export class AllCouponList {
  DiscountAmount!: number;
  EffectiveDate!: string;
  ExpiryDate!: string;
  Id!: string;
  IsAdditional!: boolean;
  IsDiscount!: boolean;
  IsExpiry!: boolean;
  IsUsed!: boolean;
  MeetAmount!: number;
  Remark!: string;
  Title!: string;
  constructor (item) {
    this.DiscountAmount = item.DiscountAmount;
    this.EffectiveDate = item.EffectiveDate;
    this.ExpiryDate = item.ExpiryDate;
    this.Id = item.Id;
    this.IsAdditional = item.IsAdditional;
    this.IsDiscount = item.IsDiscount;
    this.IsExpiry = item.IsExpiry;
    this.IsUsed = item.IsUsed;
    this.MeetAmount = item.MeetAmount;
    this.Remark = item.Remark;
    this.Title = item.Title;
  }
}
export class Promotion {
  private _BannerList: Banner[];
  public get BannerList (): Banner[] {
    return this._BannerList;
  }
  public set BannerList (v: Banner[]) {
    this._BannerList = v;
  }

  private _CatTypeName: string;
  public get CatTypeName (): string {
    return this._CatTypeName;
  }
  public set CatTypeName (v: string) {
    this._CatTypeName = v;
  }

  private _Desc: string;
  public get Desc (): string {
    return this._Desc;
  }
  public set Desc (v: string) {
    this._Desc = v;
  }

  private _Id: string;
  public get Id (): string {
    return this._Id;
  }
  public set Id (v: string) {
    this._Id = v;
  }

  private _ImgName: string;
  public get ImgName (): string {
    return this._ImgName;
  }
  public set ImgName (v: string) {
    this._ImgName = v;
  }

  private _ImgPath: string;
  public get ImgPath (): string {
    return this._ImgPath;
  }
  public set ImgPath (v: string) {
    this._ImgPath = v;
  }

  private _Lang: string;
  public get Lang (): string {
    return this._Lang;
  }
  public set Lang (v: string) {
    this._Lang = v;
  }

  private _LangDesc: string;
  public get LangDesc (): string {
    return this._LangDesc;
  }
  public set LangDesc (v: string) {
    this._LangDesc = v;
  }

  private _Name: string;
  public get Name (): string {
    return this._Name;
  }
  public set Name (v: string) {
    this._Name = v;
  }

  private _Seq: string;
  public get Seq (): string {
    return this._Seq;
  }
  public set Seq (v: string) {
    this._Seq = v;
  }

  private _PrmtProductList: Product[];
  public get PrmtProductList (): Product[] {
    return this._PrmtProductList;
  }
  public set PrmtProductList (v: Product[]) {
    this._PrmtProductList = v;
  }

  constructor (_BannerList = [new Banner()], _CatTypeName = '', _Desc = '', _Id = '', _ImgName = '', _ImgPath = '', _Lang = '', _LangDesc = '', _Name = '', _Seq = '', _prmtProductList = []) {
    this._BannerList = _BannerList;
    this._CatTypeName = _CatTypeName;
    this._Desc = _Desc;
    this._Id = _Id;
    this._ImgName = _ImgName;
    this._ImgPath = _ImgPath;
    this._Lang = _Lang;
    this._LangDesc = _LangDesc;
    this._Name = _Name;
    this._Seq = _Seq;
    this._PrmtProductList = _prmtProductList;
  }
}
class Banner {
  private _Content: string;
  public get Content (): string {
    return this._Content;
  }
  public set Content (v: string) {
    this._Content = v;
  }

  private _Id: string;
  public get Id (): string {
    return this._Id;
  }
  public set Id (v: string) {
    this._Id = v;
  }

  private _Image: string;
  public get Image (): string {
    return this._Image;
  }
  public set Image (v: string) {
    this._Image = v;
  }

  private _IsRedirect: string;
  public get IsRedirect (): string {
    return this._IsRedirect;
  }
  public set IsRedirect (v: string) {
    this._IsRedirect = v;
  }

  private _Seq: string;
  public get Seq (): string {
    return this._Seq;
  }
  public set Seq (v: string) {
    this._Seq = v;
  }

  private _Url: string;
  public get Url (): string {
    return this._Url;
  }
  public set Url (v: string) {
    this._Url = v;
  }
  constructor (_Content = '', _Id = '', _Image = '', _IsRedirect = '', _Seq = '', _Url = '') {
    this._Content = _Content;
    this._Id = _Id;
    this._Image = _Image;
    this._IsRedirect = _IsRedirect;
    this._Seq = _Seq;
    this._Url = _Url;
  }
}
export class Product {
  private _Code: string;
  public get Code (): string {
    return this._Code;
  }
  public set Code (v: string) {
    this._Code = v;
  }

  private _Colors: string;
  public get Colors (): string {
    return this._Colors;
  }
  public set Colors (v: string) {
    this._Colors = v;
  }

  private _Currency: Currency;
  public get Currency (): Currency {
    return this._Currency;
  }
  public set Currency (v: Currency) {
    this._Currency = v;
  }

  private _Detail: string;
  public get Detail (): string {
    return this._Detail;
  }
  public set Detail (v: string) {
    this._Detail = v;
  }

  private _HasDiscount: boolean;
  public get HasDiscount (): boolean {
    return this._HasDiscount;
  }
  public set HasDiscount (v: boolean) {
    this._HasDiscount = v;
  }

  private _Img: string;
  public get Img (): string {
    return this._Img;
  }
  public set Img (v: string) {
    this._Img = v;
  }

  private _Img_B: string;
  public get Img_B (): string {
    return this._Img_B;
  }
  public set Img_B (v: string) {
    this._Img_B = v;
  }

  private _Img_L: string;
  public get Img_L (): string {
    return this._Img_L;
  }
  public set Img_L (v: string) {
    this._Img_L = v;
  }

  private _Img_M: string;
  public get Img_M (): string {
    return this._Img_M;
  }
  public set Img_M (v: string) {
    this._Img_M = v;
  }

  private _Img_SM: string;
  public get Img_SM (): string {
    return this._Img_SM;
  }
  public set Img_SM (v: string) {
    this._Img_SM = v;
  }

  private _IsFavorite: boolean;
  public get IsFavorite (): boolean {
    return this._IsFavorite;
  }
  public set IsFavorite (v: boolean) {
    this._IsFavorite = v;
  }

  private _ListPrice: number;
  public get ListPrice (): number {
    return this._ListPrice;
  }
  public set ListPrice (v: number) {
    this._ListPrice = v;
  }

  private _Name: string;
  public get Name (): string {
    return this._Name;
  }
  public set Name (v: string) {
    this._Name = v;
  }

  private _OverView: string;
  public get OverView (): string {
    return this._OverView;
  }
  public set OverView (v: string) {
    this._OverView = v;
  }

  private _SalePrice: number;
  public get SalePrice (): number {
    return this._SalePrice;
  }
  public set SalePrice (v: number) {
    this._SalePrice = v;
  }

  private _Score: number;
  public get Score (): number {
    return this._Score;
  }
  public set Score (v: number) {
    this._Score = v;
  }

  private _Sexes: string;
  public get Sexes (): string {
    return this._Sexes;
  }
  public set Sexes (v: string) {
    this._Sexes = v;
  }

  private _Sizes: string;
  public get Sizes (): string {
    return this._Sizes;
  }
  public set Sizes (v: string) {
    this._Sizes = v;
  }

  private _Sku: string;
  public get Sku (): string {
    return this._Sku;
  }
  public set Sku (v: string) {
    this._Sku = v;
  }

  private _Status: number;
  public get Status (): number {
    return this._Status;
  }
  public set Status (v: number) {
    this._Status = v;
  }

  private _Title: string;
  public get Title (): string {
    return this._Title;
  }
  public set Title (v: string) {
    this._Title = v;
  }

  private _Url: string;
  public get Url (): string {
    return this._Url;
  }
  public set Url (v: string) {
    this._Url = v;
  }
  private _Virtual: boolean;
  public get Virtual (): boolean {
    return this._Virtual;
  }
  public set Virtual (v: boolean) {
    this._Virtual = v;
  }

  constructor (_Virtual = false, _Code = '', _Colors = '', _Currency = new Currency(), _Detail = '', _HasDiscount = false, _Img = '', _ImgB = '', _ImgL = '', _ImgM = '', _ImgSM = '', _IsFavorite = false, _ListPrice = 0, _Name = '', _OverView = '', _SalePrice = 0, _Score = 0, _Sexes = '', _Sizes = '', _Sku = '', _Status = 0, _Title = '', _Url = '') {
    this._Code = _Code;
    this._Colors = _Colors;
    this._Currency = _Currency;
    this._Detail = _Detail;
    this._HasDiscount = _HasDiscount;
    this._Img = _Img;
    this._Img_B = _ImgB;
    this._Img_L = _ImgL;
    this._Img_M = _ImgM;
    this._Img_SM = _ImgSM;
    this._IsFavorite = _IsFavorite;
    this._ListPrice = _ListPrice;
    this._Name = _Name;
    this._OverView = _OverView;
    this._SalePrice = _SalePrice;
    this._Score = _Score;
    this._Sexes = _Sexes;
    this._Sizes = _Sizes;
    this._Sku = _Sku;
    this._Status = _Status;
    this._Title = _Title;
    this._Url = _Url;
    this._Virtual = _Virtual;
  }
}
