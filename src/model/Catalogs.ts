export default class Catalogs {
    private _Id : number;
    public get Id () : number {
      return this._Id;
    }
    public set Id (v : number) {
      this._Id = v;
    }

    private _Img : string;
    public get Img () : string {
      return this._Img;
    }
    public set Img (v : string) {
      this._Img = v;
    }

    private _ImgB : string;
    public get ImgB () : string {
      return this._ImgB;
    }
    public set ImgB (v : string) {
      this._ImgB = v;
    }

    private _ImgS : string;
    public get ImgS () : string {
      return this._ImgS;
    }
    public set ImgS (v : string) {
      this._ImgS = v;
    }

    private _Letter : string;
    public get Letter () : string {
      return this._Letter;
    }
    public set Letter (v : string) {
      this._Letter = v;
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

    private _Remark : string;
    public get Remark () : string {
      return this._Remark;
    }
    public set Remark (v : string) {
      this._Remark = v;
    }

    private _RemarkID : string;
    public get RemarkID () : string {
      return this._RemarkID;
    }
    public set RemarkID (v : string) {
      this._RemarkID = v;
    }

    private _Children : Catalogs[];
    public get Children () : Catalogs[] {
      return this._Children;
    }
    public set Children (v : Catalogs[]) {
      this._Children = v;
    }

    constructor (_Id:number = 0, _Img:string = '', _Letter:string = '', _Name:string = '', _ParentId:number = 0, _Remark:string = '', _RemarkID:string = '', _Children:Catalogs[] = []) {
      this._Id = _Id;
      this._Img = _Img;
      this._ImgB = _Img;
      this._ImgS = _Img;
      this._Letter = _Letter;
      this._Name = _Name;
      this._ParentId = _ParentId;
      this._Remark = _Remark;
      this._RemarkID = _RemarkID;
      this._Children = _Children;
    }
}
