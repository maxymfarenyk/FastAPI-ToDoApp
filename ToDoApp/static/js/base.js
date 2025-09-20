// Utility functions
function getCookie(name) {
    return document.cookie.split('; ')
        .find(row => row.startsWith(name + '='))
        ?.split('=')[1] || null;
}

function setCookie(name, value, minutes = 20) {
    const expires = new Date(Date.now() + minutes*60*1000).toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=/`;
}

function logout() {
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
    window.location.href = '/auth/login-page';
}

function showMessage(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
        el.style.display = 'block';
    } else {
        alert(message); // fallback
    }
}

function getTodoIdFromUrl() {
    const url = window.location.pathname;
    return url.substring(url.lastIndexOf('/') + 1);
}

// Common API Request
async function apiRequest(url, method = 'GET', payload = null, auth = false) {
    const headers = {};

    if (auth) {
        const token = getCookie('access_token');
        if (!token) throw new Error('Authentication token not found');
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (payload) {
        if (payload instanceof URLSearchParams) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        } else {
            headers['Content-Type'] = 'application/json';
            payload = JSON.stringify(payload);
        }
    }

    const response = await fetch(url, { method, headers, body: payload });
    let data;
    try { data = await response.json(); } catch { data = {}; }

    if (!response.ok) {
        const message = data.detail || data.message || 'Unknown error';
        throw new Error(message);
    }

    return data;
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const payload = new URLSearchParams(formData.entries());

        try {
            const data = await apiRequest('/auth/token', 'POST', payload);
            logout();
            setCookie('access_token', data.access_token);
            window.location.href = '/todos/todo-page';
        } catch (error) {
            console.error(error);
            showMessage('loginMessage', error.message);
        }
    });
}


// Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target).entries());

        if (formData.password !== formData.password2) {
            showMessage('registerMessage', "Passwords do not match");
            return;
        }

        const payload = {
            email: formData.email,
            username: formData.username,
            firstname: formData.firstname,
            lastname: formData.lastname,
            role: formData.role,
            phone_number: formData.phone_number,
            password: formData.password
        };

        try {
            await apiRequest('/auth', 'POST', payload);
            window.location.href = '/auth/login-page';
        } catch (error) {
            console.error(error);
            showMessage('registerMessage', error.message);
        }
    });
}


// Add Todo
const todoForm = document.getElementById('todoForm');
if (todoForm) {
    todoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submitBtn = todoForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        try {
            const formData = new FormData(todoForm);
            const data = Object.fromEntries(formData.entries());

            const title = (data.title || '').trim();
            if (!title) { alert('Title is required'); return; }

            const payload = {
                title,
                description: data.description || '',
                priority: Number.isFinite(parseInt(data.priority)) ? parseInt(data.priority) : 0,
                complete: false
            };

            await apiRequest('/todos/todo', 'POST', payload, true);
            window.location.href = '/todos/todo-page';
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}


// Edit Todo
const editTodoForm = document.getElementById('editTodoForm');
if (editTodoForm) {
    editTodoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(editTodoForm);
        const data = Object.fromEntries(formData.entries());
        const todoId = getTodoIdFromUrl();

        const payload = {
            title: data.title,
            description: data.description,
            priority: Number.isFinite(parseInt(data.priority)) ? parseInt(data.priority) : 0,
            complete: data.complete === "on"
        };

        try {
            await apiRequest(`/todos/todo/${todoId}`, 'PUT', payload, true);
            window.location.href = '/todos/todo-page';
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });
}


// Delete Todo
const deleteButton = document.getElementById('deleteButton');
if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
        const todoId = getTodoIdFromUrl();
        if (!confirm('Are you sure you want to delete this Todo?')) return;

        try {
            await apiRequest(`/todos/todo/${todoId}`, 'DELETE', null, true);
            window.location.href = '/todos/todo-page';
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });
}