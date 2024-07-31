document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const totalQuestions = 15;
    let scores = { A: 0, B: 0, C: 0, D: 0 };
    const answers = document.querySelectorAll('input[type="radio"]:checked');

    if (answers.length < totalQuestions) {
        alert("Por favor, responda todas as perguntas antes de ver o resultado.");
        return;
    }

    answers.forEach(answer => {
        scores[answer.value]++;
    });

    let totalAnswers = Object.values(scores).reduce((a, b) => a + b, 0);
    let percentages = {};
    let roundedPercentages = {};
    let totalRounded = 0;

    for (let key in scores) {
        percentages[key] = (scores[key] / totalAnswers) * 100;
        roundedPercentages[key] = Math.round(percentages[key]);
        totalRounded += roundedPercentages[key];
    }

    let difference = 100 - totalRounded;
    if (difference !== 0) {
        let adjustmentKey = Object.keys(percentages).reduce((a, b) => 
            (percentages[a] % 1) > (percentages[b] % 1) ? a : b
        );
        roundedPercentages[adjustmentKey] += difference;
    }

    let sortedPersonalities = Object.entries(roundedPercentages).sort((a, b) => b[1] - a[1]);
    let primaryPersonality = sortedPersonalities[0][0];
    let primaryPercentage = sortedPersonalities[0][1];
    let secondaryPersonality = sortedPersonalities[1][0];
    let secondaryPercentage = sortedPersonalities[1][1];

    let progressSection = `
        <div class="progress-section">
            <div class="progress-bar-label">Analista: ${roundedPercentages['A']}%</div>
            <div class="progress-bar-container">
                <div class="progress-bar analista" style="width: ${roundedPercentages['A']}%;"></div>
            </div>
            <div class="progress-bar-label">Diplomata: ${roundedPercentages['B']}%</div>
            <div class="progress-bar-container">
                <div class="progress-bar diplomata" style="width: ${roundedPercentages['B']}%;"></div>
            </div>
            <div class="progress-bar-label">Sentinela: ${roundedPercentages['C']}%</div>
            <div class="progress-bar-container">
                <div class="progress-bar sentinela" style="width: ${roundedPercentages['C']}%;"></div>
            </div>
            <div class="progress-bar-label">Explorador: ${roundedPercentages['D']}%</div>
            <div class="progress-bar-container">
                <div class="progress-bar explorador" style="width: ${roundedPercentages['D']}%;"></div>
            </div>
        </div>`;

    let descriptions = {
        A: {
            title: "Analista",
            text: "Você prefere a lógica e os dados para tomar decisões. Você é meticuloso e gosta de resolver problemas complexos."
        },
        B: {
            title: "Diplomata",
            text: "Você valoriza a empatia e a harmonia nas relações. Você é um bom ouvinte e gosta de ajudar os outros."
        },
        C: {
            title: "Sentinela",
            text: "Você gosta de ordem e previsibilidade. Você é confiável e gosta de seguir regras e procedimentos."
        },
        D: {
            title: "Explorador",
            text: "Você é adaptável e gosta de explorar novas possibilidades. Você é espontâneo e gosta de viver o momento."
        }
    };

    let resultHTML = `
        <div class="description-card">
            <h2>${descriptions[primaryPersonality].title} (${primaryPercentage}%)</h2>
            <p>${descriptions[primaryPersonality].text}</p>
        </div>
        <div class="description-card">
            <h2>${descriptions[secondaryPersonality].title} (${secondaryPercentage}%)</h2>
            <p>${descriptions[secondaryPersonality].text}</p>
        </div>`;

    document.getElementById('result').innerHTML = progressSection + resultHTML;
    document.getElementById('result').style.display = 'block';
});
