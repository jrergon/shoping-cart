// tslint:disable:no-console

import Campaign from "./Campaign";
import Category from "./Category";
import Coupon from "./Coupon";
import DeliveryCostCalculator from "./DeliveryCostCalculator";
import Product from "./Product";
import ShoppingCartItem from "./ShoppingCartItem";

export default class ShoppingCart {
  // cart items
  private items: ShoppingCartItem[] = [];

  // coupon discount amount
  private couponDiscount: number = 0.0;

  // campaign discount amount
  private campaignDiscount: number = 0.0;

  /**
   * Adding product with given amount to cart
   * @param product product that added to cart
   * @param amount amount of added cart
   */
  public addItem(product: Product, amount: number) {
    const cartItem = new ShoppingCartItem(product, amount);
    this.items.push(cartItem);
  }

  /**
   * @returns {ShoppingCartItem[]} added items
   */
  public getItems(): ShoppingCartItem[] {
    return this.items;
  }

  /**
   * @returns {number} total price of cart without any discounts
   */
  public getTotalPrice(): number {
    let totalPrice: number = 0.0;

    for (const item of this.items) {
      totalPrice += item.getTotalPrice();
    }

    return totalPrice;
  }

  /**
   * @returns {number} campaign discount amount
   */
  public getCampaignDiscount(): number {
    return this.campaignDiscount;
  }

  /**
   * @returns {number} coupon discount amount
   */
  public getCouponDiscount(): number {
    return this.couponDiscount;
  }

  /**
   * @returns {number} cart price after discounts
   */
  public getTotalAmountAfterDiscounts(): number {
    return this.getTotalPrice() - this.getCampaignDiscount() - this.getCouponDiscount();
  }

  /**
   * Apply campaign discount to cart
   * @param {Campaign[]} campaigns campaign list to apply cart
   */
  public applyDiscounts(...campaigns: Campaign[]) {
    let maxDiscount: number = 0.0;

    for (const campaign of campaigns) {
      let discount = this.calcCampaignDiscount(campaign);

      if (discount > maxDiscount) {
        maxDiscount = discount;
      }
    }

    this.campaignDiscount = maxDiscount;
  }

  /**
   * Apply coupon discount to cart
   * @param {Coupon} coupon to apply cart
   */
  public applyCoupon(coupon: Coupon) {
    const price = this.getTotalPrice() - this.getCampaignDiscount();

    if (price < coupon.getMinPrice()) {
      return;
    }

    if (coupon.getType() === "RATE") {
      this.couponDiscount = (price * coupon.getAmount()) / 100;
    } else if (coupon.getType() === "AMOUNT") {
      this.couponDiscount = coupon.getAmount();
    }
  }

  /**
   * @returns {number} number of deliveries
   */
  public deliveryCount(): number {
    let categories: string[] = [];

    for (const item of this.items) {
      const categoryName = item.getProduct().getCategory().getName();
      if (categories.indexOf(categoryName) === -1) {
        categories.push(categoryName);
      }
    }

    return categories.length;
  }

  /**
   * @returns {number} count of items
   */
  public productCount(): number {
    let itemCount: number = 0;

    for (const item of this.items) {
      itemCount += item.getAmount();
    }

    return itemCount;
  }

  /**
   * @returns {number} delivery cost
   */
  public getDeliveryCost(): number {
    const costCalculator = new DeliveryCostCalculator(1.5, 2, 2.99);

    return costCalculator.calculateFor(this);
  }

  /**
   * printing cart information
   */
  public print() {
    let printedCategories: string[] = [];

    for (const item of this.items) {
      const category = item.getProduct().getCategory();
      if (printedCategories.indexOf(category.getName()) !== -1) {
        continue;
      }

      printedCategories.push(category.getName());
      console.log(category.getName());
      const categoryItems = this.findCategoryItems(category);

      for (const categoryItem of categoryItems) {
        const product = categoryItem.getProduct();
        console.log(product.getName() + " " + categoryItem.getAmount() +
          " " + product.getPrice() + " " + categoryItem.getTotalPrice());
      }
    }

    console.log(this.getTotalPrice());
    console.log("-" + this.getCampaignDiscount());
    console.log("-" + this.getCouponDiscount());
    console.log(this.getTotalAmountAfterDiscounts());
    console.log(this.getDeliveryCost());
  }

  /**
   * Find products that is in given category from cart
   * @param {Category} category searched category
   * @returns {ShoopingCartItem[]} a list of given category
   */
  private findCategoryItems(category: Category): ShoppingCartItem[] {
    let itemList: ShoppingCartItem[] = [];

    for (const item of this.items) {
      if (item.getProduct().getCategory().getName() === category.getName()) {
        itemList.push(item);
      }
    }

    return itemList;
  }

  /**
   * Calculate campaign discount for cart
   * @param {Campaign} campaign campaign to calculate discount
   * @returns {number} calculated discount amount
   */
  private calcCampaignDiscount(campaign: Campaign): number {
    let totalItemNumber: number = 0;
    let totalPrice: number = 0.0;

    // find cart items to apply campaign discount
    for (const item of this.items) {
      if (item.getProduct().isChild(campaign.getCategory())) {
        totalPrice += item.getTotalPrice();
        totalItemNumber += item.getAmount();
      }
    }

    if (totalItemNumber < campaign.getItem()) {
      return 0.0;
    }

    if (campaign.getType() === "RATE") {
      return (totalPrice * campaign.getAmount()) / 100;
    } else if (campaign.getType() === "AMOUNT") {
      return campaign.getAmount();
    }

    return 0.0;
  }
}
