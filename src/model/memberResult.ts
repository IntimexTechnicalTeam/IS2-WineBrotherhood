export class MemberResult {
    Email!: string;
    Password!: string;
    ConfirmPassword!: string;
    FirstName!: string;
    LastName!: string;
    Mobile!: string;
    BirthMD!: string;
    BirthDate!: string;
    BirthDateString!: string;
    Language!: string ;
    Gender!:string;
    MemberId!:string;
    private _Message: string;
    public get Message (): string {
      return this._Message;
    }
    public set Message (v: string) {
      this._Message = v;
    }
    private _Code: string;
    public get Code (): string {
      return this._Code;
    }
    public set Code (v: string) {
      this._Code = v;
    }
    constructor (
      MemberId: string = '',
      Email: string = '',
      Password: string = '',
      ConfirmPassword: string = '',
      FirstName: string = '',
      LastName: string = '',
      Mobile: string = '',
      BirthMD: string = '',
      BirthDate: string = '',
      BirthString: string = '',
      Language: string = '0',
      Gender:string = '0'
    ) {
      this.MemberId = MemberId;
      this.Email = Email;
      this.Password = Password;
      this.ConfirmPassword = ConfirmPassword;
      this.FirstName = FirstName;
      this.LastName = LastName;
      this.Mobile = Mobile;
      this.BirthMD = BirthMD;
      this.Language = Language;
      this.Gender = Gender;
      this.BirthDate = BirthDate;
      this.BirthDateString = BirthString;
      this._Message = '';
      this._Code = '';
    }
}
