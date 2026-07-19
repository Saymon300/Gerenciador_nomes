let lista_nomes = [];

const inputNome = document.getElementById("txtNome");
const listaNomesEl = document.getElementById("listaNomes");
const resultado = document.getElementById("resultado");

document.getElementById("btnAdicionar").addEventListener("click", adicionarNome);
inputNome.addEventListener("keydown", e => { if (e.key === "Enter") adicionarNome(); });

const inputFiltro = document.getElementById("txtFiltro");
const inputBusca = document.getElementById("txtBusca");

document.getElementById("btnFiltrar").addEventListener("click", filtrarNomes);
inputFiltro.addEventListener("keydown", e => { if (e.key === "Enter") filtrarNomes(); });

document.getElementById("btnBuscar").addEventListener("click", buscarNome);
inputBusca.addEventListener("keydown", e => { if (e.key === "Enter") buscarNome(); });
document.getElementById("btnMaiusculo").addEventListener("click", mostrarMaiusculo);
document.getElementById("btnVerificar").addEventListener("click", verificarNomes);

function renderizarLista() {
    listaNomesEl.innerHTML = "";

    if (lista_nomes.length === 0) {
        let vazio = document.createElement("li");
        vazio.textContent = "Nenhum nome cadastrado.";
        vazio.classList.add("vazio");
        listaNomesEl.appendChild(vazio);
        return;
    }

    lista_nomes.forEach((nome, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = nome;
        li.appendChild(span);

        let remover = document.createElement("button");
        remover.type = "button";
        remover.textContent = "Remover";
        remover.addEventListener("click", () => {
            lista_nomes.splice(index, 1);
            renderizarLista();
        });

        li.appendChild(remover);
        listaNomesEl.appendChild(li);
    });
}

function adicionarNome() {
    let nome = inputNome.value.trim();

    if (nome === "") {
        resultado.textContent = "Digite um nome válido.";
        return;
    }

    let jaExiste = lista_nomes.some(n => n.toLowerCase() === nome.toLowerCase());

    if (jaExiste) {
        resultado.textContent = `"${nome}" já está na lista.`;
        return;
    }

    lista_nomes.push(nome);
    inputNome.value = "";
    renderizarLista();
    resultado.textContent = `"${nome}" adicionado.`;
}

function filtrarNomes() {
    let letra = document.getElementById("txtFiltro").value.trim();

    if (letra === "") {
        resultado.textContent = "Digite uma letra para filtrar.";
        return;
    }

    let filtrados = lista_nomes.filter(nome =>
        nome.toLowerCase().startsWith(letra.toLowerCase())
    );

    resultado.textContent = filtrados.length
        ? `Nomes com "${letra}": ${filtrados.join(", ")}`
        : `Nenhum nome começa com "${letra}".`;
}

function buscarNome() {
    let busca = document.getElementById("txtBusca").value.trim();

    if (busca === "") {
        resultado.textContent = "Digite um nome para buscar.";
        return;
    }

    let encontrado = lista_nomes.find(nome =>
        nome.toLowerCase() === busca.toLowerCase()
    );

    resultado.textContent = encontrado ? `Encontrado: ${encontrado}` : "Nome não encontrado.";
}

function mostrarMaiusculo() {
    if (lista_nomes.length === 0) {
        resultado.textContent = "Lista vazia.";
        return;
    }

    resultado.textContent = lista_nomes.map(nome => nome.toUpperCase()).join(", ");
}

function verificarNomes() {
    if (lista_nomes.length === 0) {
        resultado.textContent = "Lista vazia.";
        return;
    }

    let todos = lista_nomes.every(nome => nome.length > 3);

    resultado.textContent = todos
        ? "Todos os nomes têm mais de 3 caracteres."
        : "Nem todos os nomes têm mais de 3 caracteres.";
}
