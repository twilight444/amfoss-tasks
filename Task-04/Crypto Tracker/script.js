const cryptoTable = document.getElementById("cryptoTable");
const searchInput = document.getElementById("searchInput");
const themeBtn = document.getElementById("themeBtn");
const wishlistBtn = document.getElementById("wishlistBtn");

let coinList = [];
let onlyFavs = false;

themeBtn.onclick = () => {
    themeBtn.textContent = document.body.classList.toggle("dark") ? "☀️" : "🌙";
};

function renderCoins(coins) {
    cryptoTable.innerHTML = coins.map((c, i) => {
        const up = (c.price_change_percentage_24h || 0) >= 0;
        return `
            <tr onclick="location.href='coin.html?id=${c.id}'">
                <td>${i + 1}</td>
                <td><div class="coin-info"><img src="${c.image}"><span>${c.name}</span></div></td>
                <td>$${c.current_price?.toLocaleString() || 0}</td>
                <td>$${c.market_cap?.toLocaleString() || 0}</td>
                <td class="${up ? 'green' : 'red'}">${up ? '+' : ''}${c.price_change_percentage_24h?.toFixed(2) || '0.00'}%</td>
            </tr>`;
    }).join("") || `<tr><td colspan="5" style="text-align:center">No coins found</td></tr>`;
}

function filter() {
    const q = searchInput.value.toLowerCase().trim();
    const favs = JSON.parse(localStorage.getItem("crypto_favs") || "[]");
    renderCoins(coinList.filter(c => 
        (c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)) &&
        (!onlyFavs || favs.includes(c.id))
    ));
}

async function loadData() {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1");
    coinList = await res.json();
    filter();
}

wishlistBtn.onclick = () => {
    onlyFavs = !onlyFavs;
    wishlistBtn.classList.toggle("active", onlyFavs);
    filter();
};

searchInput.oninput = filter;
loadData();
setInterval(loadData, 30000);