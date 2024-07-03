const longMonths = [1, 3, 5, 7, 8, 10, 12];
const isLeap = (year) => new Date(year, 1, 29).getDate() === 29;


export const validateDay = (value, formValues) => {
    const { month, year } = formValues;
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    const valueNum = parseInt(value);

    if (longMonths.includes(monthNum)) {
        return valueNum > 0 && valueNum <= 31;
    } else if (isLeap(yearNum)) {
        return valueNum > 0 && valueNum <= 29;
    } else if (!isLeap(yearNum)) {
        return valueNum > 0 && valueNum <= 28;
    } else {
        return valueNum > 0 && valueNum <= 30;
    }
};

export const validateMonth = (value, formValues) => {
    // console.log('month value: ', value);
    // console.log('formValues: ', formValues);
    const valueNum = parseInt(value);
    return (valueNum >= 1 && valueNum <= 12);
}

export const validateYear = (_value, formValues) => {
    const { year } = formValues;
    const yearNum = parseInt(year);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return yearNum > 1900 && yearNum <= currentYear;
};