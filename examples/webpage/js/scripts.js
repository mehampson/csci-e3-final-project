import { assertEq, testBiker } from "./modules/testBiker.mjs";

window.addEventListener("load", function () {
    this.document.getElementById("test-button").addEventListener(
        "click",
        (evt) => {
            let text = this.document
                .getElementById("input")
                .value.split("")
                .reverse()
                .join("");

            this.document.getElementById("target").innerText = text;

            console.log("clicks");
        },
        false
    );

    /* Here we've chosen to watch for a custom event type, to minimize the chance
     * that these tests could be accidentally run by an end user.
     * We can run our tests from the console with:
     *   document.dispatchEvent(new Event("test"))
     */
    this.document.addEventListener(
        "test",
        (evt) => {
            let tests = [
                /* The important thing to test is the logic we wrote ourselves.
                 * So we'll manually enter a value in the field and assert that
                 * we'll find the correct result in the correct place.
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

            // Use the optional 'css' parameter for Firefox, which doesn't support
            // ANSI color codes in the console.
            testBiker(tests, true);
        },
        false
    );
});
