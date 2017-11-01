/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require('yargs');
const pkg = require('../package.json');
const Driver = require('../lighthouse-core/gather/driver.js');
const printer_1 = require("./printer");
function getFlags(manualArgv) {
    const y = manualArgv ? yargs(manualArgv) : yargs;
    return y.help('help')
        .version(() => pkg.version)
        .showHelpOnFail(false, 'Specify --help for available options')
        .usage('lighthouse <url>')
        .example('lighthouse <url> --view', 'Opens the HTML report in a browser after the run completes')
        .example('lighthouse <url> --config-path=./myconfig.js', 'Runs Lighthouse with your own configuration: custom audits, report generation, etc.')
        .example('lighthouse <url> --output=json --output-path=./report.json --save-assets', 'Save trace, screenshots, and named JSON report.')
        .example('lighthouse <url> --disable-device-emulation --disable-network-throttling', 'Disable device emulation')
        .example('lighthouse <url> --chrome-flags="--window-size=412,732"', 'Launch Chrome with a specific window size')
        .example('lighthouse <url> --quiet --chrome-flags="--headless"', 'Launch Headless Chrome, turn off logging')
        .group(['verbose', 'quiet'], 'Logging:')
        .describe({
        verbose: 'Displays verbose logging',
        quiet: 'Displays no progress, debug logs or errors'
    })
        .group([
        'save-assets', 'save-artifacts', 'list-all-audits', 'list-trace-categories',
        'additional-trace-categories', 'config-path', 'chrome-flags', 'perf', 'port',
        'hostname', 'max-wait-for-load', 'enable-error-reporting'
    ], 'Configuration:')
        .describe({
        'enable-error-reporting': 'Enables error reporting (prompts once by default, setting this flag will force error reporting to that state).',
        'blocked-url-patterns': 'Block any network requests to the specified URL patterns',
        'disable-storage-reset': 'Disable clearing the browser cache and other storage APIs before a run',
        'disable-device-emulation': 'Disable Nexus 5X emulation',
        'disable-cpu-throttling': 'Disable CPU throttling',
        'disable-network-throttling': 'Disable network throttling',
        'save-assets': 'Save the trace contents & screenshots to disk',
        'save-artifacts': 'Save all gathered artifacts to disk',
        'list-all-audits': 'Prints a list of all available audits and exits',
        'list-trace-categories': 'Prints a list of all required trace categories and exits',
        'additional-trace-categories': 'Additional categories to capture with the trace (comma-delimited).',
        'config-path': 'The path to the config JSON.',
        'chrome-flags': `Custom flags to pass to Chrome (space-delimited). For a full list of flags, see http://peter.sh/experiments/chromium-command-line-switches/.

            Environment variables:
            CHROME_PATH: Explicit path of intended Chrome binary. If set must point to an executable of a build of Chromium version 54.0 or later. By default, any detected Chrome Canary or Chrome (stable) will be launched.
            `,
        'perf': 'Use a performance-test-only configuration',
        'hostname': 'The hostname to use for the debugging protocol.',
        'port': 'The port to use for the debugging protocol. Use 0 for a random port',
        'max-wait-for-load': 'The timeout (in milliseconds) to wait before the page is considered done loading and the run should continue. WARNING: Very high values can lead to large traces and instability',
    })
        .group(['output', 'output-path', 'view'], 'Output:')
        .describe({
        'output': `Reporter for the results, supports multiple values`,
        'output-path': `The file path to output the results. Use 'stdout' to write to stdout.
If using JSON output, default is stdout.
If using HTML output, default is a file in the working directory with a name based on the test URL and date.
If using multiple outputs, --output-path is ignored.
Example: --output-path=./lighthouse-results.html`,
        'view': 'Open HTML report in your browser'
    })
        .boolean([
        'disable-storage-reset', 'disable-device-emulation', 'disable-cpu-throttling',
        'disable-network-throttling', 'save-assets', 'save-artifacts', 'list-all-audits',
        'list-trace-categories', 'perf', 'view', 'verbose', 'quiet', 'help'
    ])
        .choices('output', printer_1.GetValidOutputOptions())
        .array('blocked-url-patterns')
        .default('chrome-flags', '')
        .default('disable-cpu-throttling', false)
        .default('output', printer_1.GetValidOutputOptions()[printer_1.OutputMode.domhtml])
        .default('port', 0)
        .default('hostname', 'localhost')
        .default('max-wait-for-load', Driver.MAX_WAIT_FOR_FULLY_LOADED)
        .check((argv) => {
        // Make sure lighthouse has been passed a url, or at least one of --list-all-audits
        // or --list-trace-categories. If not, stop the program and ask for a url
        if (!argv.listAllAudits && !argv.listTraceCategories && argv._.length === 0) {
            throw new Error('Please provide a url');
        }
        return true;
    })
        .epilogue('For more information on Lighthouse, see https://developers.google.com/web/tools/lighthouse/.')
        .wrap(yargs.terminalWidth())
        .argv;
}
exports.getFlags = getFlags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLWZsYWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpLWZsYWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxZQUFZLENBQUM7O0FBRWIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0FBRTlELHVDQUE0RDtBQVE1RCxrQkFBeUIsVUFBbUI7SUFDMUMsTUFBTSxDQUFDLEdBQUcsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7SUFFakQsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ2hCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUM7U0FDMUIsY0FBYyxDQUFDLEtBQUssRUFBRSxzQ0FBc0MsQ0FBQztTQUU3RCxLQUFLLENBQUMsa0JBQWtCLENBQUM7U0FDekIsT0FBTyxDQUNKLHlCQUF5QixFQUFFLDREQUE0RCxDQUFDO1NBQzNGLE9BQU8sQ0FDSiw4Q0FBOEMsRUFDOUMscUZBQXFGLENBQUM7U0FDekYsT0FBTyxDQUNKLDBFQUEwRSxFQUMxRSxpREFBaUQsQ0FBQztTQUNyRCxPQUFPLENBQ0osMEVBQTBFLEVBQzFFLDBCQUEwQixDQUFDO1NBQzlCLE9BQU8sQ0FDSix5REFBeUQsRUFDekQsMkNBQTJDLENBQUM7U0FDL0MsT0FBTyxDQUNKLHNEQUFzRCxFQUN0RCwwQ0FBMEMsQ0FBQztTQUc5QyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUUsVUFBVSxDQUFDO1NBQ3ZDLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsS0FBSyxFQUFFLDRDQUE0QztLQUNwRCxDQUFDO1NBRUQs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