import { expect } from 'chai';
import Campaign from '../../src/model/Campaign';
import Category from '../../src/model/Category';
import Product from '../../src/model/Product';
import ShoppingCart from '../../src/model/ShoppingCart';
import ShoppingCartItem from '../../src/model/ShoppingCartItem';
import DiscountType from '../../src/model/DiscountType';
import Coupon from '../../src/model/Coupon';

describe('ShoppingCart Model', function(){
  it('add item to cart', function() { 
    const category = new Category("food");
    const product = new Product("apple", 10.0, category);
    const cart = new ShoppingCart();
    cart.addItem(product, 3);

    expect(cart.getItems().length).to.equal(1);
  });

  it('total price of cart', function() { 
    const category = new Category("food");
    const apple = new Product("apple", 10.0, category);
    const banana = new Product("banana", 20.0, category);
    const cart = new ShoppingCart();
    cart.addItem(apple, 3);
    cart.addItem(banana, 2);

    expect(cart.getTotalPrice()).to.equal(70.0);
  });

  it('apply a rate campaign', function() { 
    const category = new Category("food");
    const campaign = new Campaign(category, 20.0, 3, DiscountType.Rate);
    const apple = new Product("apple", 10.0, category);
    const banana = new Product("banana", 25.0, category);
    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.applyDiscounts(campaign);

    expect(cart.getCampaignDiscount()).to.equal(20.0);
  });

  it('apply an amount campaign', function() { 
    const category = new Category("food");
    const campaign = new Campaign(category, 10.0, 6, DiscountType.Amount);

    const apple = new Product("apple", 10.0, category);
    const banana = new Product("banana", 25.0, category);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.applyDiscounts(campaign);

    expect(cart.getCampaignDiscount()).to.equal(10.0);
  });

  it('apply multiple campaign', function() { 
    const category = new Category("food");

    const campaignAmount = new Campaign(category, 10.0, 6, DiscountType.Amount);
    const campaignRate = new Campaign(category, 20.0, 3, DiscountType.Rate);

    const apple = new Product("apple", 10.0, category);
    const banana = new Product("banana", 25.0, category);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.applyDiscounts(campaignAmount, campaignRate);

    expect(cart.getCampaignDiscount()).to.equal(20.0);
  });

  it('apply multiple campaign with sub category', function() { 
    const food = new Category("food");
    const fruit = new Category("fruit", food);

    const campaignAmount = new Campaign(fruit, 10.0, 6, DiscountType.Amount);
    const campaignRate = new Campaign(fruit, 20.0, 3, DiscountType.Rate);
    const foodCampaign = new Campaign(food, 10.0, 4, DiscountType.Rate);

    const apple = new Product("apple", 10.0, fruit);
    const banana = new Product("banana", 25.0, fruit);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.applyDiscounts(campaignAmount, campaignRate, foodCampaign);

    expect(cart.getCampaignDiscount()).to.equal(20.0);
  });

  it('apply multiple campaign with sub category to parent', function() { 
    const food = new Category("food");
    const fruit = new Category("fruit", food);

    const campaignAmount = new Campaign(fruit, 10.0, 6, DiscountType.Amount);
    const campaignRate = new Campaign(fruit, 20.0, 3, DiscountType.Rate);
    const foodCampaign = new Campaign(food, 50.0, 4, DiscountType.Rate);

    const apple = new Product("apple", 10.0, fruit);
    const banana = new Product("banana", 25.0, fruit);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.applyDiscounts(campaignAmount, campaignRate, foodCampaign);

    expect(cart.getCampaignDiscount()).to.equal(50.0);
  });

  it('apply amount coupon', function() { 
    const food = new Category("food");
    const fruit = new Category("fruit", food);

    const coupon = new Coupon(100.0, 10.0, DiscountType.Amount);

    const apple = new Product("apple", 10.0, fruit);
    const banana = new Product("banana", 25.0, fruit);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.applyCoupon(coupon);

    expect(cart.getCouponDiscount()).to.equal(10.0);
  });

  it('apply rate coupon', function() { 
    const food = new Category("food");
    const fruit = new Category("fruit", food);

    const coupon = new Coupon(100.0, 20.0, DiscountType.Rate);

    const apple = new Product("apple", 10.0, fruit);
    const banana = new Product("banana", 25.0, fruit);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.applyCoupon(coupon);

    expect(cart.getCouponDiscount()).to.equal(20.0);
  });

  it('delivery count with single category', function() { 
    const food = new Category("food");
    const fruit = new Category("fruit", food);

    const coupon = new Coupon(100.0, 20.0, DiscountType.Rate);

    const apple = new Product("apple", 10.0, fruit);
    const banana = new Product("banana", 25.0, fruit);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);

    expect(cart.deliveryCount()).to.equal(1);
  });

  it('delivery count with two category', function() { 
    const food = new Category("food");
    const fruit = new Category("fruit", food);
    const vegetables = new Category("vegetables", food);

    const apple = new Product("apple", 10.0, fruit);
    const banana = new Product("banana", 25.0, fruit);
    const spinach = new Product("spinach", 25.0, vegetables);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.addItem(spinach, 1);

    expect(cart.deliveryCount()).to.equal(2);
  });

  it('item count', function() { 
    const food = new Category("food");
    const fruit = new Category("fruit", food);
    const vegetables = new Category("vegetables", food);

    const apple = new Product("apple", 10.0, fruit);
    const banana = new Product("banana", 25.0, fruit);
    const spinach = new Product("spinach", 25.0, vegetables);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.addItem(spinach, 1);

    expect(cart.productCount()).to.equal(8);
  });

  it('delivery cost', function() { 
    const food = new Category("food");
    const fruit = new Category("fruit", food);
    const vegetables = new Category("vegetables", food);

    const apple = new Product("apple", 10.0, fruit);
    const banana = new Product("banana", 25.0, fruit);
    const spinach = new Product("spinach", 25.0, vegetables);

    const cart = new ShoppingCart();
    cart.addItem(apple, 5);
    cart.addItem(banana, 2);
    cart.addItem(spinach, 1);
    
    expect(cart.getDeliveryCost()).to.equal(21.99);
  });
});