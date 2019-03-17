export default class Category {
  // category name
  private name: string;

  // parent category
  private category: Category|null;

  /**
   * Creates category with given name
   * @param {string} name name of category
   * @param {Category|null} category parent category
   */
  constructor(name: string, category: Category|null = null) {
    this.name = name;
    this.category = category;
  }

  /**
   * @returns {string} category name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @returns {Category|null} parent category
   */
  public getParentCategory(): Category|null {
    return this.category;
  }
}
