function luvunArvaus(vertaa) {
    var arvasiOikein = false;
    var annettuLukuNumerona = 3;
    while(annettuLukuNumerona != 0) {
         annettulukuMerkki = prompt("anna luku");
         alert(annettulukuMerkki)
         annettuLukuNumerona = Number(annettulukuMerkki);
         if(annettuLukuNumerona < vertaa) {
             console.log("antamasi luku oli pienempi kuin vertailuluku");
         } else if(annettuLukuNumerona > vertaa) {
             console.log("antamasi luku oli suurempi kuin vertailuluku");
         } else {
             console.log("arvasit oikein");
             arvasiOikein = true;
         }       
    }
    return arvasiOikein;
 }
 
 prompt("annappa luku");
 var arvaus = luvunArvaus(30);
 console.log(arvaus);