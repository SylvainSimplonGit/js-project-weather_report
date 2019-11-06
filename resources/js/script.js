document.getElementById('lastMeasure').addEventListener('click', function (event) {
    deleteContent();
    insertElement('span', "Bonjour !");
    highlightMenu('lastMeasure');
});

document.getElementById('topMeasures').addEventListener('click', function (event) {
    deleteContent();
    insertElement('p', "Bonsoir !");
    highlightMenu('topMeasures');
});

document.getElementById('tableMeasures').addEventListener('click', function (event) {
    deleteContent();
    insertElement('table', "", 'tableDatas');
    defineTable();
    highlightMenu('tableMeasures');
});

document.getElementById('graphMeasures').addEventListener('click', function (event) {
    deleteContent();
    // <canvas id="myChart" width="400" height="400"></canvas>
    insertElement('canvas', "", "myChart", 400, 400);
    defineGraph();
    highlightMenu('graphMeasures');
});

const defineTable = function (params) {
    insertElement('thead', "", 'head', 0, 0, 'tableDatas');
    insertElement('tr', "", 'headTr', 0, 0, 'head');
    insertElement('tbody', "", 'body', 0, 0, 'tableDatas');
    insertElement('tr', "", 'bodyTr', 0, 0, 'body');
}

const defineGraph = function (params) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

const highlightMenu = function (menuActive) {
    const listOfMenu = ['lastMeasure', 'topMeasures', 'tableMeasures', 'graphMeasures'];
    listOfMenu.forEach(menuItem => {
        document.getElementById(menuItem).classList.remove('active');
    });
    document.getElementById(menuActive).classList.add('active')
}

const insertElement = function (typeElement, contentElement = '', idElement = '', widthElement = 0, heightElement = 0, inElement = 'content') {
    const newData = document.createElement(typeElement);
    if (idElement != '') { newData.id = idElement; }
    if (widthElement > 0) { newData.width = widthElement; }
    if (heightElement > 0) { newData.height = heightElement; }
    if (contentElement != '') { newData.innerText = contentElement; }

    const objContent = document.getElementById(inElement);
    objContent.appendChild(newData);
}

const deleteContent = function () {
    const objContent = document.getElementById('content');

    while (objContent.hasChildNodes()) {
        objContent.removeChild(objContent.firstChild)
    }
}