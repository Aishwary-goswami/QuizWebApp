const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language"
        ],
        correct: 0,
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "background-color",
            "text-color",
            "font-color",
            "color"
        ],
        correct: 3,
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<hyperlink>"
        ],
        correct: 1,
    },
    {
        question: "Which JavaScript method is used to write content into an HTML document?",
        options: [
            "document.write()",
            "console.log()",
            "window.alert()",
            "document.innerHTML()"
        ],
        correct: 0,
    },
    {
        question: "Which of the following is used to add styles in a web page?",
        options: [
            "HTML",
            "JavaScript",
            "CSS",
            "Python"
        ],
        correct: 2,
    },
    {
        question: "What does DOM stand for in JavaScript?",
        options: [
            "Document Object Model",
            "Data Object Model",
            "Document Oriented Method",
            "Data Oriented Markup"
        ],
        correct: 0,
    },
    {
        question: "Which tag is used to define an unordered list in HTML?",
        options: [
            "<ol>",
            "<ul>",
            "<li>",
            "<list>"
        ],
        correct: 1,
    },
    {
        question: "Which property in CSS is used to make text bold?",
        options: [
            "font-weight",
            "font-style",
            "text-decoration",
            "text-weight"
        ],
        correct: 0,
    },
    {
        question: "What is the correct syntax to link a CSS file to HTML?",
        options: [
            "<style src='style.css'>",
            "<stylesheet>style.css</stylesheet>",
            "<link rel='stylesheet' href='style.css'>",
            "<css link='style.css'>"
        ],
        correct: 2,
    },
    {
        question: "Which JavaScript keyword declares a variable?",
        options: [
            "var",
            "int",
            "string",
            "define"
        ],
        correct: 0,
    }
];

// DOM elements
const answerElm = document.querySelectorAll(".answer");
const option_1 = document.querySelector("#option_1");
const option_2 = document.querySelector("#option_2");
const option_3 = document.querySelector("#option_3");
const option_4 = document.querySelector("#option_4");
const questionElm = document.querySelector("#question");
const submitBtn = document.querySelector("#submit");
const quizContainer = document.querySelector("#quiz");

// Score display
const scoreDisplay = document.createElement("p");
scoreDisplay.id = "scoreDisplay";
scoreDisplay.style.fontWeight = "bold";
scoreDisplay.style.marginTop = "15px";
quizContainer.appendChild(scoreDisplay);

let currentQuiz = 0;
let score = 0;

// Load question
const loadQuiz = () => {
    const { question, options } = quizData[currentQuiz];
    questionElm.innerHTML = `Q${currentQuiz + 1}: ${question}`;
    option_1.innerText = options[0];
    option_2.innerText = options[1];
    option_3.innerText = options[2];
    option_4.innerText = options[3];

    // Clear highlights and reset inputs
    answerElm.forEach((input) => input.checked = false);
    [option_1, option_2, option_3, option_4].forEach(option => {
        option.style.color = "#000";
        option.innerText = option.innerText.replace("✅", "").replace("❌", "").trim();
    });

    scoreDisplay.innerText = `Score: ${score}/${quizData.length}`;
};

// Get selected option
const getSelectedOption = () => {
    let selectedIndex;
    answerElm.forEach((input, index) => {
        if (input.checked) {
            selectedIndex = index;
        }
    });
    return selectedIndex;
};

// Highlight answers
const highlightAnswers = (selected, correct) => {
    const labels = [option_1, option_2, option_3, option_4];

    labels[correct].style.color = "green";
    labels[correct].innerText += " ✅";

    if (selected !== correct) {
        labels[selected].style.color = "red";
        labels[selected].innerText += " ❌";
    }
};

// Submit click
submitBtn.addEventListener("click", () => {
    const selectedOptionIndex = getSelectedOption();

    if (selectedOptionIndex === undefined) {
        alert("Please select an answer before submitting!");
        return;
    }

    const correctIndex = quizData[currentQuiz].correct;
    highlightAnswers(selectedOptionIndex, correctIndex);

    if (selectedOptionIndex === correctIndex) {
        score++;
    }

    scoreDisplay.innerText = `Score: ${score}/${quizData.length}`;

    currentQuiz++;

    // Delay to show highlights before moving to next question
    setTimeout(() => {
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quizContainer.innerHTML = `
                <div class="result">
                    <h2>Your Score: ${score}/${quizData.length} 🏆</h2>
                    <p>😊 Well done, keep grinding!</p>
                    <button class="reload-button" onclick="location.reload()">Play Again</button>
                </div>
            `;
        }
    }, 1000); // 1 second delay
});

// Start quiz
loadQuiz();
