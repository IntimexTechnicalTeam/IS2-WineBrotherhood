import lang from '@/lang';
export default class Tab {
  // title!: string;
  action!: string[];
  // content!: string;

  // private _Title : string;
  // public get Title () : string {
  //   return this._Title;
  // }
  // public set Title (v : string) {
  //   this._Title = v;
  // }

  private _OverView : string;
  public get OverView () : string {
    return this._OverView;
  }
  public set OverView (v : string) {
    this._OverView = v;
    if (v) { this.setTabs('OverView'); this.setTabsName((lang.messages[lang.locale].product as any).overView as string); }
  }

  private _Specification : string;
  public get Specification () : string {
    return this._Specification;
  }
  public set Specification (v : string) {
    this._Specification = v;
    if (v) { this.setTabs('Specification'); this.setTabsName((lang.messages[lang.locale].product as any).specification as string); }
  }
  private _Detail : string;
  public get Detail () : string {
    return this._Detail;
  }
  public set Detail (v : string) {
    this._Detail = v;
    if (v) { this.setTabs('Detail'); this.setTabsName((lang.messages[lang.locale].product as any).detail as string); }
  }
  private __Tabs : string[] = [];
  public get Tabs () : string[] {
    return this.__Tabs;
  }
  public setTabs (name) {
    this.__Tabs.push(name);
  }

  private __TabsName : string[] = [];
  public get TabsName () : string[] {
    return this.__TabsName;
  }
  public setTabsName (v) {
    this.__TabsName.push(v);
  }

  constructor (_OverView: string = '', _Specification: string = '', _Detail: string = '', action: string[] = []) {
    this._OverView = _OverView;
    this._Detail = _Detail;
    this._Specification = _Specification;
    this.action = action;
  }
}
