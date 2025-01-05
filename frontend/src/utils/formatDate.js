// /src/utils/formatDate.js

/**
 * Συνάρτηση για την μορφοποίηση ημερομηνίας σε μορφή DD/MM/YYYY
 * @param {string} date - Η ημερομηνία ως string ή Date object
 * @returns {string} - Η ημερομηνία σε μορφή DD/MM/YYYY
 */
export const formatDate = (date) => {
    // Αν η ημερομηνία είναι τύπου string, προσπαθούμε να την μετατρέψουμε σε Date object
    const newDate = new Date(date);

    // Ελέγχουμε αν η ημερομηνία είναι έγκυρη
    if (isNaN(newDate.getTime())) {
        throw new Error("Invalid date format");
    }

    const day = newDate.getDate().toString().padStart(2, "0"); // Προσθήκη μηδενικού μπροστά από μονοψήφιες ημέρες
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // Οι μήνες ξεκινούν από το 0, οπότε προσθέτουμε +1
    const year = newDate.getFullYear();

    // Επιστρέφουμε την ημερομηνία σε μορφή DD/MM/YYYY
    return `${day}/${month}/${year}`;
};
