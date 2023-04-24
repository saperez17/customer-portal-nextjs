const shops = [
  {
    id: 1,
    shopName: 'Little Colombia',
    shopUrl: 'http://littleColombia.com',
  },
  {
    id: 2,
    shopName: 'Awesome Shirts',
    shopUrl: 'http://AwesomeShirts.com',
  },
  {
    id: 3,
    shopName: 'RacingBinking',
    shopUrl: 'http://RacingBinking.com',
  },
  {
    id: 4,
    shopName: 'Prestisge House',
    shopUrl: 'http://PrestisgeHouse.com',
  },
];

const users = [
  {
    id: 1,
    name: 'Rick',
    email: 'rick@cartoon.com',
    shopId: 1,
    password: 'ThisIsATestPassword.!?',
  },
  {
    id: 2,
    name: 'Morty',
    email: 'morty@cartoon.com',
    shopId: 2,
    password: 'ThisIsATestPassword.!?',
  },
  {
    id: 3,
    name: 'Jacob Forbes',
    email: 'JacobForbes@gmail.com',
    shopId: 4,
    password: '0000',
  },
  {
    id: 4,
    name: 'Adrian Ward',
    email: 'AdrianWard@gmail.com',
    shopId: 4,
    password: '0000',
  },
];

module.exports = {
  shops,
  users,
};
