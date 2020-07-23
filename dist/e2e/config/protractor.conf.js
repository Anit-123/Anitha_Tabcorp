"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const e2econfig = require("./e2e.conf.json");
const protractor_1 = require("protractor");
const reporter_1 = require("../../support/reporter");
var chromiumbinary = require('chromium-binary');
const jsonReports = path.join(process.cwd(), 'e2e/reports/json');
const htmlReports = path.join(process.cwd(), 'e2e/reports/html');
const screenshots = path.join(process.cwd(), 'e2e/reports/screenshots');
const cucumberReporterOptions = {
    //ignore: [],
    jsonDir: jsonReports,
    reportPath: htmlReports,
};
exports.config = {
    directConnect: false,
    framework: 'custom',
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    // capabilities: {
    //   browserName: 'chrome',
    //   chromeOptions: {
    //     args: [
    //       '--show-fps-counter',
    //       '--no-default-browser-check',
    //       '--no-first-run',
    //       '--disable-default-apps',
    //       '--disable-popup-blocking',
    //       '--disable-translate',
    //       '--disable-background-timer-throttling',
    //       '--disable-renderer-backgrounding',
    //       '--disable-device-discovery-notifications',
    //       '--disable-web-security',
    //       // '--headless',
    //       '--no-gpu'
    //     ],
    //     binary: puppeteer.executablePath()
    //   },
    //   // shardTestFiles: true,
    //   // maxInstances: 3
    // },
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            binary: chromiumbinary.path,
            'args': ['disable-infobars'],
            w3c: false
        },
        //browserName : 'firefox', 
        //marionette : true,
        acceptSslCerts: true
    },
    specs: [e2econfig.features],
    baseUrl: "https://www.keno.com.au",
    seleniumAddress: 'http://localhost:5555/wd/hub',
    allScriptsTimeout: e2econfig.testsConfigurationVariables.allScriptsTimeout,
    useAllAngular2AppRoots: e2econfig.testsConfigurationVariables.required.isAngular2App,
    cucumberOpts: {
        require: e2econfig.cucumberRequire,
        // format: e2econfig.report,
        format: "json:./reports/json/cucumber_report.json",
        tags: "@keno"
    },
    // suites: {
    //     smoke: 'dist/**/*.js',
    //     full: 'dist/**/*.js'
    // },
    // generate test report folder
    onPrepare: function () {
        //browser.ignoreSynchronization = true;
        reporter_1.Reporter.createDirectory(jsonReports);
        if (!fs.existsSync(jsonReports)) {
            mkdirp.sync(jsonReports);
        }
        if (!fs.existsSync(htmlReports)) {
            mkdirp.sync(htmlReports);
        }
        if (!fs.existsSync(screenshots)) {
            mkdirp.sync(screenshots);
        }
        // pass custom & required config parameters
        protractor_1.browser.params.requiredConfig = (e2econfig.testsConfigurationVariables || { required: null }).required;
        protractor_1.browser.params.customConfig = (e2econfig.testsConfigurationVariables || { custom: null }).custom;
    },
    // invoke multiple-cucumber-html-reporter
    onComplete: function () {
        try {
            // reporter.generate(cucumberReporterOptions);
            reporter_1.Reporter.createHTMLReport();
        }
        catch (err) {
            if (err) {
                throw new Error('Failed to save cucumber test results to json file.');
            }
        }
    }
    // could set no globals to true to avoid jQuery '$' and protractor '$' collisions on the global namespace.
    //noGlobals: true
};
