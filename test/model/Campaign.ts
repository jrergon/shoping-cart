import { expect } from 'chai';
import Campaign from '../../src/model/Campaign';
import Category from '../../src/model/Category';
import DiscountType from '../../src/model/DiscountType';

describe('Campaign Model', function(){
  it('init with rate', function() { 
    const category = new Category("food");
    const campaign = new Campaign(category, 20.0, 5, DiscountType.Rate);

    expect(campaign.getCategory().getName()).to.equal("food");
    expect(campaign.getAmount()).to.equal(20.0);
    expect(campaign.getItem()).to.equal(5);
    expect(campaign.getType()).to.equal("RATE");
  });

  it('init with amount', function() { 
    const category = new Category("food");
    const campaign = new Campaign(category, 5.0, 5, DiscountType.Amount);

    expect(campaign.getCategory().getName()).to.equal("food");
    expect(campaign.getAmount()).to.equal(5.0);
    expect(campaign.getItem()).to.equal(5);
    expect(campaign.getType()).to.equal("AMOUNT");
  });
});