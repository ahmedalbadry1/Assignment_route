function week(day) {
    switch (day) {
        case 1: return "Sunday";
        case 2: return "Monday";
        case 3: return "Tuesday";
        case 4: return "Wednesday";
        case 5: return "Thursday";
        case 6: return "Friday";
        case 7: return "Saturday";
        default: return "Invalid day";
    }
}

console.log(week(1)); // "Sunday"
console.log(week(5)); // "Thursday"
console.log(week(9)); // "Invalid day"