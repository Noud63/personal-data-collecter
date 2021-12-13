
export const entryObject = (fields, name) =>  {

    const DOB = fields[1].value;
    let city = fields[2].value;
    city = city.charAt(0).toUpperCase() + city.slice(1);
    const firstLetter = city.slice(0, 1).toUpperCase();
    let type = DOB.split("-")[0].slice(2);
    let id = name.split(" ")[0].replace(",", "");
    let num = Math.floor(Math.random() * 99) + 1;
    let num2 = Math.floor(Math.random() * 99) + 1;
    if (num < 10) num = "0" + num;
    if (num2 < 10) num2 = "0" + num2;

    id = id + num2 + "-" + type + "-" + firstLetter + num;

    return {id, DOB, city, name}

}
