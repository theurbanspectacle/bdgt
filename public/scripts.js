$(document).ready(() => {
  setTimeout(() => {
    const splash = $('.splash');

    if (splash) {
      splash.remove();
    }
  }, 5000);
});

const renderError = (errorText, errorBody) => {
  M.toast({html: errorText});
  console.error(errorText, errorBody);
};

const logIn = () => {
  location.href = "/login";
};

const openBdgt = () => {
  location.href = "/bdgt";
};

const aboutUs = () => {
  location.href = "/about-us";
};

// Function to press Enter button to log in
const loginEnter = (event) => {
  if (event.which === 13) {
    logInSubmit();
  }
};

const logInSubmit = () => {
  const email = $('#log-in-form #email').val();
  const password = $('#log-in-form #password').val();

  if (!email || !password) {
    renderError('Form is invalid.');
    return;
  }

  fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => Promise.reject(data));
    }
  }).then(() => {
    location.href = "/bdgt";
  }).catch((err) => {
    renderError(`Unable to save${err?.message ? `: ${err.message}` : ''}`, err);
  });
};

const signUpEnter = (event) => {
  if (event.which === 13) {
    signUpSubmit();
  }
};

const signUpSubmit = () => {
  const first_name = $('#sign-up-form #first_name').val();
  const last_name = $('#sign-up-form #last_name').val();
  const email = $('#sign-up-form #email').val();
  const password = $('#sign-up-form #password').val();

  if (!first_name || !last_name || !email || !password) {
    renderError('Form is invalid');
    return;
  }
  if (password.length < 5) {
    renderError('Password must be more than 5 characters.');
    return;
  }

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
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => Promise.reject(data));
    }
  }).then(() => {
    location.href = "/bdgt";
  }).catch((err) => {
    renderError(`Unable to save${err?.message ? `: ${err.message}` : ''}`, err);
  });
};
