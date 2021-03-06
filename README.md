# Solução-DoAllStuff
 Solução para o teste da RESTOQUE

Aqui você encontra meus códigos da refatoração do script pedida acrescida de um stack de teste em Jasmine.
Para tanto eu preparei tudo pra rodar em um server node.js
<pre>
/* *********************************
 * (6) A função baixo doAllStuff tem muitas responsabilidades.
 * Refatore o código e crie testes unitários e de integração.
 * Crie um projeto no github com a sua solução.
 * *********************************/
const util = require('util');
const fs = require('fs');
/**
 * doAllStuff − Calcula a distância entre dois pontos.
 * @param {number} l1 − latitude ponto 1.
 * @param {number} b1 − longitude ponto 1.
 * @param {number} l2 − latitude ponto 2.
 * @param {number} b2 − longitude ponto 2.
 * @return {Promise<{number}>} Promise para a distância entre os dois pontos.
 */
function doAllStuff(l1, b1, l2, b2) {
 const earthRadiusKm = 6371;
 if (l1 < −90 || l1 > 90 || l2 < −90 || l2 > 90)
 throw new rangeerror('the arguments l1 and l2 must be between −90 and 90.');
 if (b1 < −180 || b1 > 180 || b2 < −180 || b2 > 180)
 throw new rangeerror('the arguments b1 and b2 must be between −180 and 180.');
 //converte coordenadas de graus para radianos
 const l1Radianus = (l1 * Math.PI) / 180;
 const b1Radianus = (b1 * Math.PI) / 180;
 const l2Radianus = (l2 * Math.PI) / 180;
 const b2Radianus = (b2 * Math.PI) / 180;
 //calcula distância entre os dois pontos
 const lambda = Math.acos(
 Math.sin(l1Radianus) * Math.sin(l2Radianus) +
 Math.cos(l1Radianus) *
 Math.cos(l2Radianus) *
 Math.cos(b2Radianus − b1Radianus),
 );
 const distanceBetweenTwoPoints = Math.sin(lambda) * earthRadiusKm;
 //salva informações no banco de dados
 const appendFilePromisified = util.promisify(fs.appendFile);
 return appendFilePromisified(
 'database.txt',
 `p1(${l1}, ${b1}) p2(${l2}, ${b2}) d= ${distanceBetweenTwoPoints}KM\n`,
 ).then(() => {
 return distanceBetweenTwoPoints;
 });
}
// Exemplo de uso. Distância entre as cidades de São Paulo e Rio de Janeiro
doAllStuff(−23.618237, −46.635197, −22.9035, −43.2096).then(value =>
 console.log(value),
);
</pre>

# Para Instalar
 Clone o repositório
 e rode

<code>npm install</code>


# Para Rodar os Testes

<code>npm test</code>
