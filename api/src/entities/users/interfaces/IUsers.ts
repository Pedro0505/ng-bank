interface IUsers {
  username: string;
  password: string;
}

interface IUsersId extends IUsers {
  id: string;
}

interface IUsersAccountId extends IUsersId {
  accountId: string;
}

export { IUsers, IUsersId, IUsersAccountId };
