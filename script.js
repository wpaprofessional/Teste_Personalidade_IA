document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let scores = { A: 0, B: 0, C: 0, D: 0 };
    const answers = document.querySelectorAll('input[type="radio"]:checked');

    answers.forEach(answer => {
        scores[answer.value]++;
    });

    let maxScore = 0;
    let personality = '';
    for (const [key, value] of Object.entries(scores)) {
        if (value > maxScore) {
            maxScore = value;
            personality = key;
        }
    }

    let personalityDescription = '';
    switch (personality) {
        case 'A':
            personalityDescription = 'Você é uma pessoa Analista: lógica e precisão são suas forças!';
            break;
        case 'B':
            personalityDescription = 'Você é uma pessoa Diplomata: empatia e comunicação são suas habilidades!';
            break;
        case 'C':
            personalityDescription = 'Você é uma pessoa Sentinela: organização e responsabilidade são seus pontos fortes!';
            break;
        case 'D':
            personalityDescription = 'Você é uma pessoa Exploradora: criatividade e adaptabilidade são suas marcas!';
            break;
    }

    const resultElement = document.getElementById('result');
    resultElement.textContent = '' + personalityDescription;
    resultElement.style.display = 'block'; // Mostrar o resultado
});
