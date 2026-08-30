const id = new URLSearchParams(window.location.search).get("id") || "bitcoin";
const coinLeft = document.getElementById("coinLeft");
const coinPrice = document.getElementById("coinPrice");
const favBtn = document.getElementById("favBtn");
const themeBtn = document.getElementById("themeBtn");
const ctx = document.getElementById("priceChart").getContext("2d");

let chart = null;

themeBtn.onclick = () => {
    themeBtn.textContent = document.body.classList.toggle("dark") ? "☀️" : "🌙";
};

function getFavs() {
    return JSON.parse(localStorage.getItem("crypto_favs") || "[]");
}

function syncFav() {
    favBtn.classList.toggle("active", getFavs().includes(id));
}

favBtn.onclick = () => {
    let favs = getFavs();
    favs = favs.includes(id) ? favs.filter(item => item !== id) : [...favs, id];
    localStorage.setItem("crypto_favs", JSON.stringify(favs));
    syncFav();
};

async function loadDetails() {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const data = await res.json();
    const up = (data.market_data.price_change_percentage_24h || 0) >= 0;

    coinLeft.innerHTML = `
        <img src="${data.image.large}">
        <h2>${data.name} (${data.symbol.toUpperCase()})</h2>`;
    coinPrice.innerHTML = `
        <h2>$${data.market_data.current_price.usd.toLocaleString()}</h2>
        <p class="${up ? 'green' : 'red'}">${up ? '+' : ''}${data.market_data.price_change_percentage_24h?.toFixed(2)}% (24h)</p>`;
    syncFav();
}

async function loadChart(days = 30) {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`);
    const data = await res.json();

    const labels = data.prices.map(([t]) => days === "1" ? new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date(t).toLocaleDateString());
    const prices = data.prices.map(([, p]) => p);

    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                data: prices,
                borderColor: "#7DD3FC",
                backgroundColor: "rgba(125,211,252,0.1)",
                borderWidth: 2,
                fill: true,
                tension: 0.2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { x: { grid: { display: false } }, y: { grid: { color: "#27272A" } } }
        }
    });
}

document.querySelectorAll(".time-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        loadChart(btn.dataset.days);
    };
});

loadDetails();
loadChart(30);