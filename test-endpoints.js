const fetch = require('node-fetch');

async function testRegister() {
  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'user@example.com',
      name: 'John Doe',
      password: 'password'
    })
  });
  const data = await response.json();
  console.log('Register:', data);
}

async function testLogin() {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'password'
    })
  });
  const data = await response.json();
  console.log('Login:', data);
}

testRegister();
testLogin();