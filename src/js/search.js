// Search for specific entry in database

import { persons } from "./index.js";
export let entriesFound = [];


let data2 = localStorage.getItem("entriesFound");

if (data2) {
    entriesFound = JSON.parse(data2);
    loadList2(entriesFound);
}

function loadList2(array2) {
    for (let el of array2) {
        const html = `<div id="${el.id}" class="item2">
                        <div class="info2">Name:<div class="name2 searchEntry">${el.name}</div></div>
                        <div class="info2">Date of birth:<div class="born2 searchEntry">${el.dob}</div></div>
                        <div class="info2">Age:<div class="age2 searchEntry">${el.age}</div></div>
                        <div class="info2">Place of birth:<div class="city2 searchEntry">${el.city}</div></div>
                        <div class="info2">ID:<div class="id2 searchEntry">${el.id}</div></div>
                        <div class="info2">Entered:<div class="added2 searchEntry">${el.entered}</div></div>
                        <div class="info2"><button type="button" class="removeSearchResult">remove</button></div>
                     </div>`;

        document.querySelector(".searchResult").insertAdjacentHTML("beforeend", html);
    }
}

export const searchBtn = document.querySelector(".search").addEventListener("click", () => {

    let name = document.querySelector(".searchInput");
    let newName;

    if (name.value.split(" ").length === 2) {
        let firstname = name.value.split(" ")[0].charAt(0).toUpperCase() + name.value.split(" ")[0].slice(1)
        let lastname = name.value.split(" ")[1].charAt(0).toUpperCase() + name.value.split(" ")[1].slice(1)
        newName = lastname + ", " + firstname
    }
    if (name.value.split(" ").length === 3) {
        let firstname = name.value.split(" ")[0].charAt(0).toUpperCase() + name.value.split(" ")[0].slice(1)
        let insertion = name.value.split(" ")[1]
        let lastname = name.value.split(" ")[2].charAt(0).toUpperCase() + name.value.split(" ")[2].slice(1)
        newName = lastname + " " + insertion + ", " + firstname
    }


    if (name.value === "") {
        alert("No search query!");
        return;
    }

    if (entriesFound.length > 0 && persons.length >= 0) {
        for (let el of entriesFound) {
            if (el.name === newName) {
                alert("You have found that one already!");
                name.value = "";
                return;
            }
        }
    }

    if (persons.length > 0) {
        for (let el of persons) {
            if (el.name === newName) {
                addItem(el);
                name.value = "";
                entriesFound.push(el);
            }
        }
    } else if (persons.length === 0) {
        alert("No data!");
        name.value = "";
        return;
    }

    let noMatch = persons.every((el) => el.name !== newName);

    if (noMatch) {
        alert("No matching data found!");
        name.value = "";
        return;
    }

    name.value = "";
    localStorage.setItem("entriesFound", JSON.stringify(entriesFound));
});


function addItem(entry) {
    const html = `<div id="${entry.id}" class="item2">
                        <div class="info2">Name:<div class="name2 searchEntry">${entry.name}</div></div>
                        <div class="info2">Date of birth:<div class="born2 searchEntry">${entry.dob}</div></div>
                        <div class="info2">Age:<div class="age2 searchEntry">${entry.age}</div></div>
                        <div class="info2">Place of birth:<div class="city2 searchEntry">${entry.city}</div></div>
                        <div class="info2">ID:<div class="id2 searchEntry">${entry.id}</div></div>
                        <div class="info2">Entered:<div class="added2 searchEntry">${entry.entered}</div></div>
                        <div class="info2"><button type="button" class="removeSearchResult">remove</button></div>
                     </div>`;

    document.querySelector(".searchResult").insertAdjacentHTML("beforeend", html);

}

document.querySelector(".clearResultsBtn").addEventListener("click", () => {
    const searchResults = [...document.querySelectorAll(".item2")];
    for (let el of searchResults) {
        el.remove();
        entriesFound = [];
        localStorage.setItem("entriesFound", JSON.stringify(entriesFound));
    }
});


document.querySelector('.searchResult').addEventListener('click', removeItem)
function removeItem(e) {

    const item = e.target.parentNode.parentNode
    const ID = e.target.parentNode.parentNode.id
    const button = e.target.classList.contains('removeSearchResult')
    console.log(button)
    if (button) {
        item.parentNode.removeChild(item)
    }
    entriesFound = entriesFound.filter((entry) => {
        return entry.id !== ID
    })
    localStorage.setItem("entriesFound", JSON.stringify(entriesFound))
}


// document.querySelector('.searchResult').addEventListener('click', removeItem)
// function removeItem(e) {

//     const item = e.target.parentNode.parentNode
//     const ID = e.target.parentNode.parentNode.id
//     if (ID) {
//         item.parentNode.removeChild(item)
//     }
//     entriesFound = entriesFound.filter((entry) => {
//         return entry.id !== ID
//     })
//     localStorage.setItem("entriesFound", JSON.stringify(entriesFound))
// }



