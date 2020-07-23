"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const searchPage_1 = require("../pages/searchPage");
const actions_1 = require("../lib/actions");
const { When, Then } = require("cucumber");
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);
const search = new searchPage_1.SearchPageObject();
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
Then('I need to select state value', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // Write code here that turns the phrase above into concrete actions
        console.log("###################################################################################");
        //await click(by.js("return document.querySelectorAll('span.caret')[3]"),5000);
        yield protractor_1.browser.executeScript("document.querySelectorAll('span.caret')[3].click()");
        yield protractor_1.browser.sleep(5000);
        yield protractor_1.browser.executeScript("document.querySelectorAll('a.btn.btn-sm.btn-dropdown-menu.ng-binding')[3].click()");
        //document.querySelectorAll("a.btn.btn-sm.btn-dropdown-menu.ng-binding")[3]
    });
});
Then('I need to enter values in venu', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // Write code here that turns the phrase above into concrete actions
        yield actions_1.sendKeys(protractor_1.element(protractor_1.by.js("return document.querySelectorAll('input')[3]")), "epping");
        yield protractor_1.browser.sleep(5000);
        yield actions_1.click(protractor_1.element(protractor_1.by.js("return document.querySelectorAll('button.btn.btn-primary')[2]")), 5000);
        yield protractor_1.browser.sleep(5000);
    });
});
