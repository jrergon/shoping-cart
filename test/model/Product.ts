import { expect } from 'chai';
import Category from '../../src/model/Category';
import Product from '../../src/model/Product';

describe('Category Model', function(){
  it('init', function() { 
    const category = new Category("food");
    const product = new Product("apple", 100.0, category);

    expect(product.getName()).to.equal("apple");
    expect(product.getPrice()).to.equal(100.0);
    expect(product.getCategory().getName()).to.equal("food");
  });

  it('isChild', function() { 
    const category = new Category("food");
    const product = new Product("apple", 100.0, category);

    expect(product.isChild(category)).to.equal(true);
  });

  it('isChild with sub category', function() { 
    const food = new Category("food");
    const vegetables = new Category("vegetables", food);
    const product = new Product("apple", 100.0, vegetables);

    expect(product.isChild(food)).to.equal(true);
  });

  it('isChild with sub category to get false', function() { 
    const food = new Category("food");
    const dress = new Category("dress");
    const vegetables = new Category("vegetables", food);

    const product = new Product("apple", 100.0, vegetables);

    expect(product.isChild(dress)).to.equal(false);
  });
});