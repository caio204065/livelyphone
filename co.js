document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.songButton');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const songTitle = this.getAttribute('data-song');
      console.log(`Música selecionada: ${songTitle}`);

      // Enviar comando para o servidor
      sendCommandToServer({
        action: 'play_song',
        song: {
          title: songTitle
        }
      });
    });
  });

  // Função para enviar comandos ao servidor
  function sendCommandToServer(command) {
    fetch('https://clear-glimmer-pet.glitch.me/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(command)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Música iniciada!') {
        // Exibir a resposta no vídeo
        document.getElementById('message').innerText = `Música ${command.song.title} iniciada com sucesso!`;
        document.getElementById('message').style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Erro ao enviar o comando:', error);
    });
  }
});
