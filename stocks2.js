const sidebar = document.querySelector('nav.sidebar');
const placeholder = document.querySelector('.placeholder');

const top_data = document.querySelector('.top_data');
const canvas = document.querySelector('canvas');
const loading_screen = document.querySelector('.loading_screen');

const selected_icon = document.querySelector('.selected_icon');
const selected_name = document.querySelector('.selected_name');
const selected_ticker = document.querySelector('.selected_ticker');
const selected_change = document.querySelector('.selected_change');
const selected_value = document.querySelector('.selected_value');

let search_list;
let time;
let timerInterval;

async function fetchData(datasheet) {
    let url = 'source/' + datasheet;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let text = response.text();
        let rows = (await text);
        return rows.split('\n');
    } catch (error) {
        console.error(error.message);
    }
}

let manual_icon = ['BROS', 'GDRX'];

function loadSidebar(category, array) {
    let parent = sidebar.querySelector('.' + category);
    for (var i = 1; i < array.length; i++) {
        let entry = array[i].split(',');

        let clone = placeholder.cloneNode(true);
        let icon = clone.querySelector('.stock_logo');
        let name = clone.querySelector('.company_name');
        let ticker = clone.querySelector('.stock_ticker');

        if (!manual_icon.includes(entry[0])) {
            icon.src = `https://assets.parqet.com/logos/symbol/${entry[0]}?format=png`
        } else {
            icon.src = `icon/${entry[0]}.png`
        }
        name.textContent = entry[1];
        ticker.textContent = entry[0];

        clone.setAttribute('stock', entry[0]);
        clone.setAttribute('name', entry[1]);
        clone.classList.remove('placeholder');
        clone.onclick = stockButtonClick;
        parent.appendChild(clone);
    }
}

function stockButtonClick(event) {
    let found_ticker = event.target.getAttribute('stock');
    let found_name = event.target.getAttribute('name');
    let is_loading = !loading_screen.classList.contains('hide');
    if (!found_ticker || !found_name) { return false };
    if (is_loading) { return false };
    getStockData(found_ticker, found_name);
}

function startTimer() {
    timerInterval = setInterval(function () {
        time++;
    }, 1000);
}
function resetTimer() {
    clearInterval(timerInterval);
    time = 0;
    startTimer();
}
async function getStockData(ticker, name) {
    const apiKey = 'QBDnJz7aP7o7Q1w4nSyT57MXMtqmeFAC'; // Store your API key
    const date = '2024-09-13';  // Change this to the previous day's date
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/minute/${date}/${date}?apiKey=${apiKey}`;

    if (time < 12) {
        canvas.classList.add('hide');
        top_data.classList.add('hide');
        loading_screen.classList.remove('hide');

        setTimeout(function() {
            getStockData(ticker, name);
        }, 12000 - (time * 1000));
        return false;
    }

    try {
        const response = await fetch(url); // Wait for the fetch to complete
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json(); // Wait for the JSON conversion
        const results = data.results; // Extract the results   

        canvas.classList.remove('hide');
        top_data.classList.remove('hide');
        loading_screen.classList.add('hide');

        resetTimer();
        loadStockStats(ticker, name, results);
    } catch (error) {
        console.error('Error fetching data:', error);

    }
}

function loadStockStats(ticker, name, results) {
    let highest = 0;
    let lowest = 0;
    let total = 0;
    for (var i = 0; i < results.length; i++) {
        let this_result = results[i];
        if (i == 0) {
            lowest = this_result.o;
        }
        if (this_result.o > highest) {
            highest = this_result.o;
        }
        if (this_result.o < lowest) {
            lowest = this_result.o;
        }
        total += this_result.o;
    }
    let average = total / results.length;
    createCanvasLines(average, highest, lowest);
    createCanvasGraph(results, highest, lowest);

    let start = results[0].o;  // Starting value
    let end = results[results.length - 1].o;  // Ending value
    let calculated_change = (((end - start) / start) * -100).toFixed(2);

    selected_icon.src = `https://assets.parqet.com/logos/symbol/${ticker}?format=png`;
    selected_name.textContent = name;
    selected_ticker.textContent = ticker;
    selected_change.textContent = calculated_change + '%';
    selected_value.textContent = '$' + (results[results.length - 1].o).toFixed(2);

    selected_change.classList.remove('up');
    selected_change.classList.remove('down');
    if (calculated_change > 0) {
        selected_change.classList.add('up')
    } else {
        selected_change.classList.add('down');
    }
}

function createCanvasLines(average, highest, lowest) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#252525';
    ctx.lineWidth = 5;
    ctx.setLineDash([20, 10]);
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(1000, 10);
    ctx.moveTo(0, 650 / 2);
    ctx.lineTo(1000, 650 / 2);
    ctx.moveTo(0, 640);
    ctx.lineTo(1000, 640);
    ctx.stroke();
}

function createCanvasGraph(results, highest, lowest) {
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);

    ctx.beginPath();
    for (var i = 0; i < results.length; i++) {
        let this_result = results[i];
        let next_result = results[i + 1];
        if (!next_result) { continue };

        let this_adjusted_x = (i / results.length) * 1000;
        let next_adjusted_x = ((i + 1) / results.length) * 1000;

        let this_adjusted_y = (((this_result.o - lowest) * (650)) / (highest - lowest)) + 0;
        let next_adjusted_y = (((next_result.o - lowest) * (650)) / (highest - lowest)) + 0;

        ctx.moveTo(this_adjusted_x, this_adjusted_y);
        ctx.lineTo(next_adjusted_x, next_adjusted_y);
    }

    ctx.stroke();
}

async function load() {
    time = localStorage.getItem('timeout');
    resetTimer();
    let featured = fetchData('featured.csv');
    let my = fetchData('my_stocks.csv');
    let all = fetchData('stock_info.csv');
    loadSidebar('my_stocks', await my);
    loadSidebar('alphabetical', await featured);
    search_list = all;
    getStockData('AAPL', 'Apple');
}

function beforeUnload() {
    localStorage.setItem('timeout', time);
}

load();
document.addEventListener('beforeunload', beforeUnload);