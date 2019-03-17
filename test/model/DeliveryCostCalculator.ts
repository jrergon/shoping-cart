import { expect } from 'chai';
import Category from '../../src/model/Category';
import Product from '../../src/model/Product';
import ShoppingCart from '../../src/model/ShoppingCart';
import DeliveryCostCalculator from '../../src/model/DeliveryCostCalculator';

describe('DeliveryCostCalculator Model', function(){
  it('calculate', function() { 
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

    const costCalculator = new DeliveryCostCalculator(1.5, 2.0, 2.99);
    
    expect(costCalculator.calculateFor(cart)).to.equal(21.99);
  });
});