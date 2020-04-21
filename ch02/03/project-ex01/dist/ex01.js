'use strict';

const users = [{
  no: 0,
  name: 'kickscar',
  email: 'kickscar@gmail.com'
}, {
  no: 1,
  name: 'dooly',
  email: 'dooly@gmail.com'
}];

function print({
  no,
  name,
  email
}) {
  console.log(`${no} : ${name} : ${email}`);
}

for (let user of users) {
  print(user);
}
