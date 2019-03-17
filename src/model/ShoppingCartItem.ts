import Product from "./Product";

export default class ShoppingCartItem {
  // product that added to card
  private product: Product;

  // amount of product that added to cart
  private amount: number;

  /**
   * @param {Product} product product that added to card
   * @param {number} amount amount of product that added to cart
   */
  constructor(product: Product, amount: number) {
    this.product = product;
    this.amount = amount;
  }

  /**
   * @returns {Product} added product
   */
  public getProduct(): Product {
    return this.product;
  }

  /**
   * @returns {number} amount of added product
   */
  public getAmount(): number {
    return this.amount;
  }

  /**
   * @returns {number} total price of added product
   */
  public getTotalPrice(): number {
    return this.product.getPrice() * this.amount;
  }
}
