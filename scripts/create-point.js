
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then(states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value= "${state.id}">${state.nome}</option`
        }
        
    })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectdState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectdState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`



    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true



    fetch(url)
    .then(res => res.json() )
    .then(cities => {

        for(const city of cities){
            citySelect.innerHTML += `<option value= "${city.nome}">${city.nome}</option`
        }

        citySelect.disabled = false
        
    })

}


document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)

/*itens de coleta 
pegar todos os li */

const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itensToCollect){
    item.addEventListener("click", handleSelecteditem)
}
const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []
function handleSelecteditem(event){
    const itemLi = event.target

    //add ou remover classe js
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id


    
    /*Verificar se existem itens selecionados, se sim pegar os itens selecionados 
    */


    const alreadySelected = selectedItens.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
        
    })
    //se já estiver selecionado tirar seleção

    if (alreadySelected >= 0) {
        //tirar seleção
        const filteredItens = selectedItens.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItens = filteredItens
    }
    else{
        // se nao addicona
        selectedItens.push(itemId)
        
    }
    console.log(selectedItens)
    //atualizar o campo

    collectedItens.value = selectedItens
}