describe('Banking Project in Cypress', () => {
    const BASE_URL = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login';
    const SELECTORS = {
        title: '.mainHeading',
        customerLoginButton: "button[ng-click='customer()']",
        userSelect: 'select',
        loginButton: "button[type='submit']",
        welcomeMessage: '.ng-scope',
        currencyDisplay: "div[ng-hide='noAccount']",
        depositButton: "button[ng-class='btnClass2']",
        amountInput: "input[type='number']",
        successMessage: '.ng-scope',
        transactionsButton: "button[ng-class='btnClass1']",
        backButton: "button[ng-click='back()']",
        withdrawalButton: "button[ng-class='btnClass3']",
        transactionAmount: 'tbody > tr td:nth-child(2)',
        transactionType: 'tbody > tr td:nth-child(3)',
    };

    beforeEach(() => {
        cy.visit(BASE_URL);
    });

    it('should perform banking operations successfully', () => {
        // Confirm the Title of the page is XYZ Bank
        cy.get(SELECTORS.title).should('contain', 'XYZ Bank');

        // Click on Customer Login
        cy.get(SELECTORS.customerLoginButton).click();

        // Choose a name from the drop-down
        cy.get(SELECTORS.userSelect).select('Hermoine Granger').should('have.value', '1');

        // Click on Login
        cy.get(SELECTORS.loginButton).click();

        // Assert the selected name is displayed
        cy.get(SELECTORS.welcomeMessage).should('contain', 'Hermoine Granger');

        // Confirm the Currency is Dollar
        cy.get(SELECTORS.currencyDisplay).should('contain', 'Dollar');

        // Click on Deposit and enter the amount
        performDeposit(75);

        // Click on Transactions and verify the deposit
        verifyTransaction(75, 'Credit');

        // Click on Back button and then Withdraw
        cy.get(SELECTORS.backButton).click();
        performWithdrawal(75);
        
        // Click on Transactions to confirm withdrawal
        cy.get(SELECTORS.transactionsButton).click();
    });

    function performDeposit(amount) {
        cy.get(SELECTORS.depositButton).click();
        cy.get(SELECTORS.amountInput).type(amount);
        cy.get(SELECTORS.loginButton).click();
        cy.get(SELECTORS.successMessage).should('contain', 'Deposit Successful');
    }

    function performWithdrawal(amount) {
        cy.get(SELECTORS.withdrawalButton).click();
        cy.get(SELECTORS.amountInput).type(amount);
        cy.get(SELECTORS.loginButton).click();
        cy.get(SELECTORS.successMessage).should('contain', 'Transaction successful');
    }

    function verifyTransaction(amount, type) {
        cy.get(SELECTORS.transactionsButton).click();
        cy.get(SELECTORS.transactionAmount).each(($e, index) => {
            const text = $e.text();
            if (text.includes(amount)) {
                cy.get(SELECTORS.transactionType).eq(index).then((debit) => {
                    const transactionType = debit.text();
                    expect(transactionType).to.equal(type);
                });
            }
        });
    }
});
