$(function(){
    $('#enviar').click(function(){
        const dolar = ($('#Dolar').val())
        const qtde = ($('#QtdeDolar').val())
       if(dolar && qtde == ''){
           const mensagem = "Favor preencha os campos"
           return mensagem
       }
    })
       
})