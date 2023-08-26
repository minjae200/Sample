const changeBtn = document.getElementById('change-btn');
const clearBtn = document.getElementById('clear-btn');
const createBtn = document.getElementById('create-btn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('myModal');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progress-percent');
const modalMain = document.getElementById('modal-main');
const progress = document.getElementById('modal-progress-container');
const progressTitle = document.getElementById('progress-title');
const progressSubTitle = document.getElementById('progress-subtitle');
var progressInterval = null;
var progressTimeout = null;

createBtn.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // JSON 데이터로 변환
    })
    .then(data => {
      console.log(data); // API에서 받아온 데이터 출력
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
});

changeBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    progress.style.display = 'none';
    progressBar.style.width = '0%';
    modalMain.style.display = 'block';
    clearInterval(progressInterval);
    clearTimeout(progressTimeout);
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
        progress.style.display = 'none';
        progressBar.style.width = '0%';
        modalMain.style.display = 'block';
        clearInterval(progressInterval);
        clearTimeout(progressTimeout);
    }
});

function ChangeSO(item) {
    modalMain.style.display = 'none';
    progress.style.display = 'block';
    progressBar.style.width = '0%';
    progressPercent.innerText = '0%';

    progressTitle.innerText = `United Kingdom - ${item.innerText}`;

    progressInterval = setInterval(() => {
        const width = parseInt(progressBar.style.width);
        if (width >= 100) {
            clearInterval(progressInterval);
            progressSubTitle.innerText = 'Update Complete';
            progressTimeout = setTimeout(() => {
                modalMain.style.display = 'block';
                modal.style.display = 'none';
                progress.style.display = 'none';
                document.getElementById('header-title').innerText = progressTitle.innerText;
                clearTimeout(progressTimeout);
            }, 1000);
        } else {
            if (width < 50) {
                progressSubTitle.innerText = 'Updating HomeTP';
            } else {
                progressSubTitle.innerText = 'Fetching Stream from server';
            }
            progressBar.style.width = (width + 25) + '%';
            progressPercent.innerText = (width + 25) + '%';
        }
    }, 1000);
}


let activeInput = null;
fetch('transponder.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("transponder-container").innerHTML = data;
        const inputFields = document.querySelectorAll('.input');

        inputFields.forEach(inputField => {
            inputField.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            inputField.addEventListener('drop', (e) => {
                e.preventDefault();
                const data = e.dataTransfer.getData('text/plain');
                const target = inputField.querySelector('.input__field')
                target.value = data;
            });

            const fields = inputField.querySelectorAll('.input__field');
            fields.forEach(field => {
                field.addEventListener('mousedown', (e) => {
                    const clickedInput = e.target.closest('.input__field');
                    if (clickedInput) {
                        activeInput = clickedInput;
                    } else {
                        activeInput = null;
                    }
                });
            });
        });
        createBtn.addEventListener('click', function (event) {
            event.preventDefault();
            let cards = document.getElementsByClassName('card--inverted');
            Array.from(cards).forEach(card => {
                const input = card.querySelector('.input__field');
                console.log(input.value);
            });
        });

        clearBtn.addEventListener('click', () => {
            document.getElementById('hometp-form').reset();
        });
    });

fetch('stream.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("stream-container").innerHTML = data;
        const draggableItems = document.querySelectorAll('.draggable');
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.textContent);
            });
        });
    });
function clearValue(inputElement) {
    inputElement.value = '';
}
function changeBorderColor(inputElement, event) {
    event.preventDefault();
    inputElement.classList.add('drag-over');
}

function resetBorderColor(inputElement) {
    inputElement.classList.remove('drag-over');
}

function setValue(obj) {
    if (activeInput) {
        activeInput.value = obj.innerText;
    }
}
