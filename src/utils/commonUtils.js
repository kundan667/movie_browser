export const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

export const getGenreById = (ids) => {

    let allGenre = JSON.parse(localStorage.getItem('genre'));
    if (isEmpty(allGenre) || isEmpty(ids)) return
    if (Array.isArray(ids)) {
        let names = [];
        ids.forEach(item => {
            let filtered = allGenre.find(d => d.id === item);
            names.push(filtered.name)
        })
        return names
    } else {
        let filtered = allGenre.find(d => d.id === ids)
        return filtered.name
    }
}

export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            console.log("DEBOUNCED");
            func(...args)
        }, delay);
    }
}

export const generateObjects = (start, end) => {
    const arr = [];
    for (let val = start; val <= end; val++) {
        arr.push({ id: val.toString(), name: val.toString() });
    }
    return arr;
}
