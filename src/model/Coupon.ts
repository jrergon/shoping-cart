export default class Coupon {
  // minimum price to use coupon
  private minPrice: number;

  // discount amount
  private amount: number;

  // discount type
  private type: string;

  /**
   * Creates coupon that apply discount to cart if it meets minimum price req.
   * @param {number} minPrice minimum price to apply coupon
   * @param {number} amount discount amount
   * @param {string} type discount type
   */
  constructor(minPrice: number, amount: number, type: string) {
    this.minPrice = minPrice;
    this.amount = amount;
    this.type = type;
  }

  /**
   * @returns {number} minimum price
   */
  public getMinPrice(): number {
    return this.minPrice;
  }

  /**
   * @returns {number} discount amount
   */
  public getAmount(): number {
    return this.amount;
  }

  /**
   * @returns {string} discount type
   */
  public getType(): string {
    return this.type;
  }
}
