document.getElementById('purchase-btn').addEventListener('click', processTransaction);

function processTransaction() {
    let price = 19.5; // Beispielwert, kann dynamisch gesetzt werden
    let cash = parseFloat(document.getElementById('cash').value);
    let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

    let changeDue = calculateChange(price, cash, cid);
    displayChange(changeDue);
}

function calculateChange(price, cash, cid) {
    const currencyUnit = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    };

    let changeDue = cash - price;
    let totalCID = cid.reduce((total, [unit, amount]) => total + amount, 0).toFixed(2);

    if (totalCID < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (totalCID === changeDue) {
        return { status: "CLOSED", change: cid };
    } else {
        let changeArray = [];
        for (let i = cid.length - 1; i >= 0; i--) {
            const coinName = cid[i][0];
            const coinTotal = cid[i][1];
            const coinValue = currencyUnit[coinName];
            let coinAmount = (coinTotal / coinValue).toFixed(0);
            let coinsToReturn = 0;

            while (changeDue >= coinValue && coinAmount > 0) {
                changeDue -= coinValue;
                changeDue = changeDue.toFixed(2);
                coinAmount--;
                coinsToReturn++;
            }

            if (coinsToReturn > 0) {
                changeArray.push([coinName, coinsToReturn * coinValue]);
            }
        }

        if (changeDue > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        }

        return { status: "OPEN", change: changeArray };
    }
}


function displayChange(change) {
    const changeDueElement = document.getElementById('change-due');

    if (typeof change === 'string') {
        changeDueElement.innerText = change;
    } else {
        let displayText = `Status: ${change.status} `;
        change.change.forEach(([currency, amount]) => {
            displayText += `${currency}: $${amount.toFixed(2)} `;
        });
        changeDueElement.innerText = displayText;
    }
}

