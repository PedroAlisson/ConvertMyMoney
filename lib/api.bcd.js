const axios = require('axios')
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCoatacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const today = new Date()
    return(today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear()

    //console.log(today.getDate(), today.getFullYear(), today.getMonth())
}

const getCotacao = ({ getToday, getUrl, getCoatacaoAPI, extractCotacao }) => async() =>  {

    try{
        const today = getToday()
        const url = getUrl(today)
        const res = await getCoatacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    }catch(err){
        return ''
    }
}

module.exports = {
    getCoatacaoAPI,
    extractCotacao,
    getUrl,
    getCotacao: getCotacao({getToday, getUrl, getCoatacaoAPI, extractCotacao}),
    getToday,
    pure: {
        getCotacao
    }
}

