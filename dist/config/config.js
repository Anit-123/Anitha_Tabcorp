"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const protractor_1 = require("protractor");
const reporter_1 = require("../support/reporter");
var chromiumbinary = require('chromium-binary');
const jsonReports = process.cwd() + "/reports/json";
exports.config = {
    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    SELENIUM_PROMISE_MANAGER: false,
    baseUrl: "https://keno.com",
    // capabilities: {
    //     browserName: "chrome",
    // },
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            binary: chromiumbinary.path,
            'args': ['disable-infobars']
        },
        //browserName : 'firefox', 
        //marionette : true,
        acceptSslCerts: true
    },
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    specs: [
        "../../features/*.feature",
    ],
    onPrepare: () => {
        protractor_1.browser.ignoreSynchronization = true;
        protractor_1.browser.manage().window().maximize();
        reporter_1.Reporter.createDirectory(jsonReports);
    },
    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: ["../../typeScript/stepdefinitions/*.js", "../../typeScript/support/*.js", "../../node_modules/tabcorp-cucumber-protractor-framework-v2/dist/src/e2e/step-definitions/**/*.js"],
        strict: true,
        tags: "@desktop",
    },
    onComplete: () => {
        reporter_1.Reporter.createHTMLReport();
    },
};
///Users/jarvis/Documents/GitHub/protractor-cucumber-typescript/node_modules/tabcorp-cucumber-protractor-framework-v2/e2e/step-definitions
//node_modules/tabcorp-cucumber-protractor-framework-v2/e2e/step-definitions
