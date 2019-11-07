document.getElementById('lastMeasure').addEventListener('click', function (event) {
    // Remove all in section content
    deleteContent();
    // Get Data by API
    getDataApi('lastMeasure', displayLastMeasure);
    // Highlight active Menu
    highlightMenu('lastMeasure');
});

document.getElementById('topMeasures').addEventListener('click', function (event) {
    // Remove all in section content
    deleteContent();
    // Get Data by API
    getDataApi('topMeasuresHumidity', displayTopMeasureHumidity);
    getDataApi('topMeasuresPressure', displayTopMeasurePressure);
    getDataApi('topMeasuresTemperature', displayTopMeasureTemperature);
    // Highlight active Menu
    highlightMenu('topMeasures');
});

document.getElementById('tableMeasures').addEventListener('click', function (event) {
    // Remove all in section content
    deleteContent();
    // Get Data by API
    getDataApi('tableMeasures', displayTable);

    // Highlight active Menu
    highlightMenu('tableMeasures');
});

document.getElementById('graphMeasures').addEventListener('click', function (event) {
    // Remove all in section content
    deleteContent();
    // Get Data by API
    getDataApi('graphMeasures', displayGraph);

    // <canvas id="myChart" width="400" height="400"></canvas>
    // insertElement('canvas', "", '', "myChart", 400, 400);
    // defineGraph();

    // Highlight active Menu
    highlightMenu('graphMeasures');
});

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

const insertElement = function (inElement = 'content', typeElement, contentElement = '', idElement = '', widthElement = 0, heightElement = 0) {
    const newData = document.createElement(typeElement);
    if (idElement != '') {
        newData.id = idElement;
    }
    if (widthElement > 0) {
        newData.width = widthElement;
    }
    if (heightElement > 0) {
        newData.height = heightElement;
    }
    if (contentElement != '') {
        newData.innerText = contentElement;
    }

    const objContent = document.getElementById(inElement);
    objContent.appendChild(newData);
}

function convertData(type, data) {
    switch (type) {
        case 'datetime':
            dateField = new Date(data);
            content = moment(dateField).format('DD/MM/YYYY HH:mm')
            break;
        case 'float,1d':
            content = Number(data).toFixed(1);
            break;
        case 'float,2d':
            content = Number(data).toFixed(2);
            break;
        default:
            break;
    }
    return content;
}

const insertTR = function (divParent, jsonData, dictonnary) {
    const parent = document.getElementById(divParent);
    const newTR = document.createElement('tr');
    let newTD;
    // const moment = require('moment');
    let contentField;

    for (field in jsonData) {
        // console.log(jsonData);

        if (field in dictonnary && dictonnary[field].visible) {
            newTD = document.createElement('td');
            if (divParent == 'tableHead') {
                newTD.innerText = dictonnary[field].entete;
            } else {
                // Display in chosen format
                contentField = convertData(dictonnary[field].type, dictonnary[field]);
                // switch (dictonnary[field].type) {
                //     case 'datetime':
                //         dateField = new Date(jsonData[field]);
                //         contentField = moment(dateField).format('DD/MM/YYYY HH:mm')
                //         // console.log(moment.locale());
                //         break;
                //     case 'float,1d':
                //         contentField = Number(jsonData[field]).toFixed(1);
                //         break;
                //     case 'float,2d':
                //         contentField = Number(jsonData[field]).toFixed(2);
                //         break;
                //     default:
                //         break;
                // }
                console.log(contentField);
                newTD.innerText = contentField;
            }
            newTR.appendChild(newTD);
        }

    }

    parent.appendChild(newTR);
}


const deleteContent = function () {
    const objContent = document.getElementById('content');

    while (objContent.hasChildNodes()) {
        objContent.removeChild(objContent.firstChild)
    }
}

const displayLastMeasure = function (jsonData) {
    // Convert Datas
    const dataDate = new Date(jsonData.measureDate);
    const strDate = dataDate.toLocaleString("fr-FR");

    const dataTemp = Number(jsonData.temperature).toFixed(1);

    const dataHum = Number(jsonData.humidity).toFixed(2);

    const dataPress = Number(jsonData.pressure).toFixed(2);

    // Add data in DOM
    console.log(jsonData);
    insertElement('content', 'div', "", 'data');
    insertElement('data', 'div', "Dernière mesure du " + strDate, 'dataDate');
    addDataInDOM('data', dataTemp, dataHum, dataPress);
}

const displayTopMeasureHumidity = function (jsonData) {
    // Convert Datas
    const dataDate = new Date(jsonData.measureDate);
    const strDate = dataDate.toLocaleString("fr-FR");

    const dataTemp = Number(jsonData.temperature).toFixed(1);

    const dataHum = Number(jsonData.humidity).toFixed(2);

    const dataPress = Number(jsonData.pressure).toFixed(2);

    // Add data in DOM
    insertElement('content', 'div', "", 'data');
    insertElement('data', 'div', "", 'dataTopHum');
    insertElement('dataTopHum', 'div', "Top humidité " + strDate, 'dataDate');
    addDataInDOM('dataTopHum', dataTemp, dataHum, dataPress);
}

const displayTopMeasurePressure = function (jsonData) {
    // Convert Datas
    const dataDate = new Date(jsonData.measureDate);
    const strDate = dataDate.toLocaleString("fr-FR");

    const dataTemp = Number(jsonData.temperature).toFixed(1);

    const dataHum = Number(jsonData.humidity).toFixed(2);

    const dataPress = Number(jsonData.pressure).toFixed(2);

    // Add data in DOM
    insertElement('content', 'div', "", 'data');
    insertElement('data', 'div', "", 'dataTopPress');
    insertElement('dataTopPress', 'div', "Top pression " + strDate, 'dataDate');
    addDataInDOM('dataTopPress', dataTemp, dataHum, dataPress);
}

const displayTopMeasureTemperature = function (jsonData) {
    // Convert Datas
    const dataDate = new Date(jsonData.measureDate);
    const strDate = dataDate.toLocaleString("fr-FR");

    const dataTemp = Number(jsonData.temperature).toFixed(1);

    const dataHum = Number(jsonData.humidity).toFixed(2);

    const dataPress = Number(jsonData.pressure).toFixed(2);

    // Add data in DOM
    insertElement('content', 'div', "", 'data');
    insertElement('data', 'div', "", 'dataTopTemp');
    insertElement('dataTopTemp', 'div', "Top température " + strDate, 'dataDate');
    addDataInDOM('dataTopTemp', dataTemp, dataHum, dataPress);
}

const addDataInDOM = function (divData, dataTemp, dataHum, dataPress) {
    // Add data in DOM
    insertElement(divData, 'div', "Température : " + dataTemp + " °C", 'dataTemp');
    insertElement(divData, 'div', "Humidité : " + dataHum + " %hum", 'dataHum');
    insertElement(divData, 'div', "Pression : " + dataPress + " hPa", 'dataPress');
}

const displayTable = function (jsonData) {
    var dict = {
        id: {
            visible: false
        },
        measureDate: {
            visible: true,
            type: 'datetime',
            entete: 'Date'
        },
        temperature: {
            visible: true,
            type: 'float,1d',
            entete: 'Température'
        },
        pressure: {
            visible: true,
            type: 'float,2d',
            entete: 'Pression'
        },
        humidity: {
            visible: true,
            type: 'float,2d',
            entete: 'Humidité'
        }
    }


    insertElement('content', 'table', "", 'tableDatas');

    insertElement('tableDatas', 'thead', "", 'tableHead');
    insertTR('tableHead', jsonData[0], dict);

    insertElement('tableDatas', 'tbody', "", 'tableBody');

    for (data of jsonData) {
        insertTR('tableBody', data, dict);
    }

}

const displayGraph = function (jsonData) {
    const arrLabels = [];
    const arrTemp = [];

    for (const key in jsonData) {
        arrLabels.push(convertData('datetime', jsonData[key].measureDate));
        arrTemp.push(convertData('float,1d', jsonData[key].temperature));
    }

    console.log(arrLabels);
    console.log(arrTemp);
    

    insertElement('content', 'canvas', "", 'myChart', 400, 400);
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            // Dates des données en x
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            labels: arrLabels,
            // Courbes
            datasets: [{
                // Nom de la courbe
                label: 'Températures',
                // Couleur de la courbe
                backgroundColor: '#000000',
                // Couleur ?
                borderColor: '#ff00ff',
                // Données
                // data: [12, 19, 3, 5, 2, 3],
                data: arrTemp,
                // ????
                fill: false
            }]
        },
        options: {
            respnsive: true,
            title: {
                display: true,
                text: 'Température'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

const getDataApi = function (
    typeRequest,
    treatmentCallback,
    startDate = moment().subtract(1, 'days').format('YYYY-MM-DD'),
    endDate = moment().format('YYYY-MM-DD')
) {
    const host = '192.168.1.197:8080';
    const root = 'http://' + host + '/';
    let urlApi = '';

    switch (typeRequest) {
        case 'lastMeasure':
            urlApi = root + 'last-measure';
            break;
        case 'topMeasuresHumidity':
            urlApi = root + 'top-measure/humidity';
            break;
        case 'topMeasuresPressure':
            urlApi = root + 'top-measure/pressure';
            break;
        case 'topMeasuresTemperature':
            urlApi = root + 'top-measure/temperature';
            break;
        case 'tableMeasures':
        case 'graphMeasures':
                urlApi = root + 'measure/date?startDate=' + startDate + '&endDate=' + endDate;
            break;
        default:
            break;
    }

    const request = new XMLHttpRequest();

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            jsonResult = JSON.parse(this.response)
            treatmentCallback(jsonResult);
        } else {
            console.log('Erreur ...' + request.status)
        }
    }

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', urlApi, true);
    console.log(urlApi);

    // Send request
    request.send();
}