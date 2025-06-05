// ====== AUTH ======
function saveToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// ====== REGISTER ======
async function registerUser(username, password) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "login.html";
  } else {
    alert(data.message || "Gagal registrasi");
  }
}

// ====== LOGIN ======
async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (res.ok) {
    saveToken(data.token);
    window.location.href = "index.html";
  } else {
    alert(data.message || "Login gagal");
  }
}

// ====== NOTES ======
async function fetchNotes() {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 || res.status === 403) {
    logout();
  }

  const data = await res.json();
  return data;
}

async function createNote(note) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/add-note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });

  return await res.json();
}

async function updateNote(id, note) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/edit-note/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });

  return await res.json();
}

async function deleteNote(id) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/delete-note/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}
