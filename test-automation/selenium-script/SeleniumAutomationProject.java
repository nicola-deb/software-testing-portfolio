package com.test;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;

public class AutomationProjectSelenium {

	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub
		System.setProperty("webdriver.chrome.driver", "C://drivers//chromedriver.exe");
		ChromeOptions options=new ChromeOptions().addArguments("--disable-search-engine-choice-screen", "--start-maximized");
		WebDriver driver = new ChromeDriver(options);  
		
		// 1.  Open https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login website
		driver.get("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");

		// 2.  Confirm the Title of the page is XYZ Bank
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(3));
		WebElement title=driver.findElement(By.className("mainHeading"));
		String actualTitle=title.getText();
		Assert.assertEquals(actualTitle, "XYZ Bank", "Title is mismatched"); 
		
		// 3.  Click on Customer Login
		WebElement login = driver.findElement(By.xpath("//button[@ng-click='customer()']"));
		login.click();
		
		// 4.  Choose any Name from the Your Name drop down
		WebElement dropdown=driver.findElement(By.id("userSelect"));
		Select optionValues = new Select(dropdown);
		optionValues.selectByVisibleText("Hermoine Granger");
		
		// 5.  Click on Login
		WebElement userLogin = driver.findElement(By.xpath("//button[@type='submit']"));
		userLogin.click();
		
		// 6.  Write an assertion to confirm the Name selected in Step 4 is displayed after Welcome
		WebElement name=driver.findElement(By.cssSelector(".fontBig.ng-binding"));
		String actualName=name.getText();
		Assert.assertEquals(actualName, "Hermoine Granger", "Name is mismatched"); 
		
		// 7.  Confirm the Currency is Dollar (Use Assertion)
		WebElement currency=driver.findElement(By.xpath("//div[@ng-hide='noAccount']"));
		String actualCurrency=currency.getText();
		Assert.assertTrue(actualCurrency.contains("Dollar"));
		
		//Resetting Transactions list page
		WebElement transactionsButton = driver.findElement(By.xpath("//button[@ng-click=\"transactions()\"]"));
		transactionsButton.click();
		WebElement resetButton = driver.findElement(By.xpath("//button[@ng-click=\"reset()\"]"));
		resetButton.click();
		WebElement backButton = driver.findElement(By.xpath("//button[@ng-click=\"back()\"]"));
		backButton.click();
		
		// 8.  Click on Deposit
		WebElement depositButton = driver.findElement(By.xpath("//button[@ng-class='btnClass2']"));
		depositButton.click();
		
		// 9.  Enter the amount in Amount to be Deposited textbox
		WebElement depositAmount =driver.findElement(By.xpath("//input[@type='number']"));
		depositAmount.sendKeys("100");
		
		// 10.  Click on Deposit
		driver.findElement(By.xpath("//button[@type='submit']")).click();	
		
		// 11. Confirm "Deposit Successful" is displayed
		WebElement message=driver.findElement(By.cssSelector(".error.ng-binding"));
		String successfulMsg=message.getText();
		Assert.assertTrue(successfulMsg.contains("Deposit Successful"));
		
		 // 12. Click on Transactions
		WebElement transactionsBtn = driver.findElement(By.xpath("//button[@ng-click=\"transactions()\"]"));
		Thread.sleep(2000);     //Added wait due to intermittent issue with loading of Transactions page
		transactionsBtn.click();

		// 13. Confirm the amount entered in Step 9 is displayed under Amount column & // 14. Confirm the Transaction Type is credit
		WebElement tableBody = driver.findElement(By.xpath("//table[@class='table table-bordered table-striped']//tbody"));
		Assert.assertTrue(tableBody.findElement(By.tagName("tr")).getText().contains("100"));
		Assert.assertTrue(tableBody.findElement(By.tagName("tr")).getText().contains("Credit"));

		// 15. Click on Back button
		driver.findElement(By.xpath("//button[@ng-click='back()']")).click();
		
		// 16. Click on Withdrawal
		driver.findElement(By.xpath("//button[@ng-click='withdrawl()']")).click();
		
		// 17. Enter the same amount you deposited
		WebElement withdrawalAmount = driver.findElement(By.xpath("//input[@type='number']"));
		withdrawalAmount.sendKeys("100");	
		
		// 18. Click on Withdraw
		driver.findElement(By.xpath("//button[@type='submit']")).click();
		
		// 19. Confirm "Transaction Successful" is displayed
		WebElement message2=driver.findElement(By.cssSelector(".error.ng-binding"));
		String transactionMsg=message2.getText();
		Assert.assertTrue(transactionMsg.contains("Transaction successful"));
		
		// 20. Click on Transactions
		WebElement transactionButton = driver.findElement(By.xpath("//button[@ng-click=\"transactions()\"]"));
		Thread.sleep(2000); //Added wait due to intermittent issue with loading of Transactions page
		transactionButton.click();
		
		// 21. Confirm there is one more row with Transaction Type is Debit		
		List<WebElement> numberofrows =driver.findElements(By.xpath("//tbody//tr"));
		int noofrows=numberofrows.size();		
		Assert.assertEquals(noofrows, 2);
		String tableData=driver.findElement(By.xpath("//tbody//tr[contains(@id,'anchor1')]/td[3]")).getText();
		Assert.assertEquals(tableData, "Debit");
		
		//Close Browser Tab
		driver.quit();
		}
	}
