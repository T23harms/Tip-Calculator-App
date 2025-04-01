document.addEventListener("DOMContentLoaded", () => {
    const bill = document.getElementById("dollar-amount");
    const custom = document.querySelector(".custom");  
    const people = document.getElementById("people-amount");
    const amount = document.getElementById("tip-amount");
    const total = document.getElementById("total");
    const reset = document.getElementById("reset-button");
    const tipButtons = document.querySelectorAll(".tip-boxes > button");
    const errorMessage = document.getElementById("error-message");  

    // Button-Click Event
    tipButtons.forEach(button => {
        button.addEventListener("click", function() {
            tipButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            custom.value = ""; 
            calculateTip();
        });
    });

    // Berechnungsfunktion
    function calculateTip() {
        let billValue = parseFloat(bill.value) || 0;
        let peopleValue = parseFloat(people.value.trim()) || 0; 
        let activeButton = document.querySelector(".tip-boxes > button.active");
        let tipPercentage = activeButton ? parseFloat(activeButton.innerText.replace("%", "")) : 0;

        let customValue = parseFloat(custom.value);
        if (!isNaN(customValue) && customValue > 0) {
            tipPercentage = customValue;
        }

        console.log("Bill Value:", billValue);
        console.log("People Value:", peopleValue);
        console.log("Tip Percentage:", tipPercentage);
        
        if (peopleValue <= 0) {  
            amount.value = "$0.00";
            total.value = "$0.00";
            errorMessage.style.display = "inline";
            return;
        } else {
            errorMessage.style.display = "none";
        }

        let tipAmountPerPerson = (billValue * (tipPercentage / 100)) / peopleValue;
        let totalPerPerson = (billValue / peopleValue) + tipAmountPerPerson;

        console.log("Tip Amount Per Person:", tipAmountPerPerson);
        console.log("Total Per Person:", totalPerPerson);

        amount.value = `$${tipAmountPerPerson.toFixed(2)}`;  
        total.value = `$${totalPerPerson.toFixed(2)}`;
    }

    // Reset-Button aktivieren/deaktivieren
    function checkResetButton() {
        if (bill.value || people.value || custom.value) {
            reset.removeAttribute("disabled");
            reset.style.opacity = "1";
            reset.style.cursor = "pointer";
        } else {
            reset.setAttribute("disabled", "true");
            reset.style.opacity = "0.2";
            reset.style.cursor = "not-allowed";
        }
    }

    // Event Listener für Input-Felder
    bill.addEventListener("input", calculateTip);
    people.addEventListener("input", calculateTip);
    custom.addEventListener("input", () => {
        tipButtons.forEach(btn => btn.classList.remove("active"));
        calculateTip();
    });

    bill.addEventListener("input", checkResetButton);
    people.addEventListener("input", checkResetButton);
    custom.addEventListener("input", checkResetButton);

    // Reset-Button Event
    reset.addEventListener("click", () => {
        bill.value = "";
        people.value = "";
        custom.value = "";
        tipButtons.forEach(btn => btn.classList.remove("active"));
        amount.value = "$0.00";  
        total.value = "$0.00";
        errorMessage.style.display = "none";
        checkResetButton();
    });
});
