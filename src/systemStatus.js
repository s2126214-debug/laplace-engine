let sceneText;

export function createSystemStatus() {

    const panel = document.createElement("div");

    panel.id = "system-status";

    panel.innerHTML = `

        <div class="status-title">

            SYSTEM STATUS

        </div>

        <div class="status-item">

            <span>ENGINE</span>

            <span id="engine-status">ONLINE</span>

        </div>

        <div class="status-item">

            <span>MODE</span>

            <span id="mode-status">OBSERVATION</span>

        </div>

        <div class="status-item">

            <span>SCENE</span>

            <span id="scene-status">INTRO</span>

        </div>

    `;

    document.body.appendChild(panel);

    sceneText = document.getElementById("scene-status");

}

export function updateSceneStatus(name){

    if(sceneText){

        sceneText.textContent = name;

    }

}