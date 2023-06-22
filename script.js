const localStorageKey = 'Minha Lista'

function novaTarefa() {
    const input = document.getElementById('input-nova-tarefa')
    input.style.border = ''
    if(!input.value) {
        input.style.border = 'solid 1px red'
        alert('Digite Algo Para Inserir Na Lista')
    }else if(validarSeExisteNovaTarefa()){
        alert('Tarefa ja existente')
    }else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        mostrarTarefas()
    }
    input.value = ""
}

function validarSeExisteNovaTarefa() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-nova-tarefa').value
    let existe = values.find(x => x.name == inputValue)
    return !existe ? false:true
}

mostrarTarefas()

function mostrarTarefas() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let lista = document.getElementById('to-do-list')
    lista.innerHTML = ''
    for(let i = 0; i < values.length; i++) {
        lista.innerHTML += `<li>${values[i]['name']} <button id='btn-ok' onclick='removerTarefa("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
      </svg></button></li>`

    }
}

function removerTarefa(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.find(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    mostrarTarefas()
}