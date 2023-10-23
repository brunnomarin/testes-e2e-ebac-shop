/// <reference types="cypress" />

import enderecoPage from "../support/page_objects/endereco.page";
const dadosEnderecos = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
        cy.visit('minha-conta')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
        })


    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.addprodutos('1', 'S', 'Orange', 2)
        cy.addprodutos('2', 'M', 'Blue', 3)
        cy.addprodutos('4', 'L', 'Purple', 1)
        cy.addprodutos('5', 'XS', 'Green', 3)

        //enderecoPage.enderecofaturamento('João', 'Silva', 'Google', 'Brasil', 'Av Nove de Julho', '150', 'Jundiaí', 'São Paulo', '05820-160', '11977773333', 'jsilva@teste.com')

        enderecoPage.enderecofaturamento(
            dadosEnderecos[0].nome,
            dadosEnderecos[0].sobrenome,
            dadosEnderecos[0].empresa,
            dadosEnderecos[0].pais,
            dadosEnderecos[0].endereco,
            dadosEnderecos[0].numero,
            dadosEnderecos[0].cidade,
            dadosEnderecos[0].estado,
            dadosEnderecos[0].cep,
            dadosEnderecos[0].telefone,
            dadosEnderecos[0].email
        )

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

    });


})
