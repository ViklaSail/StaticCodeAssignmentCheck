function arvaaluku(arvattava) {
   var arvasiOikein = false;
   var annettuLukuNumerona = 3;
   while(annettuLukuNumerona != 0) {
        annettulukuMerkki = prompt("anna luku");
        alert(annettulukuMerkki)
        annettuLukuNumerona = Number(annettulukuMerkki);
        if(annettuLukuNumerona < arvattava) {
            console.log("antamasi luku oli pienempi kuin vertailuluku");
        } else if(annettuLukuNumerona > arvattava) {
            console.log("antamasi luku oli suurempi kuin vertailuluku");
        } else {
            console.log("arvasit oikein");
            arvasiOikein = true;
        }       
   }
   return arvasiOikein;
}

prompt("annappa luku");
var tulos = arvaaluku(20);
console.log(tulos);

