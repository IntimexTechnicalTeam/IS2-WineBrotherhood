export default class Catelog {
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

    private _RemarkID : string;
    public get RemarkID () : string {
      return this._RemarkID;
    }
    public set RemarkID (v : string) {
      this._RemarkID = v;
    }
    constructor (_Id = 0, _Img = '', _Name = '', _ParentId = 0, _RemarkID = '') {
      this._Id = _Id;
      this._Name = _Name;
      this._Img = _Img;
      this._ParentId = _ParentId;
      this._RemarkID = _RemarkID;
    }
}
