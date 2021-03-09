export class Province {
    private _Code : string;
    public get Code () : string {
      return this._Code;
    }
    public set Code (v : string) {
      this._Code = v;
    }

    private _CountryId : number;
    public get CountryId () : number {
      return this._CountryId;
    }
    public set CountryId (v : number) {
      this._CountryId = v;
    }

    private _Id : number;
    public get Id () : number {
      return Number(this._Id);
    }
    public set Id (v : number) {
      this._Id = v;
    }

    private _Language : string;
    public get Language () : string {
      return this._Language;
    }
    public set Language (v : string) {
      this._Language = v;
    }

    private _Name : string;
    public get Name () : string {
      return this._Name;
    }
    public set Name (v : string) {
      this._Name = v;
    }
    /**
     * 以下的属性作用是什么
     */
    // private _Name_c : string;
    // public get Name_c () : string {
    //   return this._Name_c;
    // }
    // public set Name_c (v : string) {
    //   this._Name_c = v;
    // }

    // private _Name_e : string;
    // public get Name_e () : string {
    //   return this._Name_e;
    // }
    // public set Name_e (v : string) {
    //   this._Name_e = v;
    // }

    // private _Name_j : string;
    // public get Name_j () : string {
    //   return this._Name_j;
    // }
    // public set Name_j (v : string) {
    //   this._Name_j = v;
    // }

    // private _Name_s : string;
    // public get Name_s () : string {
    //   return this._Name_s;
    // }
    // public set Name_s (v : string) {
    //   this._Name_s = v;
    // }

    // private _date_changed : string;
    // public get date_changed () : string {
    //   return this._date_changed;
    // }
    // public set date_changed (v : string) {
    //   this._date_changed = v;
    // }

    // private _is_Del : string;
    // public get is_Del () : string {
    //   return this._is_Del;
    // }
    // public set is_Del (v : string) {
    //   this._is_Del = v;
    // }

    // private _provItem : string;
    // public get provItem () : string {
    //   return this._provItem;
    // }
    // public set provItem (v : string) {
    //   this._provItem = v;
    // }
    constructor (_Code:string = '', _CountryId:number = 0, _Id:number = 0, _Language:string = '', _Name:string = '') {
      this._Code = _Code;
      this._CountryId = _CountryId;
      this._Id = _Id;
      this._Language = _Language;
      this._Name = _Name;
    }
}
