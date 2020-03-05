var DoAllStuffBase = {
    /**
     * Calc - Calcula a distância entre dois pontos e salva.
     * @param {number} l1 - latitude ponto 1.
     * @param {number} b1 - longitude ponto 1.
     * @param {number} l2 - latitude ponto 2.
     * @param {number} b2 - longitude ponto 2.
     * @return {Promise<{number}>} Promise para a distância entre os dois pontos.
     */
    calcAndSave : (l1, b1, l2, b2) => {
        //Checa se os parametros estao dentro dos ranges
        DoAllStuffBase.checkLatitudes(l1, l2);
        DoAllStuffBase.checkLongitudes(b1, b2);

        //converte coordenadas de graus para radianos
        const l1Radianus = DoAllStuffBase.convertRad(l1);
        const b1Radianus = DoAllStuffBase.convertRad(b1);
        const l2Radianus = DoAllStuffBase.convertRad(l2);
        const b2Radianus = DoAllStuffBase.convertRad(b2);

        //calcula distância entre os dois pontos
        const distanceBetweenTwoPoints = DoAllStuffBase.calcDistance(l1Radianus, b1Radianus, l2Radianus, b2Radianus);

        //Adiciona as informações ao database.txt
        var checkAppend = DoAllStuffBase.appendFilePromisified('database.txt', `p1(${l1}, ${b1}) p2(${l2}, ${b2}) d= ${distanceBetweenTwoPoints}KM\n`);

        //retorna o valor da distancia
        return distanceBetweenTwoPoints;
    },

    /**
     * checkLatitudes - Checa se a latitude está dentro dos ranges
     * @param {number} l1 - latitude ponto 1 
     * @param {number} l2 - latitude ponto 2
     */
    checkLatitudes : (l1, l2) => {
        if (!l1 || !l2 || typeof l1 !== "number" || typeof l2 !== "number" || l1 < -90 || l1 > 90 || l2 < -90 || l2 > 90)
            throw new RangeError('the arguments l1 and l2 must be between -90 and 90.');
    },


    /**
     * checkLongitudes - Checa se a latitude está dentro dos ranges
     * @param {number} b1 - longitude ponto 1 
     * @param {number} b2 - longitude ponto 2
     */
    checkLongitudes : (b1, b2) => {
        if (!b1 || !b2 || typeof b1 !== "number" || typeof b2 !== "number" ||  b1 < -180 || b1 > 180 || b2 < -180 || b2 > 180)
            throw new RangeError('the arguments b1 and b2 must be between -180 and 180.');
    },

    /**
     * convertRad - Converte a variavel de graus para radianus
     * @param {number} n - variável a ser convertida em radiano 
     * @return {number}  - varável convertida em radiano.
     */
    convertRad : (n) => (n * Math.PI) / 180,

    /**
     * calcularDistancia - Calcula a distância entre dois pontos.
     * @param {number} l1Radianus - latitude ponto 1 em radianus.
     * @param {number} b1Radianus - longitude ponto 1.
     * @param {number} l2Radianus - latitude ponto 2 em radianus.
     * @param {number} b2Radianus - longitude ponto 2.
     * @return {number} Distância entre os dois pontos em km.
     */
    calcDistance : (l1Radianus, b1Radianus, l2Radianus, b2Radianus) => {
        const earthRadiusKm = 6371;
        let lambda = Math.acos(
            Math.sin(l1Radianus) * Math.sin(l2Radianus) +
            Math.cos(l1Radianus) *
            Math.cos(l2Radianus) *
            Math.cos(b2Radianus - b1Radianus),
        );

        return Math.sin(lambda) * earthRadiusKm;
    },

    /**salva informações no banco de dados
     */
    appendFilePromisified : async (file, args) => {
        const util = await require('util');
        const fs = await require('fs');
        const appendFileAsync = util.promisify(fs.appendFile); // (A)

        appendFileAsync(file, args,)
        .catch((err) => {
            console.log('ERROR:', err);
        });
    },
}

let DoAllStuff = (l1,b1,l2,b2) => DoAllStuffBase.calcAndSave(l1, b1, l2, b2);

DoAllStuffBase.DoAllStuff = DoAllStuff;

module.exports = DoAllStuffBase;