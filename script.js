const performanceCategories = {
    Brakes: [
        { name: "Brakes 1", price: 1800 },
        { name: "Brakes 2", price: 2700 },
        { name: "Brakes 3", price: 3600 }
    ],

    Transmission: [
        { name: "Transmission 1", price: 900 },
        { name: "Transmission 2", price: 1125 },
        { name: "Transmission 3", price: 1350 }
    ],

    Suspension: [
        { name: "Suspension 1", price: 900 },
        { name: "Suspension 2", price: 1800 },
        { name: "Suspension 3", price: 3150 },
        { name: "Suspension 4", price: 3600 }
    ],

    Armor: [
        { name: "Armor 1", price: 900 },
        { name: "Armor 2", price: 2700 },
        { name: "Armor 3", price: 3600 },
        { name: "Armor 4", price: 4500 },
        { name: "Armor 5", price: 6750 }
    ],

    Turbo: [
        { name: "Turbo", price: 5400 }
    ],

    EMS: [
        { name: "EMS 2", price: 2250 },
        { name: "EMS 3", price: 3150 },
        { name: "EMS 4", price: 4500 },
        { name: "EMS 5", price: 7200 }
    ]
};

let cosmeticUpgrades = [];

// Order of categories for left + middle columns
const leftColumnCategories = ["Brakes", "Transmission", "Suspension"];
const middleColumnCategories = ["Armor", "Turbo", "EMS"];

// Start app
renderPerformanceUpgrades();
renderCosmetics();
calculateTotal();

function renderPerformanceUpgrades() {
    const col1 = document.getElementById("col1");
    const col2 = document.getElementById("col2");

    // Reset the columns but keep the panel title
    col1.innerHTML = `<div class="panel-title performance-title">Performance Upgrades</div>`;
    col2.innerHTML = `<div class="panel-title performance-title">Performance Upgrades</div>`;

    // Render left column
    leftColumnCategories.forEach(category => {
        if (!performanceCategories[category]) return;
        const categoryBox = createCategoryBox(category, performanceCategories[category]);
        col1.appendChild(categoryBox);
    });

    // Render middle column
    middleColumnCategories.forEach(category => {
        if (!performanceCategories[category]) return;
        const categoryBox = createCategoryBox(category, performanceCategories[category]);
        col2.appendChild(categoryBox);
    });
}

function createCategoryBox(categoryName, items) {
    const categoryBox = document.createElement("div");
    categoryBox.className = "category";

    const title = document.createElement("h3");
    title.textContent = categoryName;
    categoryBox.appendChild(title);

    items.forEach(item => {
        const row = document.createElement("div");
        row.className = "upgrade";

        row.innerHTML = `
            <label>
                <input
                    type="checkbox"
                    data-price="${item.price}"
                    onchange="calculateTotal()"
                >
                ${item.name}
            </label>
            <span>$${item.price.toLocaleString()}</span>
        `;

        categoryBox.appendChild(row);
    });

    return categoryBox;
}

function addCosmeticUpgrade() {
    const name = document.getElementById("cosmeticName").value.trim();
    const price = Number(document.getElementById("cosmeticPrice").value);

    if (!name || !price) {
        alert("Enter a cosmetic name and price.");
        return;
    }

    cosmeticUpgrades.push({
        name,
        price,
        labor: 150
    });

    document.getElementById("cosmeticName").value = "";
    document.getElementById("cosmeticPrice").value = "";

    renderCosmetics();
    calculateTotal();
}

function renderCosmetics() {
    const container = document.getElementById("cosmeticList");
    container.innerHTML = "";

    if (cosmeticUpgrades.length === 0) {
        container.innerHTML = `
            <div class="empty-cosmetics">
                No cosmetic upgrades added yet.
            </div>
        `;
        return;
    }

    cosmeticUpgrades.forEach((item, index) => {
        const total = item.price + item.labor;

        const row = document.createElement("div");
        row.className = "cosmetic-item";

        row.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>Base: $${item.price.toLocaleString()} + $150 labor</small>
            </div>

            <div style="display:flex; align-items:center; gap:10px;">
                <span>$${total.toLocaleString()}</span>
                <button class="remove-btn" onclick="removeCosmeticUpgrade(${index})">X</button>
            </div>
        `;

        container.appendChild(row);
    });
}

function removeCosmeticUpgrade(index) {
    cosmeticUpgrades.splice(index, 1);
    renderCosmetics();
    calculateTotal();
}

function calculateTotal() {
    let subtotal = 0;
    let laborTotal = 0;

    document.querySelectorAll(".performance-col input[type='checkbox']").forEach(box => {
        if (box.checked) {
            subtotal += Number(box.dataset.price);
        }
    });

    cosmeticUpgrades.forEach(item => {
        subtotal += item.price;
        subtotal += item.labor;
        laborTotal += item.labor;
    });

    const removeLabor = document.getElementById("removeLabor")?.checked;

    let adjustedSubtotal = subtotal;

    if (removeLabor) {
        adjustedSubtotal -= laborTotal;
    }

    const discountPercent = Number(document.getElementById("discount").value);
    const discountAmount = adjustedSubtotal * (discountPercent / 100);
    const finalTotal = adjustedSubtotal - discountAmount;

    document.getElementById("subtotalAmount").innerText =
        `$${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    document.getElementById("laborTotalAmount").innerText =
        `$${laborTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    document.getElementById("discountValue").innerText =
        `$${discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    document.getElementById("finalTotalAmount").innerText =
        `$${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}