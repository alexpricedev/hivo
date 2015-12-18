let login = (options) => {
  _validate(options.form);
};

let _validate = (form) => {
  $(form).validate(_validation());
};

let _validation = () => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.'
      }
    },
    submitHandler() {
      _handleLogin();
    }
  };
};

let _handleLogin = () => {
  let email = $('[name="emailAddress"]').val();
  let password = $('[name="password"]').val();

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    }
  });
};

Modules.client.login = login;
