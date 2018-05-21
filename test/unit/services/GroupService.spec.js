const chai = require("chai");
const sinon = require("sinon");

const GroupService = require("./../../../src/service/GroupService");
const expect = chai.expect;

describe("Test GroupService", () => {

    it("Should create new group", async () => {
       const groupFake = {
           name: "Group Fake"
       };

       const daoFake = {
           findByName: sinon.stub(),
           save: sinon.stub()
       };

       daoFake.findByName.withArgs(groupFake.name).returns([]);
       daoFake.save.withArgs(groupFake).returns([groupFake]);
       const groupService = new GroupService(daoFake);
       const groupSaved = await groupService.save(groupFake);
       chai.assert.lengthOf(groupSaved, 1);
    });
});