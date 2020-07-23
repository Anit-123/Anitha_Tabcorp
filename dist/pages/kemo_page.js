"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kenoPageObject = void 0;
const protractor_1 = require("protractor");
class kenoPageObject {
    constructor() {
        this.searchTextBox = protractor_1.$("input[title='Search']");
        this.searchButton = protractor_1.$("input[value='Google Search']");
        this.logo = protractor_1.$("div.logo img");
    }
}
exports.kenoPageObject = kenoPageObject;
