
import { getTimeStamp } from "./timestamp.js";
import { searchBtn, entriesFound } from "./search.js"
import { entryObject } from "./entryObject.js"
import { parseName } from "./getName.js"

export let persons = [];

let data = localStorage.getItem("persons");

if (data) {
    persons = JSON.parse(data);
    loadList(persons);
}

//Load persons list fromlocalStorage
function loadList(array) {
    for (let el of array) {
        const html = `<div id="${el.id}" class="item">
                    <div class="info">Name:<div class="name">${el.name}</div></div>
                    <div class="info">Date of birth:<div class="born">${el.dob}</div></div>
                    <div class="info">Age:<div class="age">${el.age}</div></div>
                    <div class="info">Place of birth:<div class="city">${el.city}</div></div>
                    <div class="info">ID:<div class="id">${el.id}</div></div>
                    <div class="info enter">Created at:<div class="added">${el.entered}</div></div>
                </div>`;

        document.querySelector(".container").insertAdjacentHTML("beforeend", html);
    }
}


//Add new entry to UI and persons array
const btn = document.querySelector(".submitBtn");
btn.addEventListener("click", addToList);

function addToList() {
    // Clear UI data container before adding new data
    clearUI();

    const fields = [...document.querySelectorAll(".field")];
    let name = fields[0].value;
    name = parseName(name)

    //Calculates age by date
    let age = function (DOB) {
        var birthday = +new Date(DOB);                                   // + converts date object to integer
        return ~~((Date.now() - birthday) / 31557600000);                // 31557600000 ms = 24 * 3600 * 365.25 * 1000
    };                                                                   // ~~ returns an integer, no decimals

    let entered = getTimeStamp();
    const person = entryObject(fields, name)

    let obj = {
        name: person.name,
        dob: person.DOB,
        city: person.city,
        id: person.id,
        age: age(person.DOB),
        entered: entered,
    };


    //Validate entry
    persons.forEach((el) => {
        if (obj.name === el.name && obj.city === el.city && obj.dob === el.dob) {
            alert("Data already exist!");
            clearFields(fields);
            loadList(persons);
            obj = {};
            return;
        }
    });

    if (obj.name === "" || obj.city === "" || obj.dob === "") {
        alert("Please fill out all required fields!");
        loadList(persons);
        return;
    }

    //Fill in firstname AND! surname
    if (obj.name.trim().indexOf(" ") == -1) {
        alert("Fill in both first and lastname!");
        loadList(persons);
        return;
    }

    //regex date (yyyy-dd-mm) validation
    const regEx = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;

    if (!obj.dob.match(regEx)) {
        alert("Please fill out correct date format.");
        loadList(persons);
        return;
    } else {
        const html = `<div id="${obj.id}" class="item">
                        <div class="info">Name:<div class="name">${obj.name}</div></div>
                        <div class="info">Date of birth:<div class="born">${obj.dob}</div></div>
                        <div class="info">Age:<div class="age">${obj.age}</div></div>
                        <div class="info">Place of birth:<div class="city">${obj.city}</div></div>
                        <div class="info">ID:<div class="id">${obj.id}</div></div>
                        <div class="info enter">Created at:<div class="added">${obj.entered}</div></div>
                        <div class="checkandadd">
                            <div><button type="submit" class="btn2">Add entry</button></div>
                            <div><button type="submit" class="btn3">Remove entry</button></div>
                        </div>
                    </div>`;

        document.querySelector(".container").insertAdjacentHTML("beforeend", html);

    }

    persons.push(obj);
    btn.disabled = true;

    //Checkbutton attached at new entry, add entry and update UI
    const btn2 = document.querySelector(".btn2");
    btn2.addEventListener("click", () => {
        document.querySelector(".item").classList.remove("checkandadd");
        clearUI();
        loadList(persons);
        btn.disabled = false;
    });

    //Delete new entry if there are any mistakes
    const btn3 = document.querySelector(".btn3");
    btn3.addEventListener("click", (e) => {
        const ID = e.target.parentNode.parentNode.parentNode.id
        const item = e.target.parentNode.parentNode.parentNode
        console.log(item)
        if (ID) {
            item.parentNode.removeChild(item)
        }
        persons = persons.filter((person) => {
            return person.id !== ID;
        });
        localStorage.setItem("persons", JSON.stringify(persons));
        loadList(persons);
        btn.disabled = false;
    });


    // Sort entries in alphabetical order
    persons = persons.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    localStorage.setItem("persons", JSON.stringify(persons));
    clearFields(fields);
}

///////////////* end addToList function *//////////////////


//Clear UI
function clearUI() {
    const info = [...document.querySelectorAll(".item")];
    for (let el of info) {
        el.remove();
    }
}

// Clear input fields
function clearFields(fields) {
    for (let el of fields) {
        el.value = "";
    }
}

// Warning overlay blinks every second
let timer;
function blink() {
    timer = setInterval(function () {
        var ele = document.querySelector(".warning");
        ele.style.color = (ele.style.color == 'red' ? 'white' : 'red');
    }, 700);
}


// Clear all data from UI and localStorage
document.querySelector(".clearStorageBtn").addEventListener("click", clearAllData);
function clearAllData() {

    if (persons.length === 0) {
        alert("Database is empty!");
        return;
    } else {
        document.querySelector(".overlay").style.display = "flex";
        blink()
    }

    document.querySelector(".yesno").addEventListener("click", (e) => {
        if (e.target.classList.contains("yes")) {
            document.querySelector(".overlay").style.display = "none";
            clearUI();
            persons = [];
            localStorage.setItem("persons", JSON.stringify(persons));
        }

        if (e.target.classList.contains("no")) {
            document.querySelector(".overlay").style.display = "none";
            //clearUI();
            //loadList(persons);
        }
        clearInterval(timer)
    });
}


// Clear/delete items from UI and localStorage
document.querySelector(".removeLastItemBtn").addEventListener("click", deleteLastItem);
function deleteLastItem() {
    const item = document.querySelector(".container div.item:last-of-type");
    item.remove();
    persons.splice(-1, 1);
    localStorage.setItem("persons", JSON.stringify(persons));
}

// Delete an item by ID
const delItem = document.querySelector(".deleteItemBtn");
delItem.addEventListener("click", deleteItem);

function deleteItem() {
    const items = [...document.querySelectorAll(".item")];
    const itemID = document.querySelector(".itemId");

    if (itemID.value === "" || itemID.value.split('-').length !== 3) {
        alert("No ID or invalid ID!");
        itemID.value = "";
        return;
    }
    let ID = itemID.value;
    if (ID) {
        for (let el of items) {
            if (el.id == ID) {
                el.remove();
                itemID.value = "";
            }
        }
        // new array of items that don't match inserted id
        persons = persons.filter((x) => {
            return x.id != ID;
        });
    }

    localStorage.setItem("persons", JSON.stringify(persons));
}
