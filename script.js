const performanceUpgrades = [
    {
        name: "Breaks 1",
        price: 1800
    },
     {
        name: "Breaks 2",
        price: 2700
    },
     {
        name: "Breaks 3",
        price: 3600
    },
    {
        name: "Transmission 1",
        price: 900
    },
     {
        name: "Transmission 2",
        price: 1125
    },
     {
        name: "Transmission 3",
        price: 1350
    },
    {
        name: "Suspension 1",
        price: 900
    },
    {
        name: "Suspension 2",
        price: 1800
    },
    {
        name: "Suspension 3",
        price: 3150
    },
    {
        name: "Suspension 4",
        price: 3600
    },
     {
        name: "Armor 1",
        price: 900
    },
    {
        name: "Armor 2",
        price: 2700
    },
    {
        name: "Armor 3",
        price: 3600
    },
    {
        name: "Armor 4",
        price: 4500
    },
    {
        name: "Armor 5",
        price: 6750
    },
     {
        name: "Turbo",
        price: 5400
    },
    {
        name: "EMS 2",
        price: 2250
    },
    {
        name: "EMS 3",
        price: 3150
    },
    {
        name: "EMS 4",
        price: 4500
    },
    {
        name: "EMS 5",
        price: 7200
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