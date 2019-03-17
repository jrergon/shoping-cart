import { expect } from 'chai';
import Category from '../../src/model/Category';
import Product from '../../src/model/Product';
import ShoppingCartItem from '../../src/model/ShoppingCartItem';

describe('ShoppingCartItem Model', function(){
  it('init', function() { 
    const category = new Category("food");
    const product = new Product("apple", 10.0, category);
    const item = new ShoppingCartItem(product, 3);

    expect(item.getProduct().getName()).to.equal("apple");
    expect(item.getAmount()).to.equal(3);
  });

  it('total price', function() { 
    const category = new Category("food");
    const product = new Product("apple", 10.0, category);
    const item = new ShoppingCartItem(product, 3);

    expect(item.getTotalPrice()).to.equal(30.0);
  });
});