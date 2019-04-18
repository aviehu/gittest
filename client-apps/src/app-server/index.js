import path from 'path';

import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyStatic from 'fastify-static';

import loginRender from './login-renderer';
import mainRender from './main-renderer';

const app = fastify({
  // logger: {
  //   level: 'trace'
  // }
});

app.register(fastifyStatic, {
  root: path.resolve('dist')
});

app.register(fastifyCookie);

const users = {
  oz: '123'
};

function checkCookie(request, reply) {
  if (request.cookies && request.cookies.cred) {
    const { email, password } = JSON.parse(request.cookies.cred);

    if (users[email] === password) {
      return true;
    }
  }

  reply.redirect('/login');
  return false;
}

app.get('/', async (request, reply) => {
  if (!checkCookie(request, reply)) {
    return;
  }

  const data = await mainRender();

  reply.header('Content-Type', 'text/html');

  reply.send(data);
});

app.get('/login', async (request, reply) => {
  const data = await loginRender();

  reply.header('Content-Type', 'text/html');

  reply.send(data);
});

app.post('/login', async (request, reply) => {
  const { email, password } = request.body;

  if (users[email] === password) {
    reply.setCookie('cred', JSON.stringify({ email: 'oz', password: '123' }));
  }

  reply.send();
});

const start = async () => {
  try {
    await app.listen(3000);
  } catch (error) {
    app.log.error(error);
  }
};
start();
