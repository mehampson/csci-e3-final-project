import { assertEq, testBiker } from "./modules/testBiker.mjs";

window.addEventListener("load", function () {
    this.document.getElementById("test-button").addEventListener(
        "click",
        (evt) => {
            /* Here's our fancy logic. We'll need to test this. */
            let text = this.document
                .getElementById("input")
                .value.split("")
                .reverse()
                .join("");

            this.document.getElementById("target").innerText = text;
        },
        false
    );

    /* We'll for a custom event type at the document level, to minimize the chance
     * that these tests could be accidentally run by an end user.
     * We can run our tests from the console with:
     *   document.dispatchEvent(new Event("test"))
     */
    this.document.addEventListener(
        "test",
        (evt) => {
            let tests = [
                /* The important thing to test is logic we wrote ourselves:
                 * We'll manually enter a value in the field and assert that
                 * we'll find the correct result in the place we intend it to be.
                 *
                 * Also, note that we need to bind 'this' to the function.
                 * Otherwise, we lose it from the function context once we
                 * hand it off to testBiker. */
                function reverseInputTest() {
                    let input = this.document.getElementById("input");
                    let button = this.document.getElementById("test-button");
                    let target = this.document.getElementById("target");
                    input.value = "test string";
                    button.click();
                    return assertEq(target.innerText, "gnirts tset");
                }.bind(this),
            ];

            // Use the optional 'renderer' parameter to get CSS for Firefox,
            // which doesn't support ANSI color codes in the console.
            testBiker(tests, "css");
        },
        false
    );
});
