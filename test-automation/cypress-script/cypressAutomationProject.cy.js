describe('Banking Project in Cypress', () => {

    it('Banking Project in Cypress', () => {
        // 1.  Open https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login website
        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
        
        // 2.  Confirm the Title of the page is XYZ Bank
        cy.get('.mainHeading').should('contain', 'XYZ Bank')
        
        // 3.  Click on Customer Login
        cy.get("button[ng-click='customer()']").click();
        
        // 4.  Choose any Name from the Your Name drop down
        cy.get('select').select('Hermoine Granger').should('have.value', '1')

        // 5.  Click on Login
        cy.get("button[type='submit']").click();

        // 6.  Write an assertion to confirm the Name selected in Step 4 is displayed after Welcome
        cy.get('.ng-scope').should('contain', 'Hermoine Granger')

        // 7.  Confirm the Currency is Dollar (Use Assertion)
        cy.get("div[ng-hide='noAccount']").should('contain', 'Dollar')

        // 8.  Click on Deposit
        cy.get("button[ng-class='btnClass2']").click();

        // 9.  Enter the amount in Amount to be Deposited textbox
        cy.get("input[type='number']").type('75')

        // 10. Click on Deposit
        cy.get("button[type='submit']").click()

        // 11. Confirm "Deposit Successful" is displayed
        cy.get('.ng-scope').should('contain', 'Deposit Successful')

        // 12. Click on Transactions
        cy.get("button[ng-class='btnClass1']").click();
        cy.wait(1000)
        cy.reload()

        // 13. Confirm the amount entered in Step 9 is displayed under Amount column      
        cy.get('tbody > tr td:nth-child(2)').each(($e,index)=>{
            const text = $e.text()
            if(text.includes('75'))
            {
                // 14. Confirm the Transaction Type is credit
                cy.get('tbody > tr td:nth-child(3)').eq(index).then(function(deposit)
                {
                    const depositAmount=deposit.text()
                    expect(depositAmount).to.equal("Credit")
    
                })
            }})

        // 15. Click on Back button
        cy.get("button[ng-click='back()']").click();

        // 16. Click on Withdrawl
        cy.get("button[ng-class='btnClass3']").click();

        // 17. Enter the same amount you deposited
        cy.get("input[type='number']").type('75')

        // 18. Click on Withdraw
        cy.get("button[type='submit']").click()

        // 19. Confirm "Transaction Successful" is displayed
        cy.get('.ng-scope').should('contain', 'Transaction successful')
    
        // 20. Click on Transactions
        cy.get("button[ng-class='btnClass1']").click();
        
    })
})
