const questions = [
    {
        question: 'Mis on Eesti pealinn?',
        options: ['Tallinn', 'Tartu', 'Kohtla-Järve'],
        correctAnswer: 'Tallinn',
        successMessage:
            'Õige vastus! 1238. aastast pärineb Tallinna (saksakeelse nimega Revali) esimene teada olev mainimine koos kodanikega.',
        failureMessage: 'See vastus on vale! Eesti pealinn on Tallinn.',
    },
    {
        question: 'Kui suur on Eesti ligikaudne rahvaarv?',
        options: ['Vähem kui 1 miljon', '1-2 miljonit', 'Üle 2 miljoni'],
        correctAnswer: '1-2 miljonit',
        successMessage:
            'Õige vastus! 2024a. seisuga on Eestis registreeritud rahvaarvuks 1 373 101 inimest.',
        failureMessage:
            'See vastus on vale! Eesti rahvaarv 2024a. seisuga on 1 373 101 inimest.',
    },
    {
        question: 'Kes on Eesti president?',
        options: ['Arnold Rüütel', 'Kersi Kaljulaid', 'Alar Karis'],
        correctAnswer: 'Alar Karis',
        successMessage:
            'Õige vastus! Alar Karis asus ametisse 11. oktoobril 2021a.',
        failureMessage:
            'See vastus on vale! Alates 2021a kuni tänaseni on Eesti president Alar Karis.',
    },
];

let answeredQuestions = [];
let currentQuestion = 0;
let score = 0;

const submitAnswerButton = document.getElementById('submit-answer');
const nextQuestionButton = document.getElementById('next-question');
const nextQuestionButtonLabel = document.getElementById('next-question-label');
const successMessageContainer = document.getElementById('success-message');
const failureMessageContainer = document.getElementById('failure-message');

const displayQuestion = () => {
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');

    questionText.textContent = questions[currentQuestion].question;

    optionsContainer.innerHTML = '';

    questions[currentQuestion].options.forEach((option) => {
        optionsContainer.innerHTML += `
            <div class="radio">
                <input type="radio" name="answer" id="${option}" value="${option}">
                <label class="radio-label" for="${option}">${option}</label>
            </div>
        `;
    });

    if (currentQuestion === questions.length - 1) {
        nextQuestionButtonLabel.textContent = 'Vaata tulemusi';
    }
};

const refresh = () => {
    submitAnswerButton.style.display = 'block';
    nextQuestionButton.style.display = 'none';
    successMessageContainer.textContent = '';
    successMessageContainer.hidden = true;
    failureMessageContainer.textContent = '';
    failureMessageContainer.hidden = true;
};

const submitAnswer = () => {
    const selectedAnswer = document.querySelector(
        'input[name="answer"]:checked'
    );
    const inputs = document.querySelectorAll('input');

    if (selectedAnswer) {
        const selectedAnswerValue = selectedAnswer.value;
        const correctAnswer = questions[currentQuestion].correctAnswer;

        if (selectedAnswerValue === correctAnswer) {
            score++;
            successMessageContainer.textContent =
                questions[currentQuestion].successMessage;
            successMessageContainer.hidden = false;
        } else {
            failureMessageContainer.textContent =
                questions[currentQuestion].failureMessage;
            failureMessageContainer.hidden = false;
        }

        questionData = {
            question: questions[currentQuestion].question,
            answer: selectedAnswerValue,
            isCorrect: selectedAnswerValue === correctAnswer,
        };

        answeredQuestions.push(questionData);

        inputs.forEach((input) => {
            input.disabled = true;
        });

        submitAnswerButton.style.display = 'none';
        nextQuestionButton.style.display = 'flex';
    }
};

const nextQuestion = () => {
    currentQuestion++;
    refresh();

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showScore();
    }
};

const showScore = () => {
    document.getElementById('question-container').remove();
    document.getElementById('score').innerHTML = `
        <h2>Aitäh osalemise eest!</h2>
        <table>
            <thead>
                <tr>
                    <th>Küsimus</th>
                    <th>Sinu vastus</th>
                    <th>Punktid</th>
                </tr>
            </thead>
            <tbody>
            ${answeredQuestions
                .map(
                    (question) => `
                <tr>
                    <td>${question.question}</td>
                    <td>${question.answer}</td>
                    <td class=${question.isCorrect ? 'correct' : 'incorrect'}>${
                        question.isCorrect ? '1' : '0'
                    }</td>
                </tr>
            `
                )
                .join('')}
        </tbody>
        </table>
        <p>${feedbackMessage()} Teenisid ${
        questions.length
    }'st küsimusest ${score} punkti</p>
    `;
};

const feedbackMessage = () => {
    if (score === questions.length) {
        return 'Kõik vastused on õiged!';
    } else if (score === 0) {
        return 'Häbi!';
    } else {
        return '';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    displayQuestion();
});
