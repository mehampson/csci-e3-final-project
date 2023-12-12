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
        },
        false
    );
});

window.addEventListener("test", function () {
    assertEq(1, 1);
});
