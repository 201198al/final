export const validateINN = (inn) => {
  const innStr = String(inn).trim();
  
  if (!innStr) return false;
  if (!/^\d+$/.test(innStr)) return false;
  
  const innLength = innStr.length;
  
  if (innLength === 10) {
    const checkDigit = (parseInt(innStr[0]) * 2 +
                        parseInt(innStr[1]) * 4 +
                        parseInt(innStr[2]) * 10 +
                        parseInt(innStr[3]) * 3 +
                        parseInt(innStr[4]) * 5 +
                        parseInt(innStr[5]) * 9 +
                        parseInt(innStr[6]) * 4 +
                        parseInt(innStr[7]) * 6 +
                        parseInt(innStr[8]) * 8) % 11 % 10;
    
    return checkDigit === parseInt(innStr[9]);
  } 
  
  if (innLength === 12) {
    const checkDigit1 = (parseInt(innStr[0]) * 7 +
                         parseInt(innStr[1]) * 2 +
                         parseInt(innStr[2]) * 4 +
                         parseInt(innStr[3]) * 10 +
                         parseInt(innStr[4]) * 3 +
                         parseInt(innStr[5]) * 5 +
                         parseInt(innStr[6]) * 9 +
                         parseInt(innStr[7]) * 4 +
                         parseInt(innStr[8]) * 6 +
                         parseInt(innStr[9]) * 8) % 11 % 10;
    
    const checkDigit2 = (parseInt(innStr[0]) * 3 +
                         parseInt(innStr[1]) * 7 +
                         parseInt(innStr[2]) * 2 +
                         parseInt(innStr[3]) * 4 +
                         parseInt(innStr[4]) * 10 +
                         parseInt(innStr[5]) * 3 +
                         parseInt(innStr[6]) * 5 +
                         parseInt(innStr[7]) * 9 +
                         parseInt(innStr[8]) * 4 +
                         parseInt(innStr[9]) * 6 +
                         parseInt(innStr[10]) * 8) % 11 % 10;
    
    return checkDigit1 === parseInt(innStr[10]) && checkDigit2 === parseInt(innStr[11]);
  }
  
  return false;
};