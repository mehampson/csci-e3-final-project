import {
    assertEq,
    assertNoChildren,
    testBiker,
} from "./modules/testBiker/main.mjs";

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

            let newLi = this.document.createElement("li");
            newLi.innerText = text;

            this.document.getElementById("target").appendChild(newLi);
        },
        false
    );

    this.document
        .getElementById("reset-button")
        .addEventListener("click", (evt) => {
            this.document.getElementById("target").innerHTML = "";
        });

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
                    this.document.getElementById("input").value = "test string";
                    this.document.getElementById("test-button").click();
                    return assertEq(
                        this.document.getElementById("target").lastChild
                            .innerText,
                        "gnirts tset"
                    );
                }.bind(this),

                /* And here we'll manually add something to #target, and make sure
                 * our reset button removes it correctly. */
                function resetTest() {
                    let button = this.document.getElementById("reset-button");
                    let target = this.document.getElementById("target");

                    let newLi = this.document.createElement("li");
                    newLi.innerText = "test text";

                    target.appendChild(newLi);

                    button.click();

                    return assertNoChildren(target);
                }.bind(this),
            ];

            // Use the optional 'renderer' parameter to get CSS for Firefox,
            // which doesn't support ANSI color codes in the console.
            testBiker(tests, "css");
        },
        false
    );
});
