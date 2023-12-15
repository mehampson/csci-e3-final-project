import { Pass, Fail } from "./assertions.js";

class ColorFormat {
    constructor(pass, fail, error, reset) {
        this.pass = pass;
        this.fail = fail;
        this.error = error;
        this.reset = reset;
    }
}

const ColorANSI = new ColorFormat(
    "\u001b[32m",
    "\u001b[31m",
    "\u001b[35m",
    "\u001b[0m"
);

const ColorCSS = new ColorFormat(
    "rgb(0,170,0)",
    "rgb(170,0,0)",
    "rgb(170,0,170",
    "initial"
);

function testBiker(tests, renderer = "console") {
    /* Takes an array of test functions and calls each one.
     * The test functions should each return the value of an assertion
     * function, like those below, for this to work as expected.
     * (i.e., a Pass or Fail object.)
     *
     * The 'renderer' parameter controls the output behavior of this function.
     * There are three options:
     *   console: print to an ANSI-compatible terminal (includes Chromium-based browsers)
     *   css: print to a CSS-compatible terminal (specifically, you'll need this in Firefox)
     *   json: return the results as a JSON string instead of printing to the console */

    let results = [];

    /* First we run through the tests and perform them. We add the function name to the
     * results but nothing else at this point */
    for (let test of tests) {
        let r = test();
        r.name = test.name;
        results.push(r);
    }

    // Now we do something with the results. JSON, or the console?
    if (renderer == "json") {
        return JSON.stringify(results);
    } else {
        // Which of our defined ColorFormat instances we need to use?
        let colors = renderer == "css" ? ColorCSS : ColorANSI;

        // Counter for how many tests pass
        let passes = 0;

        for (let result of results) {
            let msg, color;
            if (result instanceof Pass) {
                passes += 1;
                msg = result.msg;
                color = colors.pass;
            } else if (result instanceof Fail) {
                msg = result.msg;
                color = colors.fail;
            } else {
                /* If the test function can't give us a Pass or Fail object,
                 * it probably wasn't set up correctly to begin with. */
                msg = "Invalid test";
                color = colors.error;
            }
            /* Browser terminals can generally parse CSS embedded in the console messages.
             * We use the %c operator to do that. */
            if (renderer == "css") {
                console.log(
                    `  ${result.name}: %c${msg}%c`,
                    `color:${color}`,
                    `color:${colors.reset}`
                );
            } else {
                /* This is our default case: the classic ANSI format */
                console.log(`  ${result.name}: ${color}${msg}${colors.reset}`);
            }
        }
        console.log(
            `${passes == results.length ? "Success" : "Uh-oh"}: ${passes}/${
                results.length
            } tests passed.`
        );
    }
}

export { testBiker };
