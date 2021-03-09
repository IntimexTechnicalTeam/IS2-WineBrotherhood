import { ProductApi } from './api/ProductApi';
import { ShoppingCartApi } from './api/ShoppingCartApi';
import storage from './common/Storage';
import { MemberApi } from './api/MemberApi';
import { CmsApi } from './api/CmsApi';
import { PromotionApi } from './api/PromotionApi';
import { CheckoutApi } from './api/CheckoutApi';
import { OrderApi } from './api/OrderApi';
import { AddressApi } from './api/AddressApi';
import { PaymentApi } from './api/PaymentApi';
// import { PromotionApi } from "./promotionApi";
// import { CustomerServiceApi } from "./customerServiceApi";
import { DeliveryApi } from './api/DeliveryApi';
import { ApiVersion } from './common/SysConst';
import { MessageApi } from './api/MessageApi';
import { PointsApi } from './api/PointsApi';
import { ProdAttrApi } from './api/ProdAttrApi';
import { CommentsApi } from './api/CommentsApi';
import RegAndPayApi from './api/RegAndPayApi';

export class Api {
public product: ProductApi ;
public shoppingCart: ShoppingCartApi ;
public checkout: CheckoutApi;
public order: OrderApi;
public address: AddressApi;
public paymentApi: PaymentApi;
public messageApi: MessageApi;
public promotion: PromotionApi;
public delivery: DeliveryApi;
public member: MemberApi;
public cms: CmsApi | undefined;
public pointsApi: PointsApi;
public prodAttrApi: ProdAttrApi;
public comments: CommentsApi;
public regAndPay: RegAndPayApi;
constructor () {
  this.product = ProductApi.getInstance();
  this.shoppingCart = ShoppingCartApi.getInstance();
  this.checkout = CheckoutApi.getInstance();
  this.order = OrderApi.getInstance();
  this.address = AddressApi.getInstance();
  this.paymentApi = PaymentApi.getInstance();
  this.member = MemberApi.getInstance();
  this.cms = CmsApi.getInstance();
  this.promotion = PromotionApi.getInstance();
  // this.member = new MemberApi();
  this.promotion = new PromotionApi();
  this.delivery = DeliveryApi.getInstance();
  this.messageApi = MessageApi.getInstance();
  this.pointsApi = PointsApi.getInstance();
  this.comments = CommentsApi.getInstance();
  this.prodAttrApi = new ProdAttrApi();
  this.regAndPay = RegAndPayApi.getInstance();
}
}

export class InstoreSdk {
  ver: string;
  public api: Api;
  constructor () {
    this.ver = ApiVersion;
    this.api = new Api();
    console.log('InstoreSdk inited');
  }
  isLogin (): boolean {
    var logined = storage.get('logined');
    return logined === '1';
  }
}

let SDK = new InstoreSdk();
export default SDK;
