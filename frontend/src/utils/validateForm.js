// /src/utils/validateForm.js

/**
 * Ελέγχει αν το email είναι έγκυρο
 * @param {string} email - Η διεύθυνση email που θα ελεγχθεί
 * @returns {boolean} - Επιστρέφει true αν είναι έγκυρο, false αλλιώς
 */
export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

/**
 * Ελέγχει αν ο κωδικός είναι έγκυρος
 * @param {string} password - Ο κωδικός που θα ελεγχθεί
 * @returns {boolean} - Επιστρέφει true αν είναι έγκυρος, false αλλιώς
 */
export const validatePassword = (password) => {
    // Τουλάχιστον 8 χαρακτήρες, 1 πεζό, 1 κεφαλαίο και 1 αριθμό
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

/**
 * Ελέγχει αν ένα πεδίο είναι κενό
 * @param {string} fieldValue - Η τιμή του πεδίου που θα ελεγχθεί
 * @returns {boolean} - Επιστρέφει true αν το πεδίο είναι κενό, false αλλιώς
 */
export const isFieldEmpty = (fieldValue) => {
    return fieldValue.trim() === '';
};

/**
 * Ελέγχει αν δύο πεδία κωδικών είναι ταυτόσημα
 * @param {string} password - Ο πρώτος κωδικός
 * @param {string} confirmPassword - Ο δεύτερος κωδικός (επαλήθευση)
 * @returns {boolean} - Επιστρέφει true αν οι κωδικοί είναι ίδιοι, false αλλιώς
 */
export const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};

/**
 * Ελέγχει αν το όνομα είναι έγκυρο (τουλάχιστον 3 χαρακτήρες)
 * @param {string} name - Το όνομα που θα ελεγχθεί
 * @returns {boolean} - Επιστρέφει true αν είναι έγκυρο, false αλλιώς
 */
export const validateName = (name) => {
    return name.length >= 3;
};

/**
 * Συνάρτηση για την επικύρωση φόρμας login
 * @param {Object} formData - Τα δεδομένα της φόρμας (π.χ., email, password)
 * @returns {Object} - Επιστρέφει αντικείμενο με μηνύματα σφαλμάτων ή null αν δεν υπάρχουν σφάλματα
 */
export const validateLoginForm = (formData) => {
    const errors = {};

    if (isFieldEmpty(formData.email)) {
        errors.email = 'Το email είναι απαραίτητο';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Το email δεν είναι έγκυρο';
    }

    if (isFieldEmpty(formData.password)) {
        errors.password = 'Ο κωδικός είναι απαραίτητος';
    }

    return Object.keys(errors).length === 0 ? null : errors;
};

/**
 * Συνάρτηση για την επικύρωση φόρμας εγγραφής
 * @param {Object} formData - Τα δεδομένα της φόρμας (π.χ., name, email, password, confirmPassword)
 * @returns {Object} - Επιστρέφει αντικείμενο με μηνύματα σφαλμάτων ή null αν δεν υπάρχουν σφάλματα
 */
export const validateSignupForm = (formData) => {
    const errors = {};

    if (isFieldEmpty(formData.name)) {
        errors.name = 'Το όνομα είναι απαραίτητο';
    } else if (!validateName(formData.name)) {
        errors.name = 'Το όνομα πρέπει να έχει τουλάχιστον 3 χαρακτήρες';
    }

    if (isFieldEmpty(formData.email)) {
        errors.email = 'Το email είναι απαραίτητο';
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Το email δεν είναι έγκυρο';
    }

    if (isFieldEmpty(formData.password)) {
        errors.password = 'Ο κωδικός είναι απαραίτητος';
    } else if (!validatePassword(formData.password)) {
        errors.password = 'Ο κωδικός πρέπει να περιέχει τουλάχιστον 8 χαρακτήρες, 1 πεζό, 1 κεφαλαίο και 1 αριθμό';
    }

    if (isFieldEmpty(formData.confirmPassword)) {
        errors.confirmPassword = 'Η επαλήθευση του κωδικού είναι απαραίτητη';
    } else if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
        errors.confirmPassword = 'Οι κωδικοί δεν ταιριάζουν';
    }

    return Object.keys(errors).length === 0 ? null : errors;
};
