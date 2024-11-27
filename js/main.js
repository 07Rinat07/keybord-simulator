;(function () {

const text = `Также эксперимент участниками дальнейших оценить условий активизации. Эксперимент активности модель занимаемых и задач. 
Плановых сфера же же организации активности и порядка, место условий модель развития. Финансовых проверки форм прогрессивного рост активности рост образом порядка, играет в важную играет порядка, же нашей таким образом анализа эксперимент нашей количественный оценить от сложившаяся способствует способствует поставленных обучения от задания порядка, финансовых и организации количественный участниками развития. 
Новая требуют эксперимент нашей количественный развития. Количественный условий. Участниками играет практика порядка, же порядка, и повседневная требуют играет и постоянный нас организационной высшего равным структура задания организационной порядка, нашей активности плановых практика постоянный кадров от сфера и сложившаяся играет и и в кадров значение активности плановых а дальнейших интересный новая задач. Направлений соответствующий также активизации. Финансовых деятельности условий организации, форм и задача значение новая нас оценить задания дальнейших эксперимент а способствует развития. Порядка, направлений по реализации кадров нашей идейные поставленных соответствующий позволяет сложившаяся участниками показывает, в высшего направлений идейные задач.`;

const inputElement = document.querySelector('#input');
const textExample = document.querySelector('#text-example');
const lines = getLines(text);

let letterId = 1;

init();


function init(){
    update();

    inputElement.focus();

    inputElement.addEventListener('keydown', function(e){ // событие при нажатии клавиши
        const currentLineNumber = getCurrentLineNumber();

        if (e.key.startsWith('F') && e.key.length > 1){ // проверка на F-клавиши
            return
        }
        
        const element = document.querySelector('[data-key="' + e.key +'"]');


        if(e.key === ','){
            element.classList.add('hint');
        }
        console.log(e.key)



        if(element){
            element.classList.add('hint');
        }
        const currentLetter = getCurrentLetter();
        if(e.key === currentLetter.original || (e.key === 'Enter' && currentLetter.original === '\n')){
            letterId = letterId + 1;
            update();
        } else {
            e.preventDefault();
        }

        if(currentLineNumber !== getCurrentLineNumber()){
            inputElement.value='';
            e.preventDefault();
        }
    })
    inputElement.addEventListener('keyup', function(e){ // событие при отпускании клавиши
        const element = document.querySelector('[data-key="' + e.key +'"]');
        if(element){
            element.classList.remove('hint');
        }  
    })

}




function getLines(text){ // принимеет длинную строку текста, возвращает массив строк со служебной информацией
    const lines = [];
    let line = [];
    let idCounter = 0;

    for(const originalLetter of text){
        idCounter = idCounter + 1;

        let letter = originalLetter;

        if(letter === ' '){
            letter = '␣';
        }
        if(letter === '\n'){
            letter = '¶\n';
        }

        line.push({
            label: letter,
            id: idCounter,
            succes: true,
            original: originalLetter
        });

        if(line.length >= 70 || letter === '¶\n'){
            lines.push(line);
            line = [];
        } 
    }

    if(line.length > 0){
        lines.push(line)
    }
    return lines;
}

function getCurrentLineNumber(){ // возвращает актуальный номер строки
    for(let i = 0; i < lines.length; i++){
        for(letter of lines[i]){
            if(letter.id === letterId){
                return i
            }
        }
    }
}

function lineToHtml (line){ // принимеет строку со служебной информацией и возвращает html-структуру
    // <div class="line line-1">
	// 		<span class="done"> На переднем плане, прямо перед</span> 
	// 		<span class="hint">н</span>ами, расположен был дворик, где стоял
	// 	</div>

    const divElement = document.createElement('div');
    divElement.classList.add('line');

    for (const letter of line){
        const spanElement = document.createElement('span');
        spanElement.textContent = letter.label;
        divElement.append(spanElement);

        if(letterId > letter.id){
            spanElement.classList.add('done');
        }
    }
    return divElement
}

function update(){ // функция обновления 3-х отображаемых актуальных строк всего текста
    const currentLineNumber = getCurrentLineNumber();
    textExample.innerHTML = '';

    for(let i = 0; i < lines.length; i++){
        const html = lineToHtml(lines[i]); // структурная строчка
        textExample.append(html);

        if(i < currentLineNumber || i > currentLineNumber + 2){
            html.classList.add('hidden')
        }
    }
}

function getCurrentLetter(){ // возвращает символ ожидаемый программой
    for(let i = 0; i < lines.length; i++){
        for(const letter of lines[i]){
            if (letterId === letter.id){
                return letter;
            }
        }
    }
}


})();





