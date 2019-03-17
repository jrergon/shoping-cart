import Category from "./Category";

export default class Product {
  // product name
  private name: string;

  // product price
  private price: number;

  // product category
  private category: Category;

  /**
   * Creates product with name, price and parent category
   * @param {string} name product name
   * @param {number} price product price
   * @param {Category} category product category
   */
  constructor(name: string, price: number, category: Category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }

  /**
   * @returns {string} product name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns {number} product price
   */
  public getPrice(): number {
    return this.price;
  }

  /**
   * @returns {Category} product category
   */
  public getCategory(): Category {
    return this.category;
  }

  /**
   * Check product is a child item of given category
   * @param {Category} category category to check the product is in it
   * @param {Category|null} productParent product's parent category
   * @returns {boolean} true if product is child of given category, false otherwise
   */
  public isChild(category: Category, productParent: Category|null = null): boolean {
    if (productParent === null) {
      productParent = this.getCategory();
    }

    const parentCategory = productParent.getParentCategory();

    if (productParent.getName() === category.getName()) {
      return true;
    } else if (parentCategory === null) {
      return false;
    } else {
      return this.isChild(category, parentCategory);
    }
  }
}
