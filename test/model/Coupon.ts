import { expect } from 'chai';
import Coupon from '../../src/model/Coupon';
import Category from '../../src/model/Category';
import DiscountType from '../../src/model/DiscountType';

describe('Coupon Model', function(){
  it('init with rate', function() { 
    const category = new Category("food");
    const coupon = new Coupon(100.0, 10.0, DiscountType.Rate);

    expect(coupon.getMinPrice()).to.equal(100.0);
    expect(coupon.getAmount()).to.equal(10.0);
    expect(coupon.getType()).to.equal("RATE");
  });

  it('init with rate', function() { 
    const category = new Category("food");
    const coupon = new Coupon(100.0, 20.0, DiscountType.Amount);

    expect(coupon.getMinPrice()).to.equal(100.0);
    expect(coupon.getAmount()).to.equal(20.0);
    expect(coupon.getType()).to.equal("AMOUNT");
  });
});