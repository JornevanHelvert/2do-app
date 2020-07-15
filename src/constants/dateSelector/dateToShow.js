const dayOfWeek = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

export const calculateDate = (daysToAdd) => {
    const today = new Date();
    today.setDate(today.getDate() + daysToAdd);
    today.setHours(0, 0, 0, 0);
    return today;
};

const getTitle = (daysToAdd) => {
    const date = calculateDate(daysToAdd);

    return `${dayOfWeek[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`
};

export const dateToShow = [
    {
        title: getTitle(-5),
        value: calculateDate(-5)
    },
    {
        title: getTitle(-4),
        value: calculateDate(-4)
    },
    {
        title: getTitle(-3),
        value: calculateDate(-3)
    },
    {
        title: getTitle(-2),
        value: calculateDate(-2)
    },
    {title: 'Gisteren', value: calculateDate(-1)},
    {title: 'Vandaag', value: calculateDate(0)},
    {title: 'Morgen', value: calculateDate(1)},
    {
        title: getTitle(2),
        value: calculateDate(2)
    },
    {
        title: getTitle(3),
        value: calculateDate(3)
    },
    {
        title: getTitle(4),
        value: calculateDate(4)
    },
    {
        title: getTitle(5),
        value: calculateDate(5)
    }
];
