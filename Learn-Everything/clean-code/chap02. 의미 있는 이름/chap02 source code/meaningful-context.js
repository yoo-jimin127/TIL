function printGuessStatistics(candidate, count) {
    let number;
    let verb;
    let pluralModifier;
    if (count === 0) {
        number = 'no';
        verb = 'are';
        pluralModifier = 's';
    } else if (count === 1) {
        number = '1';
        verb = 'is';
        pluralModifier = '';
    } else {
        number = count.toString();
        verb = 'are';
        pluralModifier = 's';
    }
}
