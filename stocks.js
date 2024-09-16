const sidebar = document.querySelector('nav.sidebar');
const my = sidebar.querySelector('.my');
const alphabetical = sidebar.querySelector('.alphabetical');
const placeholder = document.querySelector('.placeholder');

const selected_icon = document.querySelector('.selected_icon');
const selected_name = document.querySelector('.selected_name');
const selected_ticker = document.querySelector('.selected_ticker');
const selected_change = document.querySelector('.selected_change');
const selected_value = document.querySelector('.selected_value');

const canvas = document.querySelector('canvas');

let full_company_data = [];
let featured_company_data = [];

async function getAllCompanies() {
    const all_company = 'source/stock_info.csv';
    try {
        const response = await fetch(all_company);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let text = response.text();
        let rows = (await text).split('\n');
        for (var i = 0; i < rows.length; i++) {
            let this_row = rows[i];
            let each = this_row.split(',');
            full_company_data.push({
                'ticker': each[0],
                'company': each[1],
                'exchange': each[2]
            })
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function getFeaturedCompanies() {
    const all_company = 'source/featured.csv';
    try {
        const response = await fetch(all_company);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let text = response.text();
        let rows = (await text).split('\n');
        for (var i = 1; i < rows.length; i++) {
            let this_row = rows[i];
            let each = this_row.split(',');
            featured_company_data.push({
                'ticker': each[0],
                'company': each[1],
                'exchange': each[2]
            })
        }
        loadCompanyList();
    } catch (error) {
        console.error(error.message);
    }
}

async function getMyCompanies() {
    const my_company = 'source/my_stocks.csv';
    try {
        const response = await fetch(my_company);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let text = response.text();
        let rows = (await text).split('\n');
        for (var i = 1; i < rows.length; i++) {
            let this_row = rows[i];
            let each = this_row.split(',');
        }
    }
}

let whitelist = [
    'BROS',
    'GDRX'
]

let scroll_index = 0;
function loadCompanyList() {
    for (var i = 0; i < 100; i++) {
        let this_company = featured_company_data[i];
        let clone = placeholder.cloneNode(true);
        clone.classList.remove('placeholder');
        alphabetical.appendChild(clone);

        let logo = clone.querySelector('.stock_logo');
        let name = clone.querySelector('.company_name');
        let ticker = clone.querySelector('.stock_ticker');

        function addInfo(event, logo_assist) {
            name.textContent = this_company.company;
            ticker.textContent = this_company.ticker;

            if (logo_assist) {
                logo.src = `icon/${this_company.ticker}.png`
            }

            (function (clone, this_company) {
                clone.onclick = function () {
                    getStockData(this_company);
                }
            })(clone, this_company);
        }

        logo.onload = addInfo;
        logo.src = `https://assets.parqet.com/logos/symbol/${this_company.ticker}?format=png`;
        if (whitelist.includes(this_company.ticker)) { addInfo(null, true) };
    }
    scroll_index++;
}

// Define an async function to fetch stock data
async function getStockData(stock) {
    const apiKey = 'QBDnJz7aP7o7Q1w4nSyT57MXMtqmeFAC'; // Store your API key
    const date = '2024-09-13';  // Change this to the previous day's date
    const url = `https://api.polygon.io/v2/aggs/ticker/${stock.ticker}/range/1/minute/${date}/${date}?apiKey=${apiKey}`;

    try {
        const response = await fetch(url); // Wait for the fetch to complete
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json(); // Wait for the JSON conversion
        const results = data.results; // Extract the results
        sendResults(stock, results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function sendResults(stock, results) {
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

    selected_icon.src = `https://assets.parqet.com/logos/symbol/${stock.ticker}?format=png`;
    selected_name.textContent = stock.company;
    selected_ticker.textContent = stock.ticker;
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
    ctx.strokeStyle = '#252525';
    ctx.lineWidth = 5;
    ctx.setLineDash([20, 10]);
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(1000, 100);
    ctx.moveTo(0, 750 / 2);
    ctx.lineTo(1000, 750 / 2);
    ctx.moveTo(0, 650);
    ctx.lineTo(1000, 650);
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

        let this_adjusted_y = (((this_result.o - lowest) * (650 - 100)) / (highest - lowest)) + 100;
        let next_adjusted_y = (((next_result.o - lowest) * (650 - 100)) / (highest - lowest)) + 100;

        ctx.moveTo(this_adjusted_x, this_adjusted_y);
        ctx.lineTo(next_adjusted_x, next_adjusted_y);
    }

    ctx.stroke();
}

getAllCompanies();
getFeaturedCompanies();