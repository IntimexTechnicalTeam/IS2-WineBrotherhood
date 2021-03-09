export class BannerResult {
    Content!: string;
    Id!: string;
    Image!: string;
    IsRedirect!: boolean;
    Seq!: string;
    Url: string = '';
    constructor (
      Content: string = '',
      Id: string = '',
      Image: string = '',
      IsRedirect: boolean = false,
      Seq: string = '',
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
