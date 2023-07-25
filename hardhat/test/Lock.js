const { expect } = require("chai");

describe("Soulbound Token Test", function () {
    let owner;

    beforeEach(async function () {
        // Retrieve the default account from ethers
        [owner] = await ethers.getSigners();

        // A helper to get the contracts instance and deploy it locally
        const Soulbound = await ethers.getContractFactory("Soulbound");
        soulbound = await Soulbound.deploy();
    });

    it("should mint a soulbound token", async () => {
        //Mint token ID 0 to owner address
        await soulbound.safeMint(owner.address);

        //Check that owner address owns the token ID 0
        const value = await soulbound.ownerOf(0);
        expect(value).to.equal(owner.address);
    });


    it("should revert when trying to transfer via safeTransferFrom", async () => {
        //Mint token ID 0 to owner address
        await soulbound.safeMint(owner.address);
        
        await expect(soulbound['safeTransferFrom(address,address,uint256)'](
            owner.address,
            "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
            0 // token id
        )).to.be.reverted;
    });

    it("should revert when trying to transfer via transferFrom", async () => {
        //Mint token ID 0 to owner address
        await soulbound.safeMint(owner.address);

        await expect(soulbound['transferFrom(address,address,uint256)'](
            owner.address,
            "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
            0 // token id
        )).to.be.reverted;
    });
});