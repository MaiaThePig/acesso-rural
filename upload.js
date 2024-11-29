// Função para converter o arquivo em Base64 e retornar uma Promise
async function encodeFileAsBase64 (file) {
  const reader = new FileReader()

  return new Promise((resolve, reject)=>{
      reader.onloadend = ()=>{
        if(reader.result){
          resolve(reader.result);
        }
      }

      reader.onerror = (err)=>{
        return reject(err);
      }

      if(!file){
        return resolve("");
      }

      reader.readAsDataURL(file);

  })
}

// Enviar os dados do formulário em um formato de payload
document.getElementById('product-form').addEventListener('submit', async function(event) {
  event.preventDefault();  // Impede o envio normal do formulário

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const price = document.getElementById('price').value;
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
    try {
      // Converte o arquivo para base64
      const fileBase64 = await encodeFileAsBase64(file);

      // Formar o payload
      const payload = {
        name: name,
        description: description,
        category: category,
        price: price,
        imgSrc: fileBase64
      };

      // URL para enviar os dados
      const url = 'http://localhost:8000/';

      // Enviar os dados via Fetch API
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Enviar como JSON
        },
        body: JSON.stringify(payload),  // Convertendo o payload em string JSON
      });

      const data = await response.json();
      console.log('Produto adicionado com sucesso:', data);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  } else {
    console.error('Nenhum arquivo selecionado');
  }
});
