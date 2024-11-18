document.addEventListener("DOMContentLoaded", () => {
    // Función para redirigir a game.html
    function redirectToGame() {
        console.log("Redirection to game triggered");
        window.location.href = '/game';
    }

    // Función para guardar sesiones en localStorage
    function saveSessions(sessions) {
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }

    // Función para cargar sesiones desde localStorage
    function loadSessions() {
        const savedSessions = localStorage.getItem('sessions');
        return savedSessions ? JSON.parse(savedSessions) : [];
    }

    // Función para añadir una sesión a la lista en el DOM
    function addSessionToDOM(sessionName, sessionPassword) {
        const sessionList = document.getElementById("sessionList");

        const sessionItem = document.createElement("div");
        sessionItem.className = "session-item";

        sessionItem.innerHTML = `
            <span>${sessionName}</span>
            <button onclick="joinSession('${sessionName}', '${sessionPassword}')">Unirse</button>
            <button onclick="deleteSession('${sessionName}')">X</button>
        `;

        sessionList.appendChild(sessionItem);
    }

    // Función para eliminar una sesión
    window.deleteSession = function(sessionName) {
        // Eliminar del DOM
        const sessionList = document.getElementById("sessionList");
        sessionList.innerHTML = ''; // Limpiar la lista para recargar las sesiones actualizadas

        // Eliminar del localStorage
        let sessions = loadSessions();
        sessions = sessions.filter(session => session.name !== sessionName);
        saveSessions(sessions);

        // Recargar la lista actualizada de sesiones
        sessions.forEach(session => {
            addSessionToDOM(session.name, session.password);
        });
    };

    // Función para crear una nueva sesión
    window.createSession = function() {
        const sessionName = document.getElementById("sessionName").value;
        const sessionPassword = document.getElementById("sessionPassword").value;

        if (sessionName && sessionPassword) {
            addSessionToDOM(sessionName, sessionPassword);

            // Guardar la nueva sesión en localStorage
            const sessions = loadSessions();
            sessions.push({ name: sessionName, password: sessionPassword });
            saveSessions(sessions);

            document.getElementById("sessionName").value = '';
            document.getElementById("sessionPassword").value = '';
        } else {
            alert("Por favor, ingresa un nombre y una contraseña para la sesión.");
        }
    };

    // Función para unirse a una sesión
    window.joinSession = function(sessionName, sessionPassword) {
        const enteredPassword = prompt(`Ingresa la contraseña para la sesión "${sessionName}":`);

        if (enteredPassword === sessionPassword) {
            redirectToGame();
        } else {
            alert("Contraseña incorrecta. Intenta de nuevo.");
        }
    };

    // Cargar y mostrar sesiones desde localStorage al cargar la página
    const sessions = loadSessions();
    sessions.forEach(session => {
        addSessionToDOM(session.name, session.password);
    });

    // Crear una sesión de prueba por defecto si no hay sesiones guardadas
    if (sessions.length === 0) {
        addSessionToDOM("Sesion de Prueba", "123456");
        // También guardar esta sesión de prueba en localStorage
        sessions.push({ name: "Sesion de Prueba", password: "123456" });
        saveSessions(sessions);
    }
});
