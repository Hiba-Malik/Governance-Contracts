//import { GovernorContract, GovernanceToken, TimeLock, Box } from "../../typechain-types"
const { expect } = require("chai");
//const { constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');


// const name = 'MyGovernor';
// // const version = '1';
// const tokenName = 'FishyVerseToken';
// const tokenSymbol = 'FVTK';

describe("Governance flow", function () {


  beforeEach(async function () {

    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("FishyVerseToken");
    const Timelock = await ethers.getContractFactory("TimeLock");
    const Governer = await ethers.getContractFactory("MyGovernor");

    this.token = await Token.deploy("1000000");
    this.timelock = await Timelock.deploy("0", [], []);
    this.governer = await Governer.deploy(this.token.address, this.timelock.address);

    // normal setup: governor is proposer, everyone is executor, timelock is its own admin
    await this.timelock.grantRole(await this.timelock.PROPOSER_ROLE(), this.governer.address);
    await this.timelock.grantRole(await this.timelock.EXECUTOR_ROLE(), "0x0000000000000000000000000000000000000000");
    await this.timelock.revokeRole(await this.timelock.TIMELOCK_ADMIN_ROLE(), owner.address);
    await this.token.delegate(owner.address, { from: owner.address });
  });

  it("post deployment check", async function () {

    expect(await this.governer.name()).to.be.equal("MY Governance");
    expect(await this.governer.token()).to.be.equal(this.token.address);

    expect(await this.governer.timelock()).to.be.equal(this.timelock.address);
  });

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("FishyVerseToken");
    const Timelock = await ethers.getContractFactory("TimeLock");
    const Governer = await ethers.getContractFactory("MyGovernor");

    const token = await Token.deploy("1000000");
    const timelock = await Timelock.deploy("0", [], []);
    const governer = await Governer.deploy(token.address, timelock.address);

    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Create an active proposal", async function () {
    const encodedFunctionCall = this.token.interface.encodeFunctionData("store", [77])
    const proposeTx = await this.governor.propose(
      [this.token.address],
      [0],
      [encodedFunctionCall],
      "First Proposal"
    );
    const proposeReceipt = await proposeTx.wait(1)
    const proposalId = proposeReceipt.events[0].args.proposalId
    let proposalState = await governor.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)
  })
});

