exports.handleRegister = (knex, bcrypt) => async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }
  const hash = await bcrypt.hash(password, 10);
  knex
    .transaction(trx => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date(),
            })
            .then(user => res.json(user[0]));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('Unable to register'));
};

exports.handleLogin = (knex, bcrypt) => async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json('Need both email and password to sign in');
  }
  knex
    .select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      bcrypt.compare(req.body.password, data[0].hash, (err, result) => {
        if (err) return res.status(500).json('Error');
        if (result) {
          knex
            .select('*')
            .from('users')
            .where('email', '=', req.body.email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('Unable to get user'));
        } else {
          res.status(400).json('Wrong credentials');
        }
      });
    })
    .catch(err => res.status(400).json('Wrong credentials'));
};
