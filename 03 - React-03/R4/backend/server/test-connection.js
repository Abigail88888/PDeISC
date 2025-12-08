const Parse = require('parse/node');

Parse.initialize(
  "Q2WukQXWAAmYTZUIPPq4Uo7iENELuZBoxGI49Ncf",
  "sMtLGCMT5D6sxxgehCGTR0kfyG7luA0t5yqXVTM0",
  "rUaKJtCg46kuqu1qXWTYqEMoRAvnW7tHUxHAdgYL"
);
Parse.serverURL = 'https://parseapi.back4app.com';

async function test() {
  try {
    console.log('Probando conexión...');
    const TestObject = Parse.Object.extend("Test");
    const obj = new TestObject();
    obj.set("hello", "world");
    await obj.save();
    console.log('✅ Conexión exitosa!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();