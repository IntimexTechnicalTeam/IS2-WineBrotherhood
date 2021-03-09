export default class Comments {
  public CommentDate : string;
  public CommentImages : CommentImages[];
  public Content : string;
  public Id : string;
  public IsDelete : boolean;
  public IsShow : boolean;
  public OrderId : number;
  public ProductImg : string;
  public ProductName : string;
  public ReplyContent : string;
  public ReplyId : string;
  public ReplyImages : CommentImages[];
  public ShopperId : string;
  public ShopperName : string;
  public Sku : string;
  public Sorce : number;
  constructor (CommentDate = '', CommentImages = [], Content = '', Id = '00000000-0000-0000-0000-000000000000', IsDelete = false, IsShow = false, OrderId = 0, ProductImg = '', ProductName = '', ReplyContent = '', ReplyId = '', ReplyImages = [], ShopperId = '', ShopperName = '', Sku = '', Sorce = 0) {
    this.CommentDate = CommentDate;
    this.CommentImages = CommentImages;
    this.Content = Content;
    this.Id = Id;
    this.IsDelete = IsDelete;
    this.IsShow = IsShow;
    this.OrderId = OrderId;
    this.ProductImg = ProductImg;
    this.ProductName = ProductName;
    this.ReplyContent = ReplyContent;
    this.ReplyId = ReplyId;
    this.ReplyImages = ReplyImages;
    this.ShopperId = ShopperId;
    this.ShopperId = ShopperId;
    this.ShopperName = ShopperName;
    this.Sku = Sku;
    this.Sorce = Sorce;
  }
}
export class CommentImages {
  public Id : string | undefined;
  public BigImagePath : string | undefined;
  public CommentId : string | undefined;
  public ImageName : string | undefined;
  public IsDelete : boolean | undefined;
  public SmallImagePath : string | undefined;
  constructor (ImageName = undefined, BigImagePath = undefined, Id = undefined, CommentId = undefined, IsDelete = undefined, SmallImagePath = undefined) {
    this.Id = Id;
    this.BigImagePath = BigImagePath;
    this.CommentId = CommentId;
    this.IsDelete = IsDelete;
    this.ImageName = ImageName;
    this.SmallImagePath = SmallImagePath;
  }
}
