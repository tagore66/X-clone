const backendURL = 'https://x-clone-k842.onrender.com';
const messageDiv = document.getElementById('message');

// Signup modal controls
const signupModal = document.getElementById('signup-modal');
const showSignupBtn = document.getElementById('show-signup');
const signupCloseBtn = document.getElementById('signup-close');
const signupSubmitBtn = document.getElementById('signup-submit');

// Login modal controls
const loginModal = document.getElementById('login-modal');
const showLoginBtn = document.getElementById('show-login');
const loginCloseBtn = document.getElementById('login-close');
const loginSubmitBtn = document.getElementById('login-submit');

// Show/hide modals
showSignupBtn.onclick = () => { signupModal.style.display = 'flex'; };
signupCloseBtn.onclick = () => { signupModal.style.display = 'none'; };
showLoginBtn.onclick = () => { loginModal.style.display = 'flex'; };
loginCloseBtn.onclick = () => { loginModal.style.display = 'none'; };

// Handle fake Google/Apple signup (show error message)
document.getElementById('google-btn').onclick = 
document.getElementById('apple-btn').onclick = (e) => {
  e.preventDefault();
  showToast('Server error, try creating new account', true);
};

// Signup form action
signupSubmitBtn.onclick = async () => {
  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  if (!username || !email || !password) {
    showToast('All fields are required.', true);
    return;
  }
  try {
    const res = await fetch(`${backendURL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      showToast('Signup successful!');
      signupModal.style.display = 'none';

      setTimeout(() => {
        window.location.href = "feed.html"; // redirect to feed
      }, 800);

    } else {
      showToast(data.message || 'Signup failed!', true);
    }
  } catch (err) {
    showToast('Network/server error', true);
  }
};

// Login form action
loginSubmitBtn.onclick = async () => {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  if (!email || !password) {
    showToast('All fields are required.', true);
    return;
  }
  try {
    const res = await fetch(`${backendURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      showToast('Login successful!');
      loginModal.style.display = 'none';

      setTimeout(() => {
        window.location.href = "feed.html"; // redirect to feed
      }, 800);

    } else {
      showToast(data.message || 'Login failed!', true);
    }
  } catch (err) {
    showToast('Network/server error', true);
  }
};

// Toast/message helper
function showToast(msg, error) {
  messageDiv.textContent = msg;
  messageDiv.style.color = error ? 'red' : 'lightgreen';
  setTimeout(() => { messageDiv.textContent = ''; }, 4000);
}

// Optional: close modal when clicking outside content
window.onclick = (event) => {
  if (event.target === signupModal) signupModal.style.display = 'none';
  if (event.target === loginModal) loginModal.style.display = 'none';
};

// Splash screen hide logic
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  if (!splash) return;

  setTimeout(() => {
    splash.classList.add('hidden');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 700);
  }, 1500);
});
