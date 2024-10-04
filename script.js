let score = 0;

function addQuestion() {
    const imageInput = document.getElementById('imageInput');
    const answerInput = document.getElementById('answerInput');
    const difficultyInput = document.getElementById('difficultyInput');
    const questionsContainer = document.getElementById('questionsContainer');
    const difficulty = difficultyInput.value;

    if (imageInput.files.length === 0 || answerInput.value.trim() === '') {
        alert('Please select an image and enter an answer.');
        return;
    }

    const file = imageInput.files[0];
    const imgUrl = URL.createObjectURL(file);
    const correctAnswer = answerInput.value.trim().toLowerCase();

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.setAttribute('data-answer', correctAnswer);

    questionDiv.innerHTML = `
        <img src="${imgUrl}" alt="Quiz Image" width="300">
        <input type="text" placeholder="Type your answer here">
        <button onclick="checkAnswer(this.parentElement.querySelector('input').value, this)">Submit</button>
        <button onclick="deleteQuestion(this)">Delete</button>
    `;

    // Append question to the appropriate difficulty column
    document.getElementById(`${difficulty}Column`).appendChild(questionDiv);
    
    // Reset inputs for new question
    imageInput.value = '';
    answerInput.value = '';
}

function checkAnswer(selected, button) {
    const questionDiv = button.parentElement;
    const correctAnswer = questionDiv.getAttribute('data-answer');

    if (!questionDiv.classList.contains('answered')) {
        if (selected.toLowerCase() === correctAnswer) {
            questionDiv.classList.add('correct');
            score++;
        } else {
            questionDiv.classList.add('wrong');
        }
        questionDiv.classList.add('answered');
        document.getElementById('score').innerText = `Score: ${score}`;
    }
}

function deleteQuestion(button) {
    const questionDiv = button.parentElement;
    questionDiv.remove();
}

function resetQuiz() {
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.classList.remove('correct', 'wrong', 'answered');
    });

    document.querySelectorAll('.grid-column').forEach(column => {
        column.innerHTML = '<h2>' + column.querySelector('h2').innerText + '</h2>'; // Reset columns
    });
}
