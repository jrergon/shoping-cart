import ShoppingCart from "./ShoppingCart";

export default class DeliveryCostCalculator {
  // cost per delivery
  private costPerDelivery: number;

  // cost per product
  private costPerProduct: number;

  // fixed cost
  private fixedCost: number;

  /**
   * Init calculator with costs
   * @param {number} costPerDelivery cost per delivery
   * @param {number} costPerProduct cost per product
   * @param {number} fixedCost fixed cost
   */
  constructor(costPerDelivery: number, costPerProduct: number, fixedCost: number) {
    this.costPerDelivery = costPerDelivery;
    this.costPerProduct = costPerProduct;
    this.fixedCost = fixedCost;
  }

  /**
   * Calculate delivery cost for given cart
   * @param {ShoppingCart} cart to calculate
   * @returns {number} delivery cost
   */
  public calculateFor(cart: ShoppingCart): number {
    const deliveryCost = this.costPerDelivery * cart.deliveryCount();
    const productCost = this.costPerProduct * cart.productCount();
    const totalCost = deliveryCost + productCost + this.fixedCost;

    return +totalCost.toFixed(2);
  }
}
