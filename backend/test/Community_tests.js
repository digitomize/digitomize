import Community from '../community/models/Community.js';
import assert from 'assert';

describe('Create Community in Database', () => {
    it('Create a new Community and verify CommunityID', (done) => {
      var newCommunity = new Community({ name: "Community1", description: "Description1", vanity: "Vanity1", timestamps: true});
      const expectedName= "Community1";

      assert.equal(expectedName, newCommunity.name, "Name does not match");  
      done();
    });
});

describe('Create Community in Database', () => {
    it('Create a new Community and verify Description', (done) => {
      var newCommunity = new Community({ name: "Community1", description: "Description1", vanity: "Vanity1", timestamps: true});
      const expectedDescription= "Description1";

      assert.equal(expectedDescription, newCommunity.description, "Description does not match");      
      done();
    });
});

describe('Create Community in Database', () => {
    it('Create a new Community and verify Vanity', (done) => {
      var newCommunity = new Community({ name: "Community1", description: "Description1", vanity: "Vanity1", timestamps: true});
      const expectedVanity= "vanity1";

      assert.equal(expectedVanity, newCommunity.vanity, "Vanity does not match");      
      done();
    });
});