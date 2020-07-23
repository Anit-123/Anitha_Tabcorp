"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectOptionByIndex = exports.selectOptionByText = exports.selectOption = exports.sendKeys = exports.hover = exports.click = void 0;
const protractor_1 = require("protractor");
const utils_1 = require("./utils");
const waits_1 = require("./waits");
const config_1 = require("./config");
/**
 * Waits for an element to be displayed and clickable, and click on it.
 * If the click fails, `tryCount` retries are performed.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @param {number} tryCount Retry counter for the recursion
 */
function click(target, timeout = config_1.DEFAULT_TIMEOUT, tryCount = config_1.DEFAULT_RETRIES) {
    const e = utils_1.getElementFinder(target);
    return waits_1.waitToBeDisplayed(target, timeout)
        .then(() => {
        return protractor_1.browser.wait(protractor_1.protractor.ExpectedConditions.elementToBeClickable(e), timeout, `Element ${e.locator()} not clickable`);
    })
        .then(() => e.click())
        .then(() => { }, 
    // tslint:disable-next-line:no-any
    (error) => {
        if (tryCount > 0) {
            // tslint:disable-next-line:no-console
            console.log(`Click error: ${error}`);
            // tslint:disable-next-line:no-console
            console.log(`Click retry ${tryCount} on target ${e.locator()}`);
            tryCount = tryCount - 1;
            click(target, timeout, tryCount);
        }
        else {
            // tslint:disable-next-line:no-console
            console.error(`Error while clicking on ${e.locator()}`);
            throw error;
        }
    });
}
exports.click = click;
/**
 * Waits for an element to be displayed and positions the pointer inside that
 * element.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
function hover(target, timeout = config_1.DEFAULT_TIMEOUT) {
    const e = utils_1.getElementFinder(target);
    return waits_1.waitToBeDisplayed(target, timeout)
        .then(() => {
        return protractor_1.browser
            .actions()
            .mouseMove(e)
            .perform();
    })
        .catch(() => {
        // Fallback for
        // https://github.com/angular/protractor/issues/4687
        utils_1.log('Fallback for hover element');
        return protractor_1.browser.executeScript((element) => {
            const event = new MouseEvent('mouseenter', {
                view: window,
                bubbles: true,
                cancelable: true,
            });
            element.dispatchEvent(event);
        }, e);
    })
        .then(() => {
        return utils_1.sleep(500);
    });
}
exports.hover = hover;
/**
 * Wait for an `<input>` element to be displayed, then clear its content, and
 * perform key strokes for the passed value. If sendKeys fails, `tryCount`
 * retries are performed.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} value Input value which should be sent as key inputs
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @param {number} tryCount Retry counter for the recursion
 */
function sendKeys(target, value, timeout = config_1.DEFAULT_TIMEOUT, tryCount = config_1.DEFAULT_RETRIES) {
    const e = utils_1.getElementFinder(target);
    return waits_1.waitToBeDisplayed(target, timeout)
        .then(() => {
        return e.clear();
    })
        .then(() => {
        e.sendKeys(value);
    }, 
    // tslint:disable-next-line:no-any
    (error) => {
        if (tryCount > 0) {
            console.log(error);
            // tslint:disable-next-line:no-console
            console.log(`Send keys retry ${tryCount} on target ${e.locator()}`);
            tryCount = tryCount - 1;
            sendKeys(target, value, timeout, tryCount);
        }
        else {
            // tslint:disable-next-line:no-console
            console.error(`Error while sending keys on ${e.locator()}`);
            throw error;
        }
    });
}
exports.sendKeys = sendKeys;
/**
 * Select an `<option>`. If the selection fails, 3 retries are performed.
 *
 * @param {ElementFinder | Locator | string} option Target <option> element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
function selectOption(option, timeout = config_1.DEFAULT_TIMEOUT) {
    // Retry happens in click
    return click(option);
}
exports.selectOption = selectOption;
/**
 * Select an `<option>` ancestor of a particular `<select>` element by its
 * content. The option is identified by Protractor's `cssContainingText`
 * (partial match: `selectOptionByText('bar')` matches `<option>foobar</option>`
 * too). If the selection fails, 3 retries are performed.
 *
 * @param {ElementFinder | Locator | string} select Parent <select> element
 * @param {string} text Text of the option which should be selected
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
function selectOptionByText(select, text, timeout = config_1.DEFAULT_TIMEOUT) {
    const e = utils_1.getElementFinder(select);
    const option = e.element(protractor_1.by.cssContainingText('option', text));
    return selectOption(option, timeout);
}
exports.selectOptionByText = selectOptionByText;
/**
 * Select an `<option>` ancestor of a particular `<select>` element by its
 * index. All options are collected by `tagName === 'option'`, skipping
 * `<optgroup>` or similar elements. After that the index is selected.
 * If the selection fails, 3 retries are performed.
 *
 * @param {ElementFinder | Locator | string} select Parent <select> element
 * @param {number} index Index of the option which should be selected
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
function selectOptionByIndex(select, index, timeout = config_1.DEFAULT_TIMEOUT) {
    const e = utils_1.getElementFinder(select)
        .all(protractor_1.by.tagName('option'))
        .get(index);
    return selectOption(e, timeout);
}
exports.selectOptionByIndex = selectOptionByIndex;
