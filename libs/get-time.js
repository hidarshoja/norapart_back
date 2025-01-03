import jalaali from 'jalaali-js';

export const getStartOfDay = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
};



export const getStartOfMonthPersian = () => {
    const today = new Date();
    const jalaaliDate = jalaali.toJalaali(today); // Convert to Persian date
    const startOfMonthGregorian = jalaali.toGregorian(jalaaliDate.jy, jalaaliDate.jm, 1); // First day of the month in Persian calendar
    return new Date(startOfMonthGregorian.gy, startOfMonthGregorian.gm - 1, startOfMonthGregorian.gd, 0, 0, 0, 0);
};
