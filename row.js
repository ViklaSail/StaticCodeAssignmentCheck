const row_data_extraction = require('./quizModule');
var submissionlist = []

test('extract student data from CSV ', () => {
    const data = row_data_extraction.row_data_extraction({
        "Sukunimi": "Sukunimi1",
        Etunimi: "Etunimi1",
        "Sähköpostiosoite": "Etunimi1.Sukunimi1@edu.lapinamk.fi",
        Tila: "Palautettu",
        Aloitettiin: "21. tammikuuta 2022  14:21",
        Suoritettu: "25. tammikuuta 2022  05:10",
        "Suorituskerran kesto": "3 päivää 14 tuntia",
        "Arvosana/1,00": "0,00",
        "Kysymys 1": "Required Structures:[for(3), while, if] Required Variables:  [ARPAMUUTTUJA1, ARPAMUUTTUJA2(2)] VÄHENNÄ KAKSI SATUNNAISTA LUKUA TOISISTAAN. Tulosta lopputulos. käytä lukujen generointiin Math-kirjaston (paketin) random-komentoa (e. funktiota). Tallenna satunnaiset luvut muuttujiin ARPAMUUTTUJA1 ja ARPAMUUTTUJA2.\r\n\r\nTallenna laskutoimituksen tulos muuttujaan ARPAEROTUS. Esittele/määrittele nämä muuttujat ennen käyttöä.\r\n\r\nEtsi tietoa googlella jos on tarpeen.\r\n\r\nHUOM: nimeä muuttujannimet täsmälleen niinkuin on kerrottu. Jos tarkistus ilmoittaa tehtävän vääräksi, yritä muutamia kertoja uudelleen. Sen jälkeen pyydä vertaistukea. Lopuksi ota yhteyttä opettajaan: ehkä tehtävän tarkastus ei toimi.\r\n\r\nHUOM: välilyönnit = merkin ympärille. Puolipiste (;) rivin loppuun , parametrien väliin tai esittelyjen väliin. pilkku ja puolipiste (,;) suoraan edellisen merkkijonon (sanan) yhteyteen.",
        "Vastaus 1": "setInterval(function(){\r\n    random = (Math.floor((Math.random()*15)+1));\r\n    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;\r\n    random = random * plusOrMinus; \r\n    currentnumber = document.getElementById('number');\r\n\r\n    document.getElementById('number').innerHTML =  parseInt(currentnumber.innerHTML) + random;\r\n\r\n }, 1000);",
      })
    expect(data).toBe([
        {
          Sukunimi: "Luola",
          Etunimi: "Sohail",
          "Sähköpostiosoite": "sohail.luola@edu.lapinamk.fi",
          Tila: "Palautettu",
          Aloitettiin: "21. tammikuuta 2022  14:21",
          Suoritettu: "25. tammikuuta 2022  05:10",
          "Suorituskerran kesto": "3 päivää 14 tuntia",
          "Arvosana/1,00": "0,00",
          "Kysymys 1": "Required Structures:[for(3), while, if] Required Variables:  [ARPAMUUTTUJA1, ARPAMUUTTUJA2(2)] VÄHENNÄ KAKSI SATUNNAISTA LUKUA TOISISTAAN. Tulosta lopputulos. käytä lukujen generointiin Math-kirjaston (paketin) random-komentoa (e. funktiota). Tallenna satunnaiset luvut muuttujiin ARPAMUUTTUJA1 ja ARPAMUUTTUJA2.\r\n\r\nTallenna laskutoimituksen tulos muuttujaan ARPAEROTUS. Esittele/määrittele nämä muuttujat ennen käyttöä.\r\n\r\nEtsi tietoa googlella jos on tarpeen.\r\n\r\nHUOM: nimeä muuttujannimet täsmälleen niinkuin on kerrottu. Jos tarkistus ilmoittaa tehtävän vääräksi, yritä muutamia kertoja uudelleen. Sen jälkeen pyydä vertaistukea. Lopuksi ota yhteyttä opettajaan: ehkä tehtävän tarkastus ei toimi.\r\n\r\nHUOM: välilyönnit = merkin ympärille. Puolipiste (;) rivin loppuun , parametrien väliin tai esittelyjen väliin. pilkku ja puolipiste (,;) suoraan edellisen merkkijonon (sanan) yhteyteen.",
          "Vastaus 1": "setInterval(function(){\r\n    random = (Math.floor((Math.random()*15)+1));\r\n    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;\r\n    random = random * plusOrMinus; \r\n    currentnumber = document.getElementById('number');\r\n\r\n    document.getElementById('number').innerHTML =  parseInt(currentnumber.innerHTML) + random;\r\n\r\n }, 1000);",
        },
      ]);
});

//https://stackoverflow.com/questions/50863312/jest-gives-cannot-find-module-when-importing-components-with-absolute-paths
