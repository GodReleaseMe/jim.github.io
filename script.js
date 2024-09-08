// script.js

// 示例选择题数据
document.querySelectorAll('.navbar-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`你点击了 ${e.target.textContent} 菜单项，功能未实现。`);
    });
});
let questions = [
    {
        id: 1,
        question: "第一题(答案:A)",
        options: ["A","B","C","D"],
        correct_answer: 0,
        user_answer: null,
        explanation: "（这是第一题的解析）"
    },
    {
        id: 2,
        question: "第二题(答案:B)",
        options: ["A","B","C","D"],
        correct_answer: 1,
        user_answer: null,
        explanation: "（这是第二题的解析）"
    },
    {
        id: 3,
        question: "第三题(答案:C)",
        options: ["A","B","C","D"],
        correct_answer: 2,
        user_answer: null,
        explanation: "（这是第三题的解析）"
    },
    {
        id: 4,
        question: "第四题(答案:D)",
        options: ["A","B","C","D"],
        correct_answer: 3,
        user_answer: null,
        explanation: "（这是第四题的解析）"
    },
    {
        id: 5,
        question: "第五题(答案:A)",
        options: ["A","B","C","D"],
        correct_answer: 0,
        user_answer: null,
        explanation: "（这是第五题的解析）"
    }
];

let currentQuestionIndex = 0;
let mode = 'all'; // 默认模式
document.getElementById('accuracy').textContent='（请先提交答案）';
// 加载当前题目
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';

    question.options.forEach((option, index) => {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'option';
        radio.value = index;
        radio.checked = question.user_answer === index;
        radio.addEventListener('change', () => {
            selectOption(index);
            updateProgress();
        });
        li.appendChild(radio);

        const label = document.createElement('label');
        label.textContent = option;
        li.appendChild(label);

        optionsList.appendChild(li);
    });

    document.getElementById('explanation-text').classList.add('hidden');
    document.getElementById('warning-text').classList.add('hidden');
    updateProgress();
}

// 选择答案并自动保存
function selectOption(index) {
    questions[currentQuestionIndex].user_answer = index;
    updateProgress();
}

// 检查是否所有题目都已作答
function allQuestionsAnswered() {
    return questions.every(q => q.user_answer !== null);
}

// 提交所有答案并进行判题
document.getElementById('submit-all').addEventListener('click', () => {
    if (!allQuestionsAnswered()) {
        document.getElementById('warning-text').classList.remove('hidden');
    } else {
        // 判题并显示正确答案和解析
        let explanationText = document.getElementById('explanation-text');
        let correct_answer = 0;
        explanationText.textContent = ''; // 清空先前的解释文本
        questions.forEach(question => {
            if (question.user_answer !== question.correct_answer) {
                explanationText.textContent += `\n题目: ${question.question}\n错误！正确答案是：${question.options[question.correct_answer]}。\n解析: ${question.explanation}\n\n`;
            }
            else{
                correct_answer++;
            }
            }
        );
        if(correct_answer===5){
            explanationText.textContent+='\n恭喜你，全对！\n';
        }
        explanationText.classList.remove('hidden');
        updateProgress();
        updateaccuracy();
    }
});

// 更新进度
function updateProgress() {
    const totalQuestions = questions.length;
    const answeredQuestions = questions.filter(q => q.user_answer !== null).length;
    const correctAnswers = questions.filter(q => q.user_answer === q.correct_answer).length;

    document.getElementById('progress-info').textContent = `${answeredQuestions}/${totalQuestions}`;
    //document.getElementById('accuracy').textContent = `${Math.round((correctAnswers / answeredQuestions) * 100) || 0}%`;
}
// 更新正确率
function updateaccuracy(){
    const totalQuestions = questions.length;
    const answeredQuestions = questions.filter(q => q.user_answer !== null).length;
    const correctAnswers = questions.filter(q => q.user_answer === q.correct_answer).length;
    document.getElementById('accuracy').textContent = `${Math.round((correctAnswers / answeredQuestions) * 100) || 0}%`;
}
// 导入数据按钮
document.getElementById('load-data').addEventListener('click', () => {
    // 模拟导入数据
    alert("导入功能尚未实现。");
});

// 导航按钮
document.getElementById('prev-question').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

document.getElementById('next-question').addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

// 复习模式选择
document.getElementById('mode-selector').addEventListener('change', (e) => {
    mode = e.target.value;
    // 根据模式筛选错题
    if (mode === 'wrong') {
        questions = questions.filter(q => q.user_answer !== q.correct_answer);
    }
    currentQuestionIndex = 0;
    loadQuestion();
});

// 初始加载第一题
loadQuestion();
