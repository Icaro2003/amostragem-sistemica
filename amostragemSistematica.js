function amostragemSistematica(N, n) {
    const k = parseInt(N / n);

    const r = Math.floor(Math.random() * (k - 1 + 1) + 1);

    let amostra = [];

    for (let i = 0; i < n; i++) {
        amostra.push(r + (i * k));
    }

    return amostra;
}

const formAmostra = document.getElementById("formAmostra");
const amostra = document.getElementById("amostra");
const btnEnviar = document.getElementById("btnEnviar");

let isLoading = false;

const amostraStyle = `
    background-color: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

formAmostra.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isLoading) {
        return;
    }

    isLoading = true;
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";

    amostra.style.cssText = `
        background-color: #fff;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    `;

    const tamanhoAmostra = Number(document.getElementById("tamanhoAmostra").value);
    const tamanhoPopulacao = Number(document.getElementById("tamanhoPopulacao").value);

    try {
        const valoresAmostra = amostragemSistematica(tamanhoPopulacao, tamanhoAmostra);

        amostra.innerHTML = "";

        valoresAmostra.forEach((valor => {
            const item = document.createElement("div");
            item.textContent = valor;
            amostra.appendChild(item);
        }));
    } catch (error) {
        amostra.textContent = error;
    } finally {
        setTimeout(() => {
            btnEnviar.disabled = false;
            btnEnviar.textContent = "Enviar";
            isLoading = false;
        }, 400);
    }
});
