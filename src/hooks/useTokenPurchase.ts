export const purchaseToken = async (tokenId: number, priceInEther: number): Promise<boolean> => {
  try {
    const web3 = new Web3(window.ethereum as any);
    const contract = new web3.eth.Contract(TokenK_ABI as any, CONTRACT_ADDRESS);

    const accounts = await web3.eth.getAccounts();
    const buyer = accounts[0];

    const valueInWei = web3.utils.toWei(String(priceInEther), "ether");

    await contract.methods.buyToken(Number(tokenId)).send({
      from: buyer,
      value: valueInWei,
    });

    toast.success("Compra realizada com sucesso!");
    return true;
  } catch (error: any) {
    console.error("Erro ao comprar token:", error);
    toast.error(error.message || "Erro na transação");
    return false;
  }
};
