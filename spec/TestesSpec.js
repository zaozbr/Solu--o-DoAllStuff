const fs = require('fs');
var DoAllStuff =  require('../DOALLSTUFF');

describe("Teste do checkLatitudes", function() {
    var doAllStuff;
    beforeEach(function() {
        doAllStuff = DoAllStuff;
    });

    it('Deve dar erro se l1 menor que -90', function() {
        expect(function(){doAllStuff.checkLatitudes(-91,12)}).toThrow();
    });
    
    it('Deve dar erro se l2 menor que -90', function() {
        expect(function(){doAllStuff.checkLatitudes(1,-112)}).toThrow();
    });

    it('Deve dar erro se l1 maior que 90', function() {
        expect(function(){doAllStuff.checkLatitudes(91,12)}).toThrow();
    });
    
    it('Deve dar erro se l2 maior que 90', function() {
        expect(function(){doAllStuff.checkLatitudes(1,112)}).toThrow();
    });

    it('Deve dar erro se alguma variavel não for declarada', function() {
        expect(function(){doAllStuff.checkLatitudes(1)}).toThrow();
    });

    it('Deve dar erro se alguma variavel não for to tipo número', function() {
        expect(function(){doAllStuff.checkLatitudes('1grau', 98)}).toThrow();
    });

    it('Não deve dar erro se l1 e l2 estiverem dentro do range [-90, 90]', function() {
        expect(function(){doAllStuff.checkLatitudes(1,-72)}).not.toThrow();
    });

});

describe("Teste do checkLongitudes", function() {
    var doAllStuff;
    beforeEach(function() {
        doAllStuff = DoAllStuff;
    });

    it('Deve dar erro se b1 menor que -180', function() {
        expect(function(){doAllStuff.checkLongitudes(-191,12)}).toThrow();
    });
    
    it('Deve dar erro se b2 menor que -180', function() {
        expect(function(){doAllStuff.checkLongitudes(1,-192)}).toThrow();
    });

    it('Deve dar erro se b1 maior que 180', function() {
        expect(function(){doAllStuff.checkLongitudes(191,12)}).toThrow();
    });
    
    it('Deve dar erro se b2 maior que 180', function() {
        expect(function(){doAllStuff.checkLongitudes(1,192)}).toThrow();
    });

    it('Deve dar erro se alguma variável não for declarada', function() {
        expect(function(){doAllStuff.checkLongitudes()}).toThrow();
    });

    it('Deve dar erro se alguma variavel não for to tipo número', function() {
        expect(function(){doAllStuff.checkLongitudes('1grau', 98)}).toThrow();
    });

    it('Não deve dar erro se b1 e b2 estiver dentro do range [-180, 180]', function() {
        expect(function(){doAllStuff.checkLongitudes(134,-172)}).not.toThrow();
    });

});

describe("Teste do conversor em Radianus", function() {
    var doAllStuff;
    beforeEach(function() {
        doAllStuff = DoAllStuff;
    });

    it('Deve devolver sempre números', function() {
        expect(doAllStuff.convertRad(32)).toEqual(jasmine.any(Number));
    });

    it('Deve converter os graus em Radianos', function() {
        expect(doAllStuff.convertRad(32)).toEqual(0.5585053606381855);
    });
});

describe("Calcular Distância", function() {
    var doAllStuff;
    beforeEach(function() {
        doAllStuff = DoAllStuff;
    });

    it('A distancia entre (0.5585053606381855,0.5585053606381855,0.5585053606381855,0.5585053606381855) deve ser zero', function() {
        expect(doAllStuff.calcDistance(0.5585053606381855,0.5585053606381855,0.5585053606381855,0.5585053606381855)).toEqual(0);
    });

    it('A distancia entre Esses pontos em São Paulo e Rio de Janeiro deve ser 358.6574185233776', function() {
        expect(doAllStuff.calcDistance(-0.412215999166348, -0.813937734966182, -0.3997414852305213, -0.7541497884697418)).toEqual(358.6574185233776);
    });
});


describe("Salvar e devolver a Distância", function() {
    var doAllStuff;
    beforeEach(function() {
        doAllStuff = DoAllStuff;
    });

    it('A distancia entre (1,1,1,1) deve ser zero', function() {
        expect(doAllStuff.calcAndSave(1,1,1,1)).toEqual(0);
    });

    it('A distancia entre Esses pontos em São Paulo e Rio de Janeiro deve ser 358.6574185233776', function() {
        expect(doAllStuff.calcAndSave(-23.618237, -46.635197, -22.9035, -43.2096)).toEqual(358.6574185233776);
    });

    it('Verifica se os dados foram salvos no arquivo', function() {
        let sizePrevious = fs.statSync('./database.txt').size;
        ()=> doAllStuff.calcAndSave(-23.618237, -46.635197, -22.9035, -43.2096)
            .then(()=>fs.statSync('./database.txt').size)
            .then(sizeNow => expect(sizeNow).toBeGreaterThan(sizePrevious));
    });
});

describe("Teste do conversor em Radianus", function() {
    var doAllStuff;
    beforeEach(function() {
        doAllStuff = DoAllStuff;
    });

    it('Deve devolver sempre números', function() {
        expect(doAllStuff.convertRad(32)).toEqual(jasmine.any(Number));
    });

    it('Deve converter os graus em Radianos', function() {
        expect(doAllStuff.convertRad(32)).toEqual(0.5585053606381855);
    });
});

describe("Calcular Distância", function() {
    var doAllStuff;
    beforeEach(function() {
        doAllStuff = DoAllStuff;
    });

    it('A distancia entre (0.5585053606381855,0.5585053606381855,0.5585053606381855,0.5585053606381855) deve ser zero', function() {
        expect(doAllStuff.calcDistance(0.5585053606381855,0.5585053606381855,0.5585053606381855,0.5585053606381855)).toEqual(0);
    });

    it('A distancia entre Esses pontos em São Paulo e Rio de Janeiro deve ser 358.6574185233776', function() {
        expect(doAllStuff.calcDistance(-0.412215999166348, -0.813937734966182, -0.3997414852305213, -0.7541497884697418)).toEqual(358.6574185233776);
    });
});


describe("DoAllStuff - Final!!!", function() {
    var doAllStuff;
    beforeEach(function() {
        doAllStuff = DoAllStuff;
    });

    it('A distancia entre (1,1,1,1) deve ser zero', function() {
        expect(doAllStuff.DoAllStuff(1,1,1,1)).toEqual(0);
    });

    it('A distancia entre Esses pontos em São Paulo e Rio de Janeiro deve ser 358.6574185233776', function() {
        expect(doAllStuff.DoAllStuff(-23.618237, -46.635197, -22.9035, -43.2096)).toEqual(358.6574185233776);
    });

    it('Verifica se os dados foram salvos no arquivo', function() {
        let sizePrevious = fs.statSync('./database.txt').size;
        ()=> doAllStuff.DoAllStuff(-23.618237, -46.635197, -22.9035, -43.2096)
            .then(()=>fs.statSync('./database.txt').size)
            .then(sizeNow => expect(sizeNow).toBeGreaterThan(sizePrevious));
    });
});