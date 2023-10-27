import { useEffect, useMemo, useState, useCallback } from "react";
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const dayInMonth = styles.dayInMonth;
const dayNotInMonth = styles.dayNotInMonth;
const hoursTemplate = Array.from({ length: 24 }, (v, i) => ({ hour: i, event: [] }));
const options = { month: 'short', day: 'numeric' };
const daysName = [
    {
        weekDayNumber: 0, 
        daysAbreviation: "Dim", 
        daysName: "Dimanche"
    }, 
    {
        weekDayNumber: 1, 
        daysAbreviation: "Lun", 
        daysName: "Lundi"
    }, 
    {
        weekDayNumber: 2, 
        daysAbreviation: "Mar", 
        daysName: "Mardi"
    }, 
    {
        weekDayNumber: 3, 
        daysAbreviation: "Mer", 
        daysName: "Mercredi"
    }, 
    {
        weekDayNumber: 4, 
        daysAbreviation: "Jeu", 
        daysName: "Jeudi"
    }, 
    {
        weekDayNumber: 5, 
        daysAbreviation: "Ven", 
        daysName: "Vendredi"
    }, 
    {
        weekDayNumber: 6, 
        daysAbreviation: "Sam", 
        daysName: "Samedi"
    }, 

]
function declareDay(year, month, dayNumber, className) {
    return {
        dayDate: new Date(year, month, dayNumber),
        dayNumber: dayNumber,
        year: year,
        className: className,
        hour: hoursTemplate
    };
}

export default function useCalendar() {
    const [calendar, setCalendar] = useState([]); 
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const handleNextYear = useCallback(() => {
        setCurrentYear(currentYear + 1);
    }, [currentYear]);

    const handlePrevYear = useCallback(() => {
        const year = new Date().getFullYear();
        if (currentYear > year) {
            setCurrentYear(currentYear - 1);
        }
    }, [currentYear]);

    const getYear = useMemo(() => {
        const year =[]; 
        const currentMonth = new Date().getMonth();
        let remainingMonthNames = monthNames.slice(currentMonth);
        let dayNumberOfPrevMonth;

        for (let month = 0; month < 12; month++) {
            if (month < currentMonth) continue;

            const firstDayOfMonth = new Date(currentYear, month, 1).getDay();
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
            const daysInPreviousMonth = new Date(currentYear, month, 0).getDate();
            const weekInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);
            dayNumberOfPrevMonth = daysInPreviousMonth - firstDayOfMonth + 1;

            const months = Array.from({ length: weekInMonth }, (_, week) => {
                return Array.from({ length: 7 }, (_, dayOfWeek) => {
                    const dayNumber = week * 7 + dayOfWeek - firstDayOfMonth + 1;
                    let dayDetails = {};

                    if (week === 0 && dayOfWeek < firstDayOfMonth) {
                        dayDetails = declareDay(currentYear, month - 1, dayNumberOfPrevMonth++, dayNotInMonth);
                    } else if (week === weekInMonth - 1 && dayNumber > daysInMonth) {
                        dayDetails = declareDay(currentYear, month + 1, dayNumber - daysInMonth, dayNotInMonth);
                    } else {
                        dayDetails = declareDay(currentYear, month, dayNumber, dayInMonth);
                    }
                    return dayDetails;
                });
            });
            year.push(months);
        }

        return { year, remainingMonthNames };
    
    }, [currentYear]);

    useEffect(() => {
        setCalendar(getYear.year);
    }, [getYear.year]);

    return {
        year: calendar,
        remainingMonthNames: getYear.remainingMonthNames,
        handleNextYear,
        handlePrevYear,
        options, 
        daysName
    };
}
