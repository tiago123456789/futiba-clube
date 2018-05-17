const UserService = require("./../../../src/service/UserService");
const Encode = require("./../../../src/lib/Encode");
const MESSAGES_APP = require("./../../../src/lib/MessagesApp");
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should;

describe("Tests UserService", () => {
    const accountFake = {
        "name": "Teste", 
        "password": "1234",
        "role": "USER",
        email: "teste@gmail.com"
    };

    const daoFake = {
        searchUserPerEmail: sinon.stub(),
        save: sinon.spy()
    };

    it("Should create user", async () => {
        accountFake.password = await Encode.getHash(accountFake.password);
        daoFake.searchUserPerEmail.withArgs(accountFake.email).returns([]);
        const userService = new UserService(daoFake);
        await userService.create(accountFake);
        assert(daoFake.save.withArgs(accountFake).calledOnce);
    });

    it("Should authenticated user", async () => {
        accountFake.password = await Encode.getHash(accountFake.password);
        daoFake.searchUserPerEmail.withArgs(accountFake.email).returns(accountFake);
        const userService = new UserService(daoFake);
        const { email, password } = accountFake;
        userService.authenticate({ email, password });
    })
});