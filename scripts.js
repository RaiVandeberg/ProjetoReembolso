//Seleciona os elementos  do formularios
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista de despesas

const expensesList = document.querySelector("ul");

// Capturando o evento de input para formatar o valor
amount.oninput = () => {
    // obtem o valor atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "");

    // Transformar o valor em centavos (Ex: 150/100 = 1.50)

    value = Number(value) / 100;

    // atualiza o valor do input
    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL (value){
    // formata o valor para o formato de moeda brasileira
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    // retorna o valor formatado

    return value;

}

// Captura do evento de submit do formulário para obter os valores
form.onsubmit = (event) => {

    // previne o comportamento padrão do formulário
    event.preventDefault(); 

    // Cria um objeto com os detalhes da despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
        }
        // Chama a função que irá adicionar a despesa
        expenseAdd(newExpense);
 }

 function expenseAdd (newExpense){
     try {
        // Cria o elemento para adicionar o item na lista
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense")


        // Cria o icone da categoria

        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        // Adicona as informações no item
        expenseItem.append(expenseIcon)
        
        // adiciona o item na lista
        expensesList.append(expenseItem);
     } catch (error) {
        alert("Erro ao adicionar despesa");
        
     }
 }