export class CMSPager {
    private _id: string='';
    public get id () : string {
      return this._id;
    }
    public set id (v : string) {
      this._id = v;
    }
    private _key: string='';
    public get key (): string {
      return this._key;
    }
    public set key (v: string) {
      this._key = v;
    }

    private _sortName: string='';
    public get sortName (): string {
      return this._sortName;
    }
    public set sortName (v: string) {
      this._sortName = v;
    }

    private _sortByDesc: string='';
    public get sortByDesc (): string {
      return this._sortByDesc;
    }
    public set sortByDesc (v: string) {
      this._sortByDesc = v;
    }

    private _page: Number=1;
    public get page (): Number {
      return this._page;
    }
    public set page (v: Number) {
      this._page = v;
    }

    private _pageSize: Number=10;
    public get value (): Number {
      return this._pageSize;
    }
    public set value (v: Number) {
      this._pageSize = v;
    }
}
class Category {
  private _Id : number;
  public get Id () : number {
    return this._Id;
  }
  public set Id (v : number) {
    this._Id = v;
  }

  private _Name : string;
  public get Name () : string {
    return this._Name;
  }
  public set Name (v : string) {
    this._Name = v;
  }

  private _ParentId : number;
  public get ParentId () : number {
    return this._ParentId;
  }
  public set ParentId (v : number) {
    this._ParentId = v;
  }

  private _Path : string;
  public get Path () : string {
    return this._Path;
  }
  public set Path (v : string) {
    this._Path = v;
  }
  constructor (_Id = 0, _Name = '', _ParentId = 0, _Path = '') {
    this._Id = _Id;
    this._Name = _Name;
    this._ParentId = _ParentId;
    this._Path = _Path;
  }
}
export default class CMS {
  private _Author : string;
  public get Author () : string {
    return this._Author;
  }
  public set Author (v : string) {
    this._Author = v;
  }
  private _Body : string;
  public get Body () : string {
    return this._Body;
  }
  public set Body (v : string) {
    this._Body = v;
  }
  private _CatId : number;
  public get CatId () : number {
    return this._CatId;
  }
  public set CatId (v : number) {
    this._CatId = v;
  }
  private _Category : Category;
  public get Category () : Category {
    return this._Category;
  }
  public set Category (v : Category) {
    this._Category = v;
  }
  private _CmsControl : string;
  public get CmsControl () : string {
    return this._CmsControl;
  }
  public set CmsControl (v : string) {
    this._CmsControl = v;
  }
  private _Cover : string;
  public get Cover () : string {
    return this._Cover;
  }
  public set Cover (v : string) {
    this._Cover = v;
  }
  private _CreateDate : string;
  public get CreateDate () : string {
    return this._CreateDate;
  }
  public set CreateDate (v : string) {
    this._CreateDate = v;
  }

  private _CreateDateVal : string;
  public get CreateDateVal () : string {
    return this._CreateDateVal;
  }
  public set CreateDateVal (v : string) {
    this._CreateDateVal = v;
  }

  private _Desc : string;
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
  }

  private _ImagePath : string;
  public get ImagePath () : string {
    return this._ImagePath;
  }
  public set ImagePath (v : string) {
    this._ImagePath = v;
  }

  private _Key : string;
  public get Key () : string {
    return this._Key;
  }
  public set Key (v : string) {
    this._Key = v;
  }

  private _SeoDesc : string;
  public get SeoDesc () : string {
    return this._SeoDesc;
  }
  public set SeoDesc (v : string) {
    this._SeoDesc = v;
  }

  private _SeoKeyWord : string;
  public get SeoKeyWord () : string {
    return this._SeoKeyWord;
  }
  public set SeoKeyWord (v : string) {
    this._SeoKeyWord = v;
  }

  private _Status : number;
  public get Status () : number {
    return this._Status;
  }
  public set Status (v : number) {
    this._Status = v;
  }

  private _Title : string;
  public get Title () : string {
    return this._Title;
  }
  public set Title (v : string) {
    this._Title = v;
  }

  private _UpdateDate : string;
  public get UpdateDate () : string {
    return this._UpdateDate;
  }
  public set UpdateDate (v : string) {
    this._UpdateDate = v;
  }

  private _UpdateDateVal : string;
  public get UpdateDateVal () : string {
    return this._UpdateDateVal;
  }
  public set UpdateDateVal (v : string) {
    this._UpdateDateVal = v;
  }

  private _Url : string;
  public get Url () : string {
    return this._Url;
  }
  public set Url (v : string) {
    this._Url = v;
  }
  constructor (_Author = '', _Body = '', _CatId = 0, _Category = new Category(), _CmsControl = '', _Cover = '', _CreateDate = '', _CreateDateVal = '', _Desc = '', _Id = 0, _ImgPath = '', _Key = '', _SeoDesc = '', _SeoKeyword = '', _Status = 0, _Title = '', _UpdateDate = '', _UpdateDateVal = '', _Url = '') {
    this._Author = _Author;
    this._Body = _Body;
    this._CatId = _CatId;
    this._Category = _Category;
    this._CmsControl = _CmsControl;
    this._Cover = _Cover;
    this._CreateDate = _CreateDate;
    this._CreateDateVal = _CreateDateVal;
    this._Desc = _Desc;
    this._Id = _Id;
    this._ImagePath = _ImgPath;
    this._Key = _Key;
    this._SeoDesc = _SeoDesc;
    this._SeoKeyWord = _SeoKeyword;
    this._Status = _Status;
    this._Title = _Title;
    this._UpdateDate = _UpdateDate;
    this._UpdateDateVal = _UpdateDateVal;
    this._Url = _Url;
  }
}
export class CmsResult {
    Author!:string;
    Body!:string;
    CatId!:number;
    Category:object=
    { Id: '',
      Name: '',
      ParentId: '',
      Path: ''
    }
    Id!:number;
    Name!:string;
    ParentId!:number;
    Path!:string;
    Cover!:string;
    CreateDate!:string;
    CreateDateVal!:string;
    Desc!:string;
    ImagePath!:string;
    Key!:string;
    SeoDesc!:string;
    SeoKeyword!:string;
    Status!:number;
    Title!:string;
    UpdateDate!:string;
    UpdateDateVal!:string;
    Url!:string;
    constructor (item) {
      this.Author = item.Author;
      this.Body = item.Body;
      this.CatId = item.CatId;
      this.Category = item.Category;
      this.Id = item.Id;
      this.Name = item.Name;
      this.ParentId = item.ParentId;
      this.Path = item.Path;
      this.Cover = this.Cover;
      this.CreateDate = item.CreateDate;
      this.CreateDateVal = item.CreateDateVal;
      this.Desc = item.Desc;
      this.ImagePath = item.ImagePath;
      this.Key = item.Key;
      this.SeoDesc = item.SeoDesc;
      this.SeoKeyword = item.SeoKeyword;
      this.Status = item.Status;
      this.Title = item.Title;
      this.UpdateDate = item.UpdateDate;
      this.UpdateDateVal = item.UpdateDateVal;
      this.Url = item.Url;
    }
}
