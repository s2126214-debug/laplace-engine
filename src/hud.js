export function createHUD() {

    const hud = document.createElement("div");

    hud.id = "hud";

    hud.innerHTML = `

    <div id="title">LAPLACE ENGINE</div>

    <div id="subtitle">Predicting the Universe...</div>

    <div id="log"></div>

    `;

    document.body.appendChild(hud);

    const log=document.getElementById("log");

    const messages=[

        "INITIALIZING...",
        "Loading Physical Constants...",
        "Observing Matter...",
        "Observing Gravity...",
        "Predicting Future...",
        "Probability Engine Online",
        "Universe Locked"

    ];

    let i=0;

    function next(){

        if(i>=messages.length)return;

        const p=document.createElement("div");

        p.textContent="> "+messages[i];

        p.className="line";

        log.appendChild(p);

        i++;

        setTimeout(next,1200);

    }

    next();

}