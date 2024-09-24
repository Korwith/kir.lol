const page_button = document.querySelectorAll('.page_button');
const home_page = document.querySelector('.page.home');
const tracker_page = document.querySelector('.page.tracker');
const logo_button = document.querySelector('.icon.logo');

const horizontal = document.querySelector('.horizontal');
const sidebar = document.querySelector('nav.sidebar');
const content = document.querySelector('.content');
const tab_select = document.querySelector('.tab_select');

const sidebar_list = sidebar.querySelector('.stock_holder');
const stock_placeholder = document.querySelector('.placeholder');

const iframe_link = {
    'home': {
        'banner': 'https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22title%22%3A%22S%26P%20500%20Index%22%7D%2C%7B%22proName%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22title%22%3A%22US%20100%20Cash%20CFD%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%20to%20USD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22Bitcoin%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22Ethereum%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22compact%22%2C%22colorTheme%22%3A%22dark%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A104%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22ticker-tape%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fticker-tape%2F%22%7D',
        'overview': 'https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22showFloatingTooltip%22%3Afalse%2C%22plotLineColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(240%2C%20243%2C%20250%2C%200)%22%2C%22scaleFontColor%22%3A%22rgba(209%2C%20212%2C%20220%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22belowLineFillColorGrowingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22belowLineFillColorFallingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22symbolActiveColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22d%22%3A%22S%26P%20500%20Index%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22d%22%3A%22US%20100%20Cash%20CFD%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ADJI%22%2C%22d%22%3A%22Dow%20Jones%20Industrial%20Average%20Index%22%7D%2C%7B%22s%22%3A%22INDEX%3ANKY%22%2C%22d%22%3A%22Nikkei%20225%22%7D%2C%7B%22s%22%3A%22INDEX%3ADEU40%22%2C%22d%22%3A%22DAX%20Index%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3AUKXGBP%22%2C%22d%22%3A%22FTSE%20100%20Index%22%7D%5D%2C%22originalTitle%22%3A%22Indices%22%7D%2C%7B%22title%22%3A%22Futures%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME_MINI%3AES1!%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22CME%3A6E1!%22%2C%22d%22%3A%22Euro%22%7D%2C%7B%22s%22%3A%22COMEX%3AGC1!%22%2C%22d%22%3A%22Gold%22%7D%2C%7B%22s%22%3A%22NYMEX%3ACL1!%22%2C%22d%22%3A%22WTI%20Crude%20Oil%22%7D%2C%7B%22s%22%3A%22NYMEX%3ANG1!%22%2C%22d%22%3A%22Gas%22%7D%2C%7B%22s%22%3A%22CBOT%3AZC1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Futures%22%7D%2C%7B%22title%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CBOT%3AZB1!%22%2C%22d%22%3A%22T-Bond%22%7D%2C%7B%22s%22%3A%22CBOT%3AUB1!%22%2C%22d%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBL1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AFBTP1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBM1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%2C%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%2C%22d%22%3A%22EUR%20to%20USD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%2C%22d%22%3A%22GBP%20to%20USD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%2C%22d%22%3A%22USD%20to%20JPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%2C%22d%22%3A%22USD%20to%20CHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%2C%22d%22%3A%22AUD%20to%20USD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%2C%22d%22%3A%22USD%20to%20CAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%5D%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22market-overview%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fmarket-overview%2F%22%7D',
        'most_active': 'https://www.tradingview-widget.com/embed-widget/hotlists/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22exchange%22%3A%22US%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22showFloatingTooltip%22%3Afalse%2C%22plotLineColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(240%2C%20243%2C%20250%2C%200)%22%2C%22scaleFontColor%22%3A%22rgba(209%2C%20212%2C%20220%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22belowLineFillColorGrowingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22belowLineFillColorFallingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22symbolActiveColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22hotlists%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fmarket-movers%2F%22%7D',    
    },
    'news': {
        'full': 'https://www.tradingview-widget.com/embed-widget/timeline/#%7B%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22regular%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22colorTheme%22%3A%22dark%22%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22timeline%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Ftimeline%2F%22%7D',
    },
    'crypto': {
        'full': 'https://www.tradingview-widget.com/embed-widget/crypto-mkt-screener/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22defaultColumn%22%3A%22overview%22%2C%22screener_type%22%3A%22crypto_mkt%22%2C%22displayCurrency%22%3A%22USD%22%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22market%22%3A%22crypto%22%2C%22enableScrolling%22%3Atrue%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22cryptomktscreener%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fcrypto-mkt-screener%2F%22%7D',
    }
}

// Handle pages
function showPage(page_class) {
    let active_page = document.querySelector('.page.show');
    if (active_page) {
        active_page.classList.remove('show')
    }

    let found_page = document.querySelector('.page.' + page_class);
    found_page.classList.add('show');

    let found_iframe = found_page.querySelector('iframe');
    if (!found_iframe) {
        loadPageContent(page_class);
    }

    if (window.innerWidth < 767) {
        sidebarButton();
    }
}

function pageButtonClick(event) {
    let last_class = Array.from(event.target.classList).pop();
    showPage(last_class);
}

function handlePageButton() {
    for (var i = 0; i < page_button.length; i++) {
        let this_button = page_button[i];
        this_button.onclick = pageButtonClick;
    }
}

// handle sidebar open
function sidebarButton() {
    if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        content.classList.remove('hide');
    } else {
        sidebar.classList.add('show');
        content.classList.add('hide');
    }
}

async function fetchSidebarData() {
    let url = 'source/featured.csv';
    try {
        let response = await fetch(url)
        if (!response.ok) {
            throw new Error(response.status);
        }
        let text = await response.text();
        loadSidebarData(text);
    } catch (error) {
        console.error(error);
    }
}

function loadSidebarData(text) {
    let lines = text.split('\n');
    for (var i = 1; i < lines.length; i++) {
        let this_row = lines[i];
        let split = this_row.split(',');
        let clone = stock_placeholder.cloneNode(true);
        let clone_icon = clone.querySelector('.stock_icon');
        let clone_name = clone.querySelector('.stock_name');
        let clone_ticker = clone.querySelector('.stock_ticker');

        clone_icon.src = `https://assets.parqet.com/logos/symbol/${split[0]}?format=png`
        clone_ticker.textContent = split[0];
        clone_name.textContent = split[1];
        clone.classList.remove('placeholder');
        sidebar_list.appendChild(clone);
    }
}

// handle widget gen
function loadPageContent(page) {
    let page_widget = iframe_link[page];
    let page_element = document.querySelector('.page.' + page);
    if (page_widget.full) {
        loadWidget(page_element, page_widget.full);
        return;
    }

    for (var i in page_widget) {
        let holder = page_element.querySelector('.' + i);
        let link = page_widget[i];
        loadWidget(holder, link)
    }
}

function loadWidget(holder, link) {
    let iframe = document.createElement('iframe');
    iframe.src = link;
    holder.appendChild(iframe);
}

function openTab(event) {
    if (!event.target) { return false };
    let to_open = event.target.getAttribute('open');
    if (!to_open) { return false };
    if (event.target.classList.contains('active')) { return false };
    
    let active_tab = tab_select.querySelector('.active');
    active_tab.classList.remove('active');
    event.target.classList.add('active');

    let active_page = horizontal.querySelector('.show');
    let to_open_dom = horizontal.querySelector('.' + to_open);
    to_open_dom.classList.add('show');
    active_page.classList.remove('show');
}

function handleTabSelect() {
    let tab_button = tab_select.querySelectorAll('button');
    for (var i = 0; i < tab_button.length; i++) {
        let this_button = tab_button[i];
        this_button.onclick = openTab;
    }
}

// Handle tacker page
function loadTrackerWidget() {
    let widget = new TradingView.widget({
        "autosize": true,
        "symbol": "NASDAQ:AAPL",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "3",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": true,
        "withdateranges": true,
        "range": "YTD",
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "details": true,
        "hotlist": true,
        "calendar": true,
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "container_id": "tradingview_1dcca",
    });

    let widget_dom = document.querySelector('#' + widget.id);
    let widget_parent = widget_dom.parentElement;
    tracker_page.appendChild(widget_parent);
}

loadPageContent('home');
handlePageButton();
loadTrackerWidget();
handleTabSelect();
fetchSidebarData();
logo_button.onclick = sidebarButton;