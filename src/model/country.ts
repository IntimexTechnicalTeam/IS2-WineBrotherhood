export class Country {
    private _Code : string;
    public get Code () : string {
      return this._Code;
    }
    public set Code (v : string) {
      this._Code = v;
    }

    private _Id : string;
    public get Id () : string {
      return this._Id;
    }
    public set Id (v : string) {
      this._Id = v;
    }

    private _Name : string;
    public get Name () : string {
      return this._Name;
    }
    public set Name (v : string) {
      this._Name = v;
    }

    private _Selected : boolean;
    public get Selected () : boolean {
      return this._Selected;
    }
    public set Selected (v : boolean) {
      this._Selected = v;
    }
    /**
     * 以下属性尚不清楚作用，而且命名没有符合规范
     */
    // private _Code2 : string;
    // public get Code2 () : string {
    //   return this._Code2;
    // }
    // public set Code2 (v : string) {
    //   this._Code2 = v;
    // }

    // private _Code3 : string;
    // public get Code3 () : string {
    //   return this._Code3;
    // }
    // public set Code3 (v : string) {
    //   this._Code3 = v;
    // }

    // private _CountryItem : string;
    // public get CountryItem () : string {
    //   return this._CountryItem;
    // }
    // public set CountryItem (v : string) {
    //   this._CountryItem = v;
    // }

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

    // private _Provice : string;
    // public get Provice () : string {
    //   return this._Provice;
    // }
    // public set Provice (v : string) {
    //   this._Provice = v;
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

    constructor (_Code:string = '', _Id:string = '', _Name = '', _Selected:boolean = false) {
      this._Code = _Code;
      this._Id = _Id;
      this._Name = _Name;
      this._Selected = _Selected;
    }
}
