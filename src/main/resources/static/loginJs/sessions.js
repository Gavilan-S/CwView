document.addEventListener("DOMContentLoaded", () => {
    window.createSession = function() {
        const sessionName = document.getElementById("sessionName").value;
        const sessionPassword = document.getElementById("sessionPassword").value;

        if (sessionName && sessionPassword) {
            const sessionList = document.getElementById("sessionList");

            const sessionItem = document.createElement("div");
            sessionItem.className = "session-item";

            sessionItem.innerHTML = `
                <span>${sessionName}</span>
                <button onclick="joinSession('${sessionName}', '${sessionPassword}')">Unirse</button>
            `;

            sessionList.appendChild(sessionItem);

            document.getElementById("sessionName").value = '';
            document.getElementById("sessionPassword").value = '';
        } else {
            alert("Por favor, ingresa un nombre y una contraseña para la sesión.");
        }
    };

    function redirectToGame() {
        console.log("Redirection to game triggered"); 
        window.location.href = '/game';
    }
    

    window.joinSession = function(sessionName, sessionPassword) {
        const enteredPassword = prompt(`Ingresa la contraseña para la sesión "${sessionName}":`);

        if (enteredPassword === sessionPassword) {
            redirectToGame();
        } else {
            alert("Contraseña incorrecta. Intenta de nuevo.");
        }
    };
});
