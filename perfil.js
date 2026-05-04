// 1. Alternar entre Login y Registro
function toggleAuth() {
    const loginDiv = document.getElementById('login-form');
    const registerDiv = document.getElementById('register-form');
    
    if (loginDiv.style.display === "none") {
        loginDiv.style.display = "block";
        registerDiv.style.display = "none";
    } else {
        loginDiv.style.display = "none";
        registerDiv.style.display = "block";
    }
}

// 2. Función de Registro
function register() {
    const user = document.getElementById('reg-user').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if (user === "" || pass === "") {
        alert("Por favor, completa los campos obligatorios.");
        return;
    }

    // Guardamos el objeto usuario en LocalStorage
    const userData = {
        username: user,
        password: pass,
        email: email
    };

    localStorage.setItem('userStored', JSON.stringify(userData));
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    toggleAuth(); // Volver al login
}

// 3. Función de Login
function login() {
    const userIn = document.getElementById('login-user').value;
    const passIn = document.getElementById('login-pass').value;
    
    // Recuperamos los datos guardados
    const data = localStorage.getItem('userStored');
    
    if (!data) {
        alert("No hay usuarios registrados.");
        return;
    }

    const userObj = JSON.parse(data);

    if (userIn === userObj.username && passIn === userObj.password) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.reload(); // Recargamos para que checkSession haga su magia
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

// 4. Verificar sesión al cargar
function checkSession() {
    const status = localStorage.getItem('isLoggedIn');
    const authContainer = document.getElementById('auth-container');
    const perfilContent = document.getElementById('perfil-content');
    const nav = document.getElementById('main-nav');
    const data = localStorage.getItem('userStored');

    if (status === 'true' && data) {
        const userObj = JSON.parse(data);
        if (authContainer) authContainer.style.display = "none";
        if (perfilContent) perfilContent.style.display = "block";
        if (nav) nav.style.display = "flex";
        
        // Llenar datos en el perfil
        document.getElementById('display-name').innerText = userObj.username;
        document.getElementById('display-username').innerText = "@" + userObj.username.toLowerCase();
    }
}

// 5. Salir
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
}

// Ejecutar checkSession cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', checkSession);