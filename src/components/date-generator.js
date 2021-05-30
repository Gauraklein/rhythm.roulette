const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// TODO: deal with edge case of dates matching or date being greater than now
const randomDates = () => {

    let date1 = randomDate(new Date(2009, 0, 1), new Date())

    let date2 = randomDate(new Date(2009, 0, 1), new Date())

    if (date1 > date2) {
        return {
            publishedAfter: date2.toISOString(),
            publishedBefore: date1.toISOString()
        }
    }
    else {
        return {
            publishedAfter: date1.toISOString(),
            publishedBefore: date2.toISOString()
        }
    }
}

export default randomDates