
export interface Transaction {
  id: string;
  tokenId: string;
  type: 'buy' | 'sell';
  fractions: number;
  price: number;
  total: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
  address: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    tokenId: "1",
    type: 'buy',
    fractions: 50,
    price: 0.05,
    total: 2.5,
    timestamp: new Date(Date.now() - 86400000 * 2),
    status: 'completed',
    txHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    address: '0xaBcD...1234'
  },
  {
    id: "tx2",
    tokenId: "3",
    type: 'sell',
    fractions: 25,
    price: 0.08,
    total: 2,
    timestamp: new Date(Date.now() - 86400000 * 1),
    status: 'completed',
    txHash: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u',
    address: '0xaBcD...1234'
  },
  {
    id: "tx3",
    tokenId: "2",
    type: 'buy',
    fractions: 100,
    price: 0.12,
    total: 12,
    timestamp: new Date(Date.now() - 3600000 * 5),
    status: 'pending',
    txHash: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v',
    address: '0xaBcD...1234'
  }
];
