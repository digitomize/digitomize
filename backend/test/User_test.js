import User from '../users/models/User.js';
import assert from 'assert';
import {benchtest} from "benchtest";

it = benchtest.it(it);
describe = benchtest.describe(describe);

describe('Create User in Database', () => {
    it('Create a new User and verify UID', (done) => {
      console.time('Test Time');
      var newUser = new User({ uid: "tp42182024", username: "Username1", email_verified: true});
      const expectedUID= "tp42182024";
      assert.equal(expectedUID, newUser.uid, "UID does not match");
      console.timeEnd('Test Time');
      done();
    });
});

describe('Create User in Database', () => {
    it('Create a new User and verify Username', (done) => {
      console.time('Test Time');
      var newUser = new User({ uid: "tp42182024", username: "Username1", email_verified: true});
      const expectedName= "Username1";
      assert.equal(expectedName, newUser.username, "Username does not match");
      console.timeEnd('Test Time');
      done();
    });
});

describe('Create User in Database', () => {
    it('Create a new User and verify Email', (done) => {
      console.time('Test Time');
      var newUser = new User({ uid: "tp42182024", username: "Username1", email_verified: true});
      const expectedName= true;
      assert.equal(expectedName, newUser.email_verified, "Email was not verifed");
      console.timeEnd('Test Time');
      done();
    });
});

describe('Create User in Database', () => {
    it('Create a new User and verify Email', (done) => {
        console.time('Test Time');
        var newUser = new User({ uid: "tp42182024", username: "Username1", role: 1, email_verified: true});
        const expectedNumber = 1;
        assert.equal(expectedNumber, newUser.role, "Role number is not valid");
        console.timeEnd('Test Time');
        done();
    });
});