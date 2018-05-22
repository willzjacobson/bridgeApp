// yarn add express-validator
// Include as middleware

// define this in another file
const userSchema = {
  email: {
    nonEmpty: true,
    isEmail: {
      errorMessage: 'Invalid Email',
    },
  },
  password: {
    nonEmpty: true,
    isLength: {
      options: [{ min: 12 }],
      errorMessage: 'Password must be at least 12 characters.',
    },
    matches: {
      options: ['(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[!*&/^%$#@()+]+).*', 'g'],
      errorMessage: 'Password must be alphanumeric',
    },
    errorMessage: 'Invalid password',
  },
};

const router = { post: () => {} };

router.post('/api/user/register', (req, res) => {
  req.checkBody(userSchema);
  const errors = req.validationErrors();
  if (errors) {
    return res.status(500).json(errors);
  }
  // feel free to put the data in the database now!
});

/*
  For login/register requests, you can implement a 1 second delay before sending the response
  A legit user won't really notice, but it will dramatically slow down a bot.

  As increased measure, can track login attempts in the database. 
  Create a schema that contains these fields:
   - identity key (unique)
   - failedAttempts (when they'll be able to log back in)
   - timeout
   - inProgress

   static methods:
    - canAuthenticate (are they under max login attempts, do they have time left in timeout)
    - failedLoginAttempt (captures a failed attempt by this login)
    - successfulLoginAttempt (cleans up after ourselves after successful login)
    - inProgress (a flag used to block parallel login attempts)
*/
