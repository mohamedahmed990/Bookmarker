
var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("siteURL");
var rules = document.getElementById("rules");
var repeated = document.getElementById("repeated");
var tableBody = document.getElementById("tBody");

var sites = [];


loadData();

function loadData(){
    if(localStorage.getItem("sites")!==null){
        sites=JSON.parse(localStorage.getItem("sites"));
        displayAllElements();
    }
}

function isValid() {
    return siteUrl.value.search(/^(https?):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]+\.[a-zA-Z]{2,6}$/) !== -1 &&
        siteName.value.search(/[a-zA-Z]{3,}/g) !== -1;
}

function isRepeated(url) {
    for (var i = 0; i < sites.length; i++) {
        if (url === sites[i].url) {
            return true;
        }
    }
    return false;
}

function displayLastElement(lastIndex) {
    tableBody.innerHTML += `<tr>
            <td>${lastIndex + 1}</td>
            <td>${sites[lastIndex].name}</td>
            <td>
                <a href=${sites[lastIndex].url} target="_blank">
                    <button  class=" btn btn-primary">Visit</button>
                </a>
            </td>
            <td>
                <button onclick="deleteSite(${lastIndex})"  class=" btn btn-primary">Delete</button>
            </td>    
        </tr> ` ;
}

function displayAllElements() {
    tableBody.innerHTML = "";
    for (var i = 0; i < sites.length; i++) {
        tableBody.innerHTML += `<tr>
                <td>${i + 1}</td>
                <td>${sites[i].name}</td>
                <td>
                    <a href=${sites[i].url} target="_blank"s>
                        <button  class=" btn btn-primary">Visit</button>
                    </a>
                </td>
                <td>
                    <button onclick="deleteSite(${i})"  class=" btn btn-primary">Delete</button>
                </td>    
            </tr> `
    }
}
function resetInput() {
    siteName.value = "";
    siteUrl.value = "";
}
function addWebsite() {
    rules.style.display = "none";
    repeated.style.display = "none";

    if (isValid()) {
        var site = {
            name: siteName.value,
            url: siteUrl.value,
        };
        
    } else {
        rules.style.display = "block";
        return;
    }

    if (isRepeated(site.url)===false) {
        sites.push(site);
    } else {
        repeated.style.display = "block";
        return;
    }

    localStorage.setItem("sites",JSON.stringify(sites));
    displayLastElement(sites.length - 1);
    resetInput();
}
function deleteSite(index) {
    sites.splice(index, 1);
    localStorage.setItem("sites",JSON.stringify(sites));
    displayAllElements();
}