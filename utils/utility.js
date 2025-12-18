export function updateRule(ruleId, isValid) {
    const rule = document.getElementById(ruleId);
    rule.classList.toggle("valid", isValid);
}

/* ================= HELPERS ================= */
export function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    if (input) {
        input.classList.add("error-border");
    } else if (errorId === "ratingError") {
        document.querySelector(".star-rating").classList.add("error-border");
    }
    return false;
}

export function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";
    if (input) {
        input.classList.remove("error-border");
    } else if (errorId === "ratingError") {
        document.querySelector(".star-rating").classList.remove("error-border");
    }
    return true;
}

