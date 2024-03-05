import CommunityMember from '../community/models/CommunityMember.js';
import assert from 'assert';

describe('Create CommunityMember in Database', () => {
    it('Create a new CommunityMember and verify CommunityID', (done) => {
      var newCommunityMember = new CommunityMember({ communityId: "ABC1", uid:"xyz1", role:100, timestamps: true});
      const expectedCommunityId= "ABC1";
      assert.equal(expectedCommunityId, newCommunityMember.communityId, "CommunityId does not match");      
      done();
    });
});

describe('Create CommunityMember in Database', () => {
    it('Create a new CommunityMember and verify UID', (done) => {
      var newCommunityMember = new CommunityMember({ communityId: "ABC1", uid:"xyz1", role:100, timestamps: true});
      const expectedUId= "xyz1";
      assert.equal(expectedUId, newCommunityMember.uid, "UId does not match");      
      done();
    });
});

describe('Create CommunityMember in Database', () => {
    it('Create a new CommunityMember and verify Role', (done) => {
      var newCommunityMember = new CommunityMember({ communityId: "ABC1", uid:"xyz1", role:100, timestamps: true});
      const expectedRole= 100;
      assert.equal(expectedRole, newCommunityMember.role, "Role does not match");      
      done();
    });
});
