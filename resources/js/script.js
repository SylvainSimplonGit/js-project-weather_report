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

    // Highlight active Menu
    highlightMenu('graphMeasures');
});

// Dictonnary to translate the caption of table header and convert data in table
const dict = {
    id:             { visible: false },
    measureDate:    { visible: true, type: 'datetime', entete: 'Date' },
    temperature:    { visible: true, type: 'float,1d', entete: 'Température' },
    pressure:       { visible: true, type: 'float,2d', entete: 'Pression' },
    humidity:       { visible: true, type: 'float,2d', entete: 'Humidité' }
}

// function to highlight the activated menu
const highlightMenu = function (menuActive) {
    const listOfMenu = ['lastMeasure', 'topMeasures', 'tableMeasures', 'graphMeasures'];
    listOfMenu.forEach(menuItem => {
        document.getElementById(menuItem).classList.remove('active');
    });
    document.getElementById(menuActive).classList.add('active')
}

// function to insert an element in DOM
const insertElement = function (inElement = 'content', typeElement, contentElement = '', idElement = '') {
    const newData = document.createElement(typeElement);
    if (idElement != '') {
        newData.id = idElement;
    }
    if (contentElement != '') {
        newData.innerText = contentElement;
    }

    const objContent = document.getElementById(inElement);
    objContent.appendChild(newData);
}

// function to convert the data according to the type
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

// function to insert a TR in Table
const insertTR = function (divParent, jsonData, dictonnary) {
    const parent = document.getElementById(divParent);
    const newTR = document.createElement('tr');
    let newTD;
    let contentField;

    for (field in jsonData) {
        if (field in dictonnary && dictonnary[field].visible) {
            newTD = document.createElement('td');
            if (divParent == 'tableHead') {
                newTD.innerText = dictonnary[field].entete;
            } else {
                // Display in chosen format
                contentField = convertData(dictonnary[field].type, jsonData[field]);
                newTD.innerText = contentField;
            }
            newTR.appendChild(newTD);
        }
    }
    parent.appendChild(newTR);
}

// function to delete all children of an object
const deleteContent = function () {
    const objContent = document.getElementById('content');

    while (objContent.hasChildNodes()) {
        objContent.removeChild(objContent.firstChild)
    }
}

// function to display the last measures with the right format
const displayLastMeasure = function (jsonData) {
    // Convert Datas
    const dataDate = new Date(jsonData.measureDate);
    const strDate = dataDate.toLocaleString("fr-FR");

    const dataTemp = Number(jsonData.temperature).toFixed(1);

    const dataHum = Number(jsonData.humidity).toFixed(2);

    const dataPress = Number(jsonData.pressure).toFixed(2);

    // Add data in DOM
    // console.log(jsonData);
    insertElement('content', 'div', "", 'data');
    insertElement('data', 'div', "Dernière mesure du " + strDate, 'dataDate');
    addDataInDOM('data', dataTemp, dataHum, dataPress);
}

// function to display the top measures of Humidity with the right format
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

// function to display the top measures of Pressure with the right format
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

// function to display the top measures of Temperature with the right format
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

// function to add datas in DOM
const addDataInDOM = function (divData, dataTemp, dataHum, dataPress) {
    // Add data in DOM
    insertElement(divData, 'div', "Température : " + dataTemp + " °C", 'dataTemp');
    insertElement(divData, 'div', "Humidité : " + dataHum + " %hum", 'dataHum');
    insertElement(divData, 'div', "Pression : " + dataPress + " hPa", 'dataPress');
}

// function to display the datas table
const displayTable = function (jsonData) {
    insertElement('content', 'table', "", 'tableDatas');

    insertElement('tableDatas', 'thead', "", 'tableHead');
    insertTR('tableHead', jsonData[0], dict);

    insertElement('tableDatas', 'tbody', "", 'tableBody');

    for (data of jsonData) {
        insertTR('tableBody', data, dict);
    }
}

// Dictonnary to describe Charts
const dictGraph = {
    temperature: {
        title: 'Température',
        idCanvas: 'chartTemperature',
        lineColor: '#7395AE',
        labelY: '°C',
        datas: []
    },
    pressure: {
        title: 'Pression',
        idCanvas: 'chartPressure',
        lineColor: '#557A95',
        labelY: '% hum',
        datas: []
    },
    humidity: {
        title: 'Humidité',
        idCanvas: 'chartHumidity',
        lineColor: '#B1A296',
        labelY: 'hPa',
        datas: []
    }
}

// function to display all graph
const displayGraph = function (jsonData) {
    const arrLabels = [];

    var cpt = 0;
    for (const key in jsonData) {
        if (cpt == 30) {
            arrLabels.push(convertData('datetime', jsonData[key].measureDate));
            dictGraph.temperature.datas.push(convertData('float,1d', jsonData[key].temperature));
            dictGraph.pressure.datas.push(convertData('float,1d', jsonData[key].pressure));
            dictGraph.humidity.datas.push(convertData('float,1d', jsonData[key].humidity));
            cpt = 0;    
        } else {
            cpt++;
        }
    }

    insertElement('content', 'div', "", 'chart');

    for (key in dictGraph) {
        insertElement('chart', 'canvas', "", dictGraph[key].idCanvas);
        displayOneGraph(dictGraph[key].idCanvas, dictGraph[key].title, dictGraph[key].labelY, dictGraph[key].lineColor, arrLabels, dictGraph[key].datas);
    }    
}

// function to display one graph
const displayOneGraph = function (chart, libelle, labelY, lineColor, arrLabels, arrDatas) {
    
    var ctx = document.getElementById(chart).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            // Dates des données en x
            labels: arrLabels,
            // Courbes
            datasets: [{
                // Nom de la courbe
                label: libelle,
                // Couleur des points
                // backgroundColor: '#FF5733',
                // Couleur de la courbe
                borderColor: lineColor,
                // Données
                data: arrDatas
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: false,
                text: libelle
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
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: labelY
                    }
                }]
            }
        }
    });
}

// function to get datas from API
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

    // Send request
    request.send();
}

// function to get datas from local JSON files
// const getDataApi = function (
//     typeRequest,
//     treatmentCallback,
//     startDate = moment().subtract(1, 'days').format('YYYY-MM-DD'),
//     endDate = moment().format('YYYY-MM-DD')
// ) {
//     // const host = '192.168.1.197:8080';
//     const root = '../resources/json/';
//     let urlApi = '';

//     switch (typeRequest) {
//         case 'lastMeasure':
//             urlApi = root + 'last-measure.json';
//             break;
//         case 'topMeasuresHumidity':
//             urlApi = root + 'humidity.json';
//             break;
//         case 'topMeasuresPressure':
//             urlApi = root + 'pressure.json';
//             break;
//         case 'topMeasuresTemperature':
//             urlApi = root + 'temperature.json';
//             break;
//         case 'tableMeasures':
//         case 'graphMeasures':
//                 urlApi = root + 'date.json';
//             break;
//         default:
//             break;
//     }

//     const request = new XMLHttpRequest();

//     request.onload = function () {
//         if (request.status >= 200 && request.status < 400) {
//             jsonResult = JSON.parse(this.response)
//             treatmentCallback(jsonResult);
//         } else {
//             console.log('Erreur ...' + request.status)
//         }
//     }

//     // Open a new connection, using the GET request on the URL endpoint
//     request.open('GET', urlApi, true);
//     // console.log(urlApi);

//     // Send request
//     request.send();
// }

