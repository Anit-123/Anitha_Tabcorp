"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForWindowCount = exports.waitForElementCountToBeLessThan = exports.waitForElementCountToBeGreaterThan = exports.waitForElementCountToBe = exports.waitForUrlMatch = exports.waitForAttributeMatch = exports.waitForAttributeToBe = exports.waitForTextMatch = exports.waitForTextToBe = exports.waitToBeDisplayed = exports.waitToBePresent = exports.waitToBeNotDisplayed = exports.waitToBeNotPresent = void 0;
const protractor_1 = require("protractor");
const utils_1 = require("./utils");
const config_1 = require("./config");
/**
 * Wait for an element not to be present. Not present means that this element
 * does not exist in the DOM.
 *
 * @param {ElementFinder | Locator | string} target
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitToBeNotPresent(target, timeout = config_1.DEFAULT_TIMEOUT) {
    const e = utils_1.getElementFinder(target);
    // Don't use EC.not(EC.presenceOf(e)) because it doesn't return a promise which we can catch
    return protractor_1.browser.wait(() => {
        return utils_1.getElementFinder(target)
            .isPresent()
            .then((value) => !value, () => false);
    }, timeout, `Element ${e.locator()} is still present`);
}
exports.waitToBeNotPresent = waitToBeNotPresent;
/**
 * Wait for an element to be not displayed. An element which is not displayed
 * could still be part of the DOM, but is hidden by a css rule.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitToBeNotDisplayed(target, timeout = config_1.DEFAULT_TIMEOUT) {
    const e = utils_1.getElementFinder(target);
    // Don't use EC.invisibilityOf(e) because it doesn't return a promise which we can catch
    return protractor_1.browser.wait(() => {
        return utils_1.getElementFinder(target)
            .isPresent()
            .then(result => {
            if (!result) {
                return false;
            }
            return e.isDisplayed();
        })
            .then((value) => !value, () => false);
    }, timeout, `Element ${e.locator()} is still displayed`);
}
exports.waitToBeNotDisplayed = waitToBeNotDisplayed;
/**
 * Wait for an element to be present. Present means the element is part of the
 * DOM, but still might be hidden by CSS rules.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitToBePresent(target, timeout = config_1.DEFAULT_TIMEOUT) {
    let e = utils_1.getElementFinder(target);
    // don't use EC.presenceOf(e) because it doesn't return a promise which we can catch
    return protractor_1.browser.wait(() => {
        e = utils_1.getElementFinder(target);
        utils_1.log(`Element ${e.locator()} waitToBePresent`);
        return e.isPresent().then((value) => value, () => false);
    }, timeout, `Element ${e.locator()} is not present`);
}
exports.waitToBePresent = waitToBePresent;
/**
 * Wait for an element to be displayed. Displayed means that it is part of the
 * DOM **and** visible.
 *
 * @param {ElementFinder | Locator | string} target
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitToBeDisplayed(target, timeout = config_1.DEFAULT_TIMEOUT) {
    let e = utils_1.getElementFinder(target);
    // Don't use EC.visibilityOf(e), here because it doesn't return a promise which we can catch
    return protractor_1.browser.wait(() => {
        e = utils_1.getElementFinder(target);
        utils_1.log(`Element ${e.locator()} waitToBeDisplayed`);
        return e
            .isPresent()
            .then((value) => {
            if (!value) {
                return false;
            }
            return e.isDisplayed();
        }, () => false)
            .then((value) => value, () => false);
    }, timeout, `Element ${e.locator()} is not present nor displayed`);
}
exports.waitToBeDisplayed = waitToBeDisplayed;
/**
 * Wait for an element's text content to equal the given value.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} value The string we are waiting for
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitForTextToBe(target, value, timeout = config_1.DEFAULT_TIMEOUT) {
    const e = utils_1.getElementFinder(target);
    // Don't use EC.textToBePresentInElement because it doesn't return a promise which we can catch
    return protractor_1.browser.wait(() => {
        return waitToBeDisplayed(e, timeout)
            .then(() => {
            return utils_1.getElementFinder(target).getText();
        })
            .then((text) => text === value, () => false);
    }, timeout, `Error waiting for text in ${e.locator()} to be ${value}`);
}
exports.waitForTextToBe = waitForTextToBe;
/**
 * Wait for an element's text content to match a regular expression.
 *
 * @param {ElementFinder | Locator | string} target
 * @param {RegExp} value The RegExp which the content of the target should match
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitForTextMatch(target, value, timeout = config_1.DEFAULT_TIMEOUT) {
    return protractor_1.browser.wait(() => {
        return waitToBeDisplayed(target, timeout)
            .then(() => utils_1.getElementFinder(target).getText())
            .then((text) => !!text.match(value), () => false);
    }, timeout, `Error waiting for text to match ${value}`);
}
exports.waitForTextMatch = waitForTextMatch;
/**
 * Wait for an element's attribute to have the given value.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} attr Attribute name
 * @param {string} value Value which the attribute should have
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitForAttributeToBe(target, attr, value, timeout = config_1.DEFAULT_TIMEOUT) {
    return protractor_1.browser.wait(() => {
        return waitToBeDisplayed(target, timeout)
            .then(() => utils_1.getElementFinder(target).getAttribute(attr))
            .then((text) => text === value, () => false);
    }, timeout, `Error waiting for attribute ${attr} value to be ${value}`);
}
exports.waitForAttributeToBe = waitForAttributeToBe;
/**
 * Wait for an element's attribute value to match a regular expression.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} attr Attribute name
 * @param {RegExp} value RegExp which the attribute's value should match
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitForAttributeMatch(target, attr, value, timeout = config_1.DEFAULT_TIMEOUT) {
    return protractor_1.browser.wait(() => {
        return waitToBeDisplayed(target, timeout)
            .then(() => utils_1.getElementFinder(target).getAttribute(attr))
            .then((text) => !!text.match(value), () => false);
    }, timeout, `Error waiting for attribute ${attr} value to match ${value}`);
}
exports.waitForAttributeMatch = waitForAttributeMatch;
/**
 * Wait for the browser's URL to match a regular expression.
 *
 * @param {RegExp} value RegExp which the URL should match
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitForUrlMatch(value, timeout = config_1.DEFAULT_TIMEOUT) {
    return protractor_1.browser.wait(() => {
        return protractor_1.browser
            .getCurrentUrl()
            .then((url) => !!url.match(value), () => false);
    }, timeout, `URL has not changed to match ${value}`);
}
exports.waitForUrlMatch = waitForUrlMatch;
/**
 * Waits that a selector resolves to the expected number of elements. Useful
 * e.g. to verify that the expected number of items have been added to a list.
 *
 * @param {ElementFinder | Locator | string} target Target selector or ElementArryFinder
 * @param {number} expected Number of the expected elements
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitForElementCountToBe(target, expected, timeout = config_1.DEFAULT_TIMEOUT) {
    const es = utils_1.getElementArrayFinder(target);
    return protractor_1.browser.wait(() => {
        return es
            .count()
            .then((count) => count === expected, () => false);
    }, timeout, `Count of element list ${es.locator()} does not equal expected value ${expected}.`);
}
exports.waitForElementCountToBe = waitForElementCountToBe;
/**
 * Waits that a selector resolves to more than the expected count of elements.
 * Useful e.g. to verify that at least some number of items have been added to
 * a list.
 *
 * @param {ElementFinder | Locator | string} target Target selector or ElementArrayFinder
 * @param {number} expected Expected number of elements
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitForElementCountToBeGreaterThan(target, expected, timeout = config_1.DEFAULT_TIMEOUT) {
    const es = utils_1.getElementArrayFinder(target);
    return protractor_1.browser.wait(() => {
        return es
            .count()
            .then((count) => count > expected, () => false);
    }, timeout, `Count of element list ${es.locator()} is not greather than expected value ${expected}.`);
}
exports.waitForElementCountToBeGreaterThan = waitForElementCountToBeGreaterThan;
/**
 * Waits that a selector resolves to less than the expected count of elements.
 * Useful e.g. to verify that at least some elements have been removed from
 * a list.
 *
 * @param {ElementFinder | Locator | string} target Target selector or ElementArrayFinder
 * @param {number} expected Should be less than the expected number of elements
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitForElementCountToBeLessThan(target, expected, timeout = config_1.DEFAULT_TIMEOUT) {
    const es = utils_1.getElementArrayFinder(target);
    return protractor_1.browser.wait(() => {
        return es
            .count()
            .then((count) => count < expected, () => false);
    }, timeout, `Count of element list ${es.locator()} is not less than expected value ${expected}.`);
}
exports.waitForElementCountToBeLessThan = waitForElementCountToBeLessThan;
/**
 * Waits for a window count. Useful e.g. for confirming that a popup window was opened.
 *
 * @param {number} count Expected number of windows
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
function waitForWindowCount(count, timeout = config_1.DEFAULT_TIMEOUT) {
    return protractor_1.browser.wait(() => {
        return protractor_1.browser
            .getAllWindowHandles()
            .then((handels) => {
            return handels.length;
        })
            .then((windows) => windows === count, () => false);
    }, timeout);
}
exports.waitForWindowCount = waitForWindowCount;
