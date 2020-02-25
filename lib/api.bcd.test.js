const api = require('./api.bcd')
const axios = require('axios')

jest.mock('axios')

test('GetCotacaoApi', () =>{

    const res = {
        data: {
            value: [
                {
                    cotacaoVenda: 3.90
                }
                
            ]
        }

    }

    axios.get.mockResolvedValue(res)
    api.getCoatacaoAPI('04-04-2019').then( resp =>{
        expect(res).toEqual(res)
        expect(axios.get.mock.call[0][0]).toBe('url')
    })

})


test('extractCotacao', () =>{

   const cotacao =  api.extractCotacao({

    data: {
        value:[
            {
                cotacaoVenda: 3.90
            }
        ]
    }

   })
   expect(cotacao).toBe(3.90)
})

describe('getToday', () =>{

    const RealDate = Date

    function mockDate(date){
        global.Date = class extends RealDate{
            constructor(){
                return new RealDate(date)
            }
        }
    }

    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {

        mockDate('2019-04-04T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('4-4-2019')
    })
})

test('getUrl', () =>{
    const url = api.getUrl('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', () =>{

    const res = {
        data: {
            value: [
                {
                    cotacaoVenda: 3.90
                }
                
            ]
        }

    }

    const getToday = jest.fn()
    getToday.mockReturnValue('04-04-2019')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCoatacaoAPI = jest.fn()
    getCoatacaoAPI.mockResolvedValue(res)

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.9)

    api.pure
    .getCotacao({ getToday, getUrl, getCoatacaoAPI, extractCotacao})()
    .then( res =>{
        expect(res).toBe(3.9)
    })   
})

test('getCotacao', () =>{

    const res = {

    }

    const getToday = jest.fn()
    getToday.mockReturnValue('04-04-2019')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCoatacaoAPI = jest.fn()
    getCoatacaoAPI.mockReturnValue(Promise.reject('err'))

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.9)

    api.pure
    .getCotacao({ getToday, getUrl, getCoatacaoAPI, extractCotacao})()
    .then( res =>{
        expect(res).toBe('')
    })   
})