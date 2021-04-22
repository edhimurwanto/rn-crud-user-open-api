const flagColor = (status) => {
    const color = String(status).toLowerCase() === 'active' ? "green" : "orange"
    return color;
}

const sort = (data, type) => {
    if (type == 'asc') {
        return data.sort((a, b) => {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        })
    } else if (type == 'desc') {
        return data.sort((a, b) => {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        })
    } else if (type == 'emai-desc') {
        return data.sort((a, b) => {
            var nameA = a.email.toUpperCase(); // ignore upper and lowercase
            var nameB = b.email.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        })
    } else if (type == 'email-asc') {
        return data.sort((a, b) => {
            var nameA = a.email.toUpperCase(); // ignore upper and lowercase
            var nameB = b.email.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        })
    } else {
        return data;
    }
}

export { flagColor, sort }