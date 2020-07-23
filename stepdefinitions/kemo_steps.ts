import { browser, protractor, element, by } from "protractor";
import { SearchPageObject } from "../pages/searchPage";
import { kenoPageObject } from "../pages/kemo_page";
import { Given } from "cucumber";
import { click, selectOptionByText, sendKeys } from "../lib/actions";

const { When, Then } = require("cucumber");

var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);

const search: SearchPageObject = new SearchPageObject();


// Given('I am on the {string} page', function (string) {
//   browser.get("https://keno.com")

// });

// Given('I click the {string} button', function (string) {

// });






// Then('I want  to verify the tile', function () {
//     // Write code here that turns the phrase above into concrete actions

//     var title  =browser.getTitle();
//     console.log(title);
    


// });

Then('I need to select state value', async function () {
    // Write code here that turns the phrase above into concrete actions

    
    console.log("###################################################################################");
    
    //await click(by.js("return document.querySelectorAll('span.caret')[3]"),5000);
    await  browser.executeScript("document.querySelectorAll('span.caret')[3].click()");
    await browser.sleep(5000);
    await  browser.executeScript("document.querySelectorAll('a.btn.btn-sm.btn-dropdown-menu.ng-binding')[3].click()");

        //document.querySelectorAll("a.btn.btn-sm.btn-dropdown-menu.ng-binding")[3]

});



Then('I need to enter values in venu', async function () {
    // Write code here that turns the phrase above into concrete actions

    await sendKeys(element(by.js("return document.querySelectorAll('input')[3]")),"epping")
    await browser.sleep(5000);
    await click(element(by.js("return document.querySelectorAll('button.btn.btn-primary')[2]")),5000)
    await browser.sleep(5000);
});