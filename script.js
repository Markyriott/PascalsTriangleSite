const DESCRIPTIONS = {
    'default': 'Default Mode: Displays the Pascal Triangle. Each middle node is the sum of the two numbers above it.',
    'fibonacci': "Fibonacci Mode: Highlights the Fibonacci sequence found throughout Pascal's Triangle. The sum of each diagonal node is part of the fibonacci sequence.",
    'powers': "Powers Mode: Demonstrates the sum of each row is equal to 2 to the power of the row's index",
    'sierpinski': "Sierpinski Mode: Displays the pattern found in Pascal's Triangle when you highlight only the odd numbers",
    'binomial': "Binomial Mode: Each number represents the coefficient of the terms of binomial expansion (x+y)n, where x and y are any two variables and n = the row index"
};
const COLORS = ['#F5276C', '#F54927', '#F5B027', '#27F5B0', '#276CF5', '#41DC50', '#644BD2', '#FF1F80', '#1F80FF', '#FFE91F'];
const fib = [1,1,2,3,5,8,13,21,34,55];
const triangleContainer = document.getElementById('triangle-container');
let triangleArr = [];
let currentMode = "default";

function setMode(mode){
    currentMode = mode;

    document.querySelectorAll('.mode-button').forEach(button =>{
        button.classList.remove('active');
    });
    document.getElementById(mode).classList.add('active');

    document.getElementById('description').textContent = DESCRIPTIONS[mode];
    createTriangle();
}


function createTriangle(){
    const rows = parseInt(document.getElementById('row-range').value);

    const fibonacciContainer = document.getElementById('fibonacci-container').innerHTML = '';
    triangleContainer.innerHTML = '';
    triangleArr = [];


    for (let i = 0; i < rows; i++){
        triangleArr[i] = [];
        
        for (let j = 0; j <= i; j++){
            if (j === 0 || j === i){
                triangleArr[i][j] = 1;
            } else {
                triangleArr[i][j] = triangleArr[i - 1][j - 1] + triangleArr[i - 1][j];
            }
        }
    }

    switch(currentMode){
        case 'fibonacci':
            fibonacciTriangle(rows);
            break;
        case 'powers':
            powersTriangle(rows);
            break;
        case 'sierpinski':
            sierpinskiTriangle(rows);
            break;
        case 'binomial':
            binomialTriangle(rows);
            break;
        default:
            defaultTriangle(rows);
    }
}

function defaultTriangle(rows){
    for (let i = 0; i < rows; i++){
        const rowContainer = document.createElement('div');
        rowContainer.className = 'row';

        for (let j = 0; j <= i; j++){
            const numElement = document.createElement('div');
            numElement.className = 'number';
            numElement.textContent = triangleArr[i][j];
            rowContainer.appendChild(numElement);
        }

        triangleContainer.appendChild(rowContainer);
    }
}

function fibonacciTriangle(rows){
    const fibonacciContainer = document.getElementById('fibonacci-container');
    for(let i = 0; i < rows; i++){
        const rowContainer = document.createElement('div');
        rowContainer.className = 'row';

        for (let j = 0; j <= i; j++){
            const numElement = document.createElement('div');
            numElement.className = 'number';

            numElement.textContent = triangleArr[i][j];
            numElement.style.backgroundColor = i+j < rows ? COLORS[i + j] : "#ffff"
            numElement.style.color =  i+j < rows ? '#fff' : "black"
            rowContainer.appendChild(numElement);
        }

        triangleContainer.appendChild(rowContainer);
    }

    for(let i = 0; i < rows; i++){
        const numElement = document.createElement('div');
        numElement.className = 'number';
        numElement.textContent = `${fib[i]} =`;
        numElement.style.color = '#fff';
        numElement.style.fontWeight = 'bold';
        numElement.style.backgroundColor = COLORS[i];
        fibonacciContainer.appendChild(numElement);
    }
}

function powersTriangle(rows){
    for (let i = 0; i < rows; i++){
        const rowContainer = document.createElement('div');
        rowContainer.className = 'row';

        let sum = triangleArr[i].reduce((a, b) => a+ b, 0);

        for (let j = 0; j <= i; j++){
            const numElement = document.createElement('div');
            numElement.className = 'number highlight';
            numElement.textContent = triangleArr[i][j];
            rowContainer.appendChild(numElement);
        }

        triangleContainer.appendChild(rowContainer);

        const sumContainer = document.createElement('div');
        sumContainer.className = 'sum-container';
        sumContainer.textContent = `Row ${i} sum = ${sum} = 2^${i}`;
        triangleContainer.appendChild(sumContainer);
    }
}

function sierpinskiTriangle(rows){
   for (let i = 0; i < rows; i++){
        const rowContainer = document.createElement('div');
        rowContainer.className = 'row';

        for (let j = 0; j <= i; j++){
            const numElement = document.createElement('div');
            const val = triangleArr[i][j];

            if (val % 2 === 1){
                numElement.className = 'number odd-highlight';
            } else {
                numElement.className = 'number even-highight';
            }

            numElement.textContent = val;
            rowContainer.appendChild(numElement);
        }

        triangleContainer.appendChild(rowContainer);
    } 
}

function binomialTriangle(rows){
    for (let i = 0; i < rows; i++){
        const rowContainer = document.createElement('div');
        rowContainer.className = 'row';

        for (let j = 0; j <= i; j++){
            const numElement = document.createElement('div');
            numElement.className = 'number highlight';

            numElement.innerHTML = `<div style="font-size: 0.7em;">C(${i},${j})</div><div>${triangleArr[i][j]}</div>`;
            rowContainer.appendChild(numElement);
        }

        triangleContainer.appendChild(rowContainer);
    } 
}

createTriangle();