const characters = ["a" ,"b" ,"c" ,"d" ,"e" ,"f" ,"g" ,"h" ,"i" ,"j" ,"k" ,"l" ,"m" ,"n" ,"o" ,"p" ,"q" ,"r" ,"s" ,"t" ,"u" ,"v" ,"w" ,"x" ,"y" ,"z" ,"!" ,"@" ,"#" ,"$" ,"%" ,"^" ,"&" ,"?" ,"å" ,"∂" ,"ƒ" ,"©" ,"œ" ,"π" ,"ø" ,"®" ,"†" ,"≥" ,"÷" ,"Ω" ,"≤" ,"µ" ,"≈" ,"ç" ,"∫" ,"ñ" ,"ã" ,"õ" ,"ü" ,"ö" ,"ë" ,"ä" ,"ï" ,"é" ,"á" ,"ú" ,"ó" ,"í" ,"A" ,"B" ,"C" ,"D" ,"E" ,"F" ,"G" ,"H" ,"I" ,"J" ,"K" ,"L" ,"M" ,"N" ,"O" ,"P" ,"Q" ,"R" ,"S" ,"U" ,"V" ,"W" ,"X" ,"Y" ,"Z" ,"1" ,"2" ,"3" ,"4" ,"5" ,"6" ,"7" ,"8" ,"9" ,"0", "Ñ", "Ã", "Õ", "Ü", "Ö", "Ë", "Ä", "Ï", "Á", "É", "Í", "Ó", "Ú", "Ç", "Å", "Œ"];

const specialCharacters = ["ã", "T", "ß"];

let i = 0;
let j = 0;
let result = "";

while (i < 2500) {
  if (i === 30 | i === 1000 | i === 2000) {
    result += "  ";
    // result += specialCharacters[j] + " ";
    j++
  } else {
    result += characters[Math.floor(Math.random() * characters.length)] + " ";
  }
  i++
};
console.log(result);
