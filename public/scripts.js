$(document).ready(() => {
  setTimeout(() => {
    const splash = $('.splash');

    if (splash) {
      splash.remove();
    }
  }, 5000);
});

const signUp = () => {
  location.href = "/sign-up";
};

const aboutUs = () => {
  location.href = "/about-us";
};

const signUpSubmit = () => {
  const first_name = $('#sign-up-form #first_name').val();
  const last_name = $('#sign-up-form #last_name').val();
  const email = $('#sign-up-form #email').val();
  const password = $('#sign-up-form #password').val();

  if (!first_name || !last_name || !email || !password) {
    //TODO: Show user that it's not done.
    return;
  }

  const handleError = (err) => {
    console.log('Sign up submit button failed.', err);
    // TODO: Show user that it failed.
  };

  fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      first_name, 
      last_name,
      email,
      password
    }),
  }).then(response => response.json()).then((response) => {
    if (response.ok) {
      location.href = "/bdgt";
    } else {
      handleError(response);
    }
  }).catch((err) => {
    handleError(err);
  });
};