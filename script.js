const performanceUpgrades = [
    {
        name: "Turbo Kit",
        price: 5000
    },
    {
        name: "ECU Tune",
        price: 2500
    },
    {
        name: "Supercharger",
        price: 7500
    },
    {
        name: "Transmission Upgrade",
        price: 4000
    },
    {
        name: "Coilovers",
        price: 2000
    }
];

let cosmeticUpgrades = [];

renderPerformanceUpgrades();

function renderPerformanceUpgrades() {

    const container =
        document.getElementById("performanceList");

    container.innerHTML = "";

    performanceUpgrades.forEach((upgrade, index) => {

        container.innerHTML += `
        <div class="upgrade">

            <input
                type="checkbox"
                id="perf${index}"
                onchange="calculateTotal()">

            ${upgrade.name}
            ($${upgrade.price})

        </div>
        `;
    });
}

function addCosmeticUpgrade() {

    const name =
        document.getElementById("cosmeticName").value;

    const price =
        Number(
            document.getElementById("cosmeticPrice").value
        );

    if (!name || !price) {
        alert("Enter a name and price.");
        return;
    }

    cosmeticUpgrades.push({
        name: name,
        price: price,
        labor: 150
    });

    renderCosmetics();

    calculateTotal();

    document.getElementById("cosmeticName").value = "";
    document.getElementById("cosmeticPrice").value = "";
}

function renderCosmetics() {

    const container =
        document.getElementById("cosmeticList");

    container.innerHTML = "";

    cosmeticUpgrades.forEach(item => {

        const total =
            item.price + item.labor;

        container.innerHTML += `
        <div class="upgrade">

            ${item.name}

            -
            $${total}

            (Includes $150 Labor)

        </div>
        `;
    });
}

function calculateTotal() {

    let subtotal = 0;

    performanceUpgrades.forEach((upgrade, index) => {

        const checkbox =
            document.getElementById(`perf${index}`);

        if (checkbox.checked) {
            subtotal += upgrade.price;
        }
    });

    cosmeticUpgrades.forEach(item => {

        subtotal += item.price;
        subtotal += item.labor;
    });

    const discountPercent =
        Number(
            document.getElementById("discount").value
        );

    const discountAmount =
        subtotal * (discountPercent / 100);

    const finalTotal =
        subtotal - discountAmount;

    document.getElementById("subtotal").innerText =
        `Subtotal: $${subtotal.toFixed(2)}`;

    document.getElementById("discountAmount").innerText =
        `Discount: $${discountAmount.toFixed(2)}`;

    document.getElementById("finalTotal").innerText =
        `Final Total: $${finalTotal.toFixed(2)}`;
}