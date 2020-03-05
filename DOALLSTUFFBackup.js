function DoAllStuffBase(l1, b1, l2, b2) {

}
/**
 * Calcula - Calcula a distância entre dois pontos.
 * @param {number} l1 - latitude ponto 1.
 * @param {number} b1 - longitude ponto 1.
 * @param {number} l2 - latitude ponto 2.
 * @param {number} b2 - longitude ponto 2.
 * @return {Promise<{number}>} Promise para a distância entre os dois pontos.
 */
DoAllStuffBase.prototype.calcula = function(l1, b1, l2, b2) {
    //Checa se os parametros estao dentro dos ranges
    checkLatitudes(l1,l2);
    checkLongitudes(b1,b2);
   
    //converte coordenadas de graus para radianos
    const l1Radianus = this.convertRad(l1);
    const b1Radianus = this.convertRad(b1);
    const l2Radianus = this.convertRad(l2);
    const b2Radianus = this.convertRad(b2);
   
    //calcula distância entre os dois pontos
    const distanceBetweenTwoPoints = this.calcularDistancia(l1Radianus,b1Radianus,l2Radianus,b2Radianus);
   
   
    this.appendFilePromisified('database.txt', `p1(${l1}, ${b1}) p2(${l2}, ${b2}) d= ${distanceBetweenTwoPoints}KM\n`,);
   
    return distanceBetweenTwoPoints;
   }



/**
 * checkLatitudes - Calcula se a latitude está dentro dos ranges
 * @param {number} l1 - latitude ponto 1 
 * @param {number} l2 - latitude ponto 2
 */
DoAllStuffBase.prototype.checkLatitudes = (l1,l2)=>{
    if (!l1 || !l2 || l1 < -90 || l1 > 90 || l2 < -90 || l2 > 90)
    throw new RangeError('the arguments l1 and l2 must be between -90 and 90.');
}
/**
 * checkLongitudes - Calcula se a latitude está dentro dos ranges
 * @param {number} b1 - longitude ponto 1 
 * @param {number} b2 - longitude ponto 2
 */
DoAllStuffBase.prototype.checkLongitudes = (b1,b2)=>{
    if (!b1 || !b2 || b1 < -180 || b1 > 180 || b2 < -180 || b2 > 180)
    throw new RangeError('the arguments b1 and b2 must be between -180 and 180.');
}

/**
 * convertRad - Converte a variavel de graus para radianus
 * @param {number} n - variável a ser convertida em radiano 
 * @return {number}  - varável convertida em radiano.
 */
DoAllStuffBase.prototype.convertRad = (n)=> (n * Math.PI) / 180;

/**
 * calcularDistancia - Calcula a distância entre dois pontos.
 * @param {number} l1Radianus - latitude ponto 1 em radianus.
 * @param {number} b1Radianus - longitude ponto 1.
 * @param {number} l2Radianus - latitude ponto 2 em radianus.
 * @param {number} b2Radianus - longitude ponto 2.
 * @return {number} Distância entre os dois pontos em km.
 */
DoAllStuffBase.prototype.calcularDistancia = (l1Radianus,b1Radianus,l2Radianus,b2Radianus) => {
    const earthRadiusKm = 6371;
    let lambda = Math.acos(
        Math.sin(l1Radianus) * Math.sin(l2Radianus) +
        Math.cos(l1Radianus) *
        Math.cos(l2Radianus) *
        Math.cos(b2Radianus - b1Radianus),
    );

    return  Math.sin(lambda) * earthRadiusKm;
}

/**salva informações no banco de dados
 */
DoAllStuffBase.prototype.appendFilePromisified = function(appendFile){
   const util = require('util');
   const fs = require('fs');
   
   return util.promisify(fs.appendFile);
}

// Exemplo de uso. Distância entre as cidades de São Paulo e Rio de Janeiro
/*DoAllStuffBase(-23.618237, -46.635197, -22.9035, -43.2096).then(value =>
 console.log(value),
);*/

module.exports = DoAllStuffBase;

let doAllStuff = (l1,b1,l2,b2) => {let resposta = DoAllStuffBase.calcula(l1,b1,l2,b2); console.log(resposta);return resposta};

module.exports = doAllStuff;