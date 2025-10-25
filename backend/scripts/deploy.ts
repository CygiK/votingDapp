import { network } from "hardhat";

const { viem } = await network.connect({
  network: "localhost",
});

async function main() {
    console.log("Déploiement en cours...");

    const Counter = await viem.deployContract("Counter");
    console.log("Counter déployé à l'adresse :", Counter.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
