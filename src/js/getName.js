
export const parseName = (name) => {
    if (name.split(" ").length === 2) {
        let firstname = name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[0].slice(1)
        let lastname = name.split(" ")[1].charAt(0).toUpperCase() + name.split(" ")[1].slice(1)
        name = lastname + ", " + firstname
    }

    //if there is a surnameprefix like 'van', 'de', 'von', 'de la' or 'del' etc.
    if (name.split(" ").length === 3) {
        let firstname = name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[0].slice(1)
        let surnamePrefix = name.split(" ")[1]
        let lastname = name.split(" ")[2].charAt(0).toUpperCase() + name.split(" ")[2].slice(1)
        name = lastname + " " + surnamePrefix + ", " + firstname
    }

    return name
}


export const findName = (name) => {
    let newName;
    if (name.value.split(" ").length === 2) {
        let firstname = name.value.split(" ")[0].charAt(0).toUpperCase() + name.value.split(" ")[0].slice(1)
        let lastname = name.value.split(" ")[1].charAt(0).toUpperCase() + name.value.split(" ")[1].slice(1)
        newName = lastname + ", " + firstname
    }
    if (name.value.split(" ").length === 3) {
        let firstname = name.value.split(" ")[0].charAt(0).toUpperCase() + name.value.split(" ")[0].slice(1)
        let surnamePrefix = name.value.split(" ")[1]
        let lastname = name.value.split(" ")[2].charAt(0).toUpperCase() + name.value.split(" ")[2].slice(1)
        newName = lastname + " " + surnamePrefix + ", " + firstname
    }

    return newName
}