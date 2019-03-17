import Category from "./Category";

export default class Campaign {
  // product category that campaign runs on
  private category: Category;

  // discount amount
  private amount: number;

  // required minimum item to apply discount of campaign
  private item: number;

  // discount type
  private type: string;

  /**
   * Creates campaign for a category with discount and required amount
   * @param {Category} category product category to apply
   * @param {number} amount discount amount
   * @param {number} item minimum item number to apply discount
   * @param {string} type discount type
   */
  constructor(category: Category, amount: number, item: number, type: string) {
    this.category = category;
    this.amount = amount;
    this.item = item;
    this.type = type;
  }

  /**
   * @returns {Category} category of campaign
   */
  public getCategory(): Category {
    return this.category;
  }

  /**
   * @returns {number} discount amount
   */
  public getAmount(): number {
    return this.amount;
  }

  /**
   * @returns {number} required item number to apply campaign
   */
  public getItem(): number {
    return this.item;
  }

  /**
   * @returns {string} discount type
   */
  public getType(): string {
    return this.type;
  }
}
