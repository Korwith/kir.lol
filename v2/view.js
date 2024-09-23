const page_button = document.querySelectorAll('.page_button');
const tracker_page = document.querySelector('.page.tracker');

// Handle pages
function showPage(page_class) {
    let active_page = document.querySelector('.page.show');
    if (active_page) {
        active_page.classList.remove('show')
    }

    let found_page = document.querySelector('.page.' + page_class);
    found_page.classList.add('show');
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

// Handle tacker page
function loadTrackerWidget() {
    let widget = new TradingView.widget({
        "autosize": true,
        "symbol": "NASDAQ:AAPL",
        "timezone": "Etc/UTC",
        "theme": "dark",
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
        "custom_css_url": "css/widget.css" // Ensure this is correct
    });

    let widget_dom = document.querySelector('#' + widget.id);
    let widget_parent = widget_dom.parentElement;
    tracker_page.appendChild(widget_parent);
}

handlePageButton();
loadTrackerWidget();