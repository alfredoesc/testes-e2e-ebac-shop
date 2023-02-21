/// <reference types="cypress"/>
import EnderecoPage from '../support/page_objects/endereco.page'
const dadosEndereco = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.addProdutos('Abominable Hoodie', 'M', 'Green', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]').contains('Agasalho gyn').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]').contains('[61171721] Produto Lgc2').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]').contains('[14731667] Produto Lgc2').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        EnderecoPage.editarEnderecoFaturamento(
            dadosEndereco[1].nome,
            dadosEndereco[1].sobrenome,
            dadosEndereco[1].empresa,
            dadosEndereco[1].pais,
            dadosEndereco[1].endereco,
            dadosEndereco[1].numero,
            dadosEndereco[1].cidade,
            dadosEndereco[1].estado,
            dadosEndereco[1].cep,
            dadosEndereco[1].telefone,
            dadosEndereco[1].email
            )
        
        cy.get('#terms').click()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido')
    });


})