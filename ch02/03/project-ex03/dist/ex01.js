'use strict';

var users = [{
  no: 0,
  name: 'kickscar',
  email: 'kickscar@gmail.com'
}, {
  no: 1,
  name: 'dooly',
  email: 'dooly@gmail.com'
}];

function print(_ref) {
  var no = _ref.no,
      name = _ref.name,
      email = _ref.email;
  console.log("".concat(no, " : ").concat(name, " : ").concat(email));
}

for (var _i = 0, _users = users; _i < _users.length; _i++) {
  var user = _users[_i];
  print(user);
}
