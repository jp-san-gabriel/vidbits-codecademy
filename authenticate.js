const administrators = {
  root: 'rootpassword',
  admin: 'password',
  jp: 'jppassword',
  cathy: 'cathypassword',
  king: 'kingpassword'
};

// authenticates a user from a list of administrators
const authenticate = (credentials) => {
  return administrators[credentials.user] === credentials.password;
};

module.exports = {
  administrators,
  authenticate
};
