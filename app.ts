import Campaign from "./src/model/Campaign";
import Category from "./src/model/Category";
import Product from "./src/model/Product";
import ShoppingCart from "./src/model/ShoppingCart";
import ShoppingCartItem from "./src/model/ShoppingCartItem";
import DiscountType from "./src/model/DiscountType";
import Coupon from "./src/model/Coupon";

const food = new Category("food");
const fruit = new Category("fruit", food);
const vegetables = new Category("vegetables", food);

const apple = new Product("apple", 10.0, fruit);
const banana = new Product("banana", 25.0, fruit);
const spinach = new Product("spinach", 25.0, vegetables);

const campaignAmount = new Campaign(fruit, 10.0, 6, DiscountType.Amount);
const campaignRate = new Campaign(fruit, 20.0, 3, DiscountType.Rate);
const foodCampaign = new Campaign(food, 50.0, 4, DiscountType.Rate);
const coupon = new Coupon(50.0, 5.0, DiscountType.Amount);

const cart = new ShoppingCart();
cart.addItem(apple, 5);
cart.addItem(banana, 2);
cart.addItem(spinach, 1);

cart.applyDiscounts(campaignAmount, campaignRate, foodCampaign);
cart.applyCoupon(coupon);

cart.print();