const months = [
    {
        name: "Janeiro",
        numberAsString: '01',
        numberAsNumber: 1,
    },
    {
        name: "Fevereiro",
        numberAsString: '02',
        numberAsNumber: 2,
    },
    {
        name: "Março",
        numberAsString: '03',
        numberAsNumber: 3
    },
    {
        name: "Abril",
        numberAsString: '04',
        numberAsNumber: 4,
    },
    {
        name: "Maio",
        numberAsString: '05',
        numberAsNumber: 5,
    },
    {
        name: "Junho",
        numberAsString: '06',
        numberAsNumber: 6,
    },
    {
        name: "Julho",
        numberAsString: '07',
        numberAsNumber: 7,
    },
    {
        name: "Agosto",
        numberAsString: '08',
        numberAsNumber: 8,
    },
    {
        name: "Setembro",
        numberAsString: '09',
        numberAsNumber: 9,
    },
    {
        name: "Outubro",
        numberAsString: '10',
        numberAsNumber: 10,
    },
    {
        name: "Novembro",
        numberAsString: '11',
        numberAsNumber: 11,
    },
    {
        name: "Dezembro",
        numberAsString: '12',
        numberAsNumber: 12,
    }
]

export function getAllMonths() {
    return months
}

export function getMonth(month: string) {
    return months.find(element => element.numberAsString === month)
}
