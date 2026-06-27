export function createProbability() {

    const container = document.createElement("div");

    container.id = "probability";

    container.innerHTML = `
        <div id="prob-title">
            Prediction Accuracy
        </div>

        <div id="prob-value">
            99.999999%
        </div>
    `;

    document.body.appendChild(container);

    container.style.opacity = "0";

    const value = container.querySelector("#prob-value");

    setInterval(() => {

        // 99.999900 ～ 99.999999 の間だけを表示
        const accuracy = 99.999900 + Math.random() * 0.000099;

        value.textContent = accuracy.toFixed(6) + "%";

    }, 150);

}