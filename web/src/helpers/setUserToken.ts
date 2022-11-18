const setUserToken = (token: string) => {
  localStorage.setItem('@ng-bank/token', token);
};

export default setUserToken;
