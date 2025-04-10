document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        if (!validateForm()) {
            event.preventDefault();
            return;
        }

        // Capture form data
        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phonenum").value.trim(),
            age: document.getElementById("age").value.trim(),
            gender: document.querySelector('input[name="mygender"]:checked')?.nextSibling.textContent.trim(),
            departure: document.querySelector('input[name="departuredate"]').value,
            returnDate: document.querySelector('input[name="returndate"]').value,
            destinations: Array.from(document.querySelectorAll('input[name="td"]:checked')).map(cb => cb.nextSibling.textContent.trim()),
            package: document.querySelector('input[name="locations"]:checked')?.nextSibling.textContent.trim(),
            acceptedTerms: document.querySelector('input[name="t&c"]').checked,
        };

        // Store in localStorage (or log to console/file if using backend)
        localStorage.setItem("registrationData", JSON.stringify(formData));
        console.log("Form Data Saved:", formData);
    });
});
