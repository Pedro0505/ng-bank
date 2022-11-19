interface ITransactionsMap {
  id: string;
  createdAt: string;
  creditedUser: string;
  debitedUser: string;
  value: number;
  type: string;
  transferParticipant: string;
}

export default ITransactionsMap;
