document.getElementById("ieskoti").addEventListener("click", ieskoti)
document.getElementById("paieska").addEventListener("keydown", handle)

uzslepti(true);

let prev = "";

function ieskoti(){
    let paieska = document.getElementById("paieska").value;
    if(paieska.length==0){
        alert("Būtina įrašyti filmo pavadinimą");
    }
    else if (paieska.toLowerCase() == prev.toLowerCase()){

    }
    else {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (){
            if(xhr.readyState === 4){
                let response = JSON.parse(xhr.responseText);
                if(response.Response == "True"){
                    uzslepti(false);
                    document.getElementById("nuotrauka").setAttribute("src", response.Poster);
                    document.getElementById("pavadinimas").innerText= response.Title;
                    document.getElementById("ingridientai").innerText=response.Plot
                }
                else {
                    uzslepti(true);
                    let pavadinimas = document.getElementById("pavadinimas");
                    pavadinimas.parentElement.hidden = false;
                    pavadinimas.removeAttribute("href");
                    pavadinimas.innerText = "Tokio recepto nėra!";

                }
            }
        };
        xhr.open("GET", `http://www.recipepuppy.com/api/?q=${paieska}`);
        xhr.send();
        prev = paieska;
    }
}
function handle(e){
    if (e.keyCode === 13){
        ieskoti();
    }
}
function uzslepti(slepti){
    let main = document.getElementsByTagName("main")[0].children;
    for (const iterator of main){
        iterator.hidden = slepti;
        if (iterator.tagName == "DIV"){
            for (const another of iterator.children){
                another.hidden = slepti;
            }
        }
    }
}
