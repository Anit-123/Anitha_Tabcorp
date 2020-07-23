"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWindowHandlesCount = exports.getElementAttributeValue = exports.getText = void 0;
const protractor_1 = require("protractor");
const utils_1 = require("./utils");
const waits_1 = require("./waits");
const config_1 = require("./config");
/**
 * Wait for an element to be displayed, and resolves to the text in that
 * element. If `getText` fails, `tryCount` retries are performed.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @param {number} tryCount Retry counter for the recursion
 * @returns {promise.Promise<string>}
 */
function getText(target, timeout = config_1.DEFAULT_TIMEOUT, tryCount = config_1.DEFAULT_RETRIES) {
    const e = utils_1.getElementFinder(target);
    return waits_1.waitToBeDisplayed(target, timeout)
        .then(() => {
        return e.getText();
    })
        .then((value) => value, 
    // tslint:disable-next-line:no-any
    (error) => {
        if (tryCount > 0) {
            // tslint:disable-next-line:no-console
            console.error(`Error while getting text on ${e.locator()}`);
            throw error;
        }
        // tslint:disable-next-line:no-console
        console.log(`getText retry ${tryCount}`);
        tryCount = tryCount - 1;
        return getText(target, timeout, tryCount);
    });
}
exports.getText = getText;
/**
 * Waits for the element to be present, and resolves to the attribute's value.
 *
 * @param {string} target Target element
 * @param {string} attr Attribute name to look for
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @returns {promise.Promise<string>}
 */
function getElementAttributeValue(target, attr, timeout = config_1.DEFAULT_TIMEOUT) {
    return waits_1.waitToBeDisplayed(target, timeout).then(() => {
        const e = utils_1.getElementFinder(target);
        return e.getAttribute(attr);
    });
}
exports.getElementAttributeValue = getElementAttributeValue;
/**
 * Resolves to the current window count.
 * Windows includes windows, tabs, etc.
 *
 * @returns {promise.Promise<number>}
 */
function getWindowHandlesCount() {
    return protractor_1.browser.getAllWindowHandles().then((handles) => {
        return handles.length;
    });
}
exports.getWindowHandlesCount = getWindowHandlesCount;
