document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const cepInput = document.getElementById('cep-input');
    const addressInfo = document.getElementById('address-info');

    searchButton.addEventListener('click', () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        if (cep.length !== 8) {
            alert('Por favor, insira um CEP válido com 8 dígitos.');
            return;
        }
        const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado. Verifique o CEP digitado.');
                } else {
                    const addressHTML = `
                        <h2>Endereço Encontrado:</h2>
                        <p>CEP: ${data.cep}</p>
                        <p>Logradouro: ${data.logradouro}</p>
                        <p>Complemento: ${data.complemento}</p>
                        <p>Bairro: ${data.bairro}</p>
                        <p>Cidade/UF: ${data.localidade}/${data.uf}</p>
                    `;
                    addressInfo.innerHTML = addressHTML;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o endereço:', error);
                alert('Não foi possível obter o endereço. Verifique sua conexão com a internet.');
            });
    });
});