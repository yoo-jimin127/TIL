// ❌
for (let j = 0; j < 34; j++) {
    s += (t[j]*4)/5;
}

// ⭕️
let realDayPerIdealDay = 4;
const WORK_DAYS_PER_WEEK = 5;
let sum = 0;
for (let j = 0; j < NUMBER_OF_TASKS; j++) {
    let realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
    let realTaskWeeks = (realTaskDays / WORK_DAYS_PER_WEEK);
    sum += realTaskWeeks;
}
