import { expect } from 'chai';
import Category from '../../src/model/Category';

describe('Category Model', function(){
  it('init', function() { 
    const category = new Category("food");

    expect(category.getName()).to.equal("food");
    expect(category.getParentCategory()).to.equal(null);
  });

  it('init with parent', function() { 
    const foodCategory = new Category("food");
    const vegetableCategory = new Category("vegetables", foodCategory);
    const parentCategory = vegetableCategory.getParentCategory();

    expect(vegetableCategory.getName()).to.equal("vegetables");
    
    if (parentCategory) {
      expect(parentCategory.getName()).to.equal("food");
    }
  });
});