module.exports = app => {
    app.use('/', require('./home'));

    app.use('/register', require('./auth/register.js'));
    app.use('/login', require('./auth/login.js'));

    app.use('/users', require('./user/users'));
    app.use('/user', require('./user/user'));

    app.use('/todos', require('./todos/todos'));

    app.use('/', require('./notFound'));
};
