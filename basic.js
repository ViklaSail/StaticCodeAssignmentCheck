const converters = {
    conv: function (x) {
        if (x == "tammikuu") { x = 0}
        else if (x == "helkmikuu") {x = 1}
        else if (x== "maaliskuu") {x=2}
        else if (x=="huhtikuu") {x=3}
        else if (x == "toukokuu") {x = 4}
        else if (x== "kesäkuu") {x=5}
        else if (x=="heinäkuu") {x=6}
        else if (x == "elokuu") {x = 7}
        else if (x== "syyskuu") {x=8}
        else if (x=="lokakuu") {x=9}
        else if (x == "marraskuu") {x = 10}
        else if (x== "joulukuu") {x=11}
        else  {x=="unknow format"};
        return x;
    }
}
module.exports = converters