import "./datetimeselector.scss";
import months from "../../context/months";
import React, { useEffect, useState } from "react";

const datetimeLimitTypes = [
    "past",
    "future",
] as const;

export type DatetimeLimit = typeof datetimeLimitTypes[number];

const calculateDayLimit = (month: number, year: number): number => {
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        return 31
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30
    } else {
        if (year % 4 === 0) {
            return 29
        } else {
            return 28
        }
    }
}

type DateSelect = { day: number, month: number, year: number };
type DatetimeSelectorOptions = { dayLimit: { from: number, to: number, select: number[] }, monthLimit: { from: number, to: number, select: number[] }, yearLimit: { from: number, to: number, select: number[] } };
const initialSelectorOptions: DatetimeSelectorOptions = {
    dayLimit: {
        from: 1,
        to: 31,
        select: []
    },
    monthLimit: {
        from: 1,
        to: 12,
        select: []
    },
    yearLimit: {
        from: 2023,
        to: 2040,
        select: []
    }
}

type DatetimeProps = { date: Date, setDate: React.Dispatch<React.SetStateAction<Date>>, title?: string, limit?: { date: Date, type: DatetimeLimit } };

export default function DatetimeSelector(props: DatetimeProps) {
    
    const { date, setDate, title, limit } = props;
    const initialDateSelect = { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
    const [dateSelect, setDateSelect] = useState<DateSelect>(initialDateSelect);
    const [selectorOptions, setSelectorOptions] = useState<DatetimeSelectorOptions>(initialSelectorOptions);
    
    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => setDateSelect(prev => ({ ...prev, day: Number(e.target.value) }));
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => setDateSelect(prev => ({ ...prev, month: Number(e.target.value) }));
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => setDateSelect(prev => ({ ...prev, year: Number(e.target.value) }));
    
    useEffect(() => {

        setSelectorOptions(prev => {

            prev.dayLimit.select = [];
            prev.monthLimit.select = [];
            prev.yearLimit.select = [];

            //const dayLength = selectorOptions.dayLimit.to - selectorOptions.dayLimit.from;
            for (var i = prev.dayLimit.from; i <= prev.dayLimit.to; i++) {
                prev.dayLimit.select = [...prev.dayLimit.select, i];
            }

            for (var i = prev.monthLimit.from; i <= prev.monthLimit.to; i++) {
                prev.monthLimit.select = [...prev.monthLimit.select, i];
            }

            for (var i = prev.yearLimit.from; i <= prev.yearLimit.to; i++) {
                prev.yearLimit.select = [...prev.yearLimit.select, i];
            }

            return { ...prev };
        });

    }, [selectorOptions.dayLimit.to, selectorOptions.dayLimit.from, selectorOptions.monthLimit.to, selectorOptions.monthLimit.from, selectorOptions.yearLimit.to, selectorOptions.yearLimit.from]);

    useEffect(() => {

        const dateDayLimit = calculateDayLimit(dateSelect.month, dateSelect.year);
        setSelectorOptions(prev => {
            prev.dayLimit.to = dateDayLimit;

            if (limit) {
                const day = limit.date.getDate();
                const month = limit.date.getMonth() + 1;
                const year = limit.date.getFullYear();

                if (limit.type === "future") {
                    prev.yearLimit.from = year;
                    prev.yearLimit.to = year + 15;

                    if (dateSelect.year === year) {
                        prev.monthLimit.from = month;
                    } else {
                        prev.monthLimit.from = 1;
                    }

                    if (dateSelect.month === month) {
                        prev.dayLimit.from = day + 1;
                    } else {
                        prev.dayLimit.from = 1;
                    }
                } else {
                    prev.yearLimit.from = year - 15;
                    prev.yearLimit.to = year;

                    if (dateSelect.year === year) {
                        if (day === 1) {
                            prev.monthLimit.to = month - 1;
                        } else {
                            prev.monthLimit.to = month;
                        }
                    } else {
                        prev.monthLimit.to = 12;
                    }

                    if (dateSelect.month === month) {
                        prev.dayLimit.to = day - 1;
                    } else {
                        prev.dayLimit.to = dateDayLimit;
                    }
                }
            }

            return { ...prev };
        });

    }, [dateSelect.month, dateSelect.year, limit]);

    useEffect(() => {

        setDate(() => {
            const newDate = new Date();
            newDate.setDate(dateSelect.day);
            newDate.setMonth(dateSelect.month - 1);
            newDate.setFullYear(dateSelect.year);
            return newDate
        });

    }, [dateSelect.day, dateSelect.month, dateSelect.year]);
    

    return (
        <div className="datetime-selector form-el" style={{ height: title ? "55px" : "35px" }}>
            <label>{title}</label>
            <div className="space"></div>
            <div className="selector-container">
                <div className="day-selector selector">
                    <select name="day" value={dateSelect.day} onChange={handleDayChange}>
                        {
                            selectorOptions.dayLimit.select.map((day, index) => {
                                return (
                                    <option value={day} key={index}>{day}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="month-selector selector">
                    <select name="month" value={dateSelect.month} onChange={handleMonthChange}>
                        {
                            selectorOptions.monthLimit.select.map((month, index) => {
                                return (
                                    <option value={month} key={index}>{months[month - 1]}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="year-selector selector">
                    <select name="year" value={dateSelect.year} onChange={handleYearChange}>
                        {
                            selectorOptions.yearLimit.select.map((year, index) => {
                                return (
                                    <option value={year} key={index}>{year}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}