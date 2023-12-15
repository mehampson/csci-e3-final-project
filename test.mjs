import {
    assert,
    assertEq,
    assertNotEq,
    assertException,
    assertNaN,
    assertInstance,
    assertFinite,
    assertInfinite,
    assertType,
    assertNotNull,
    assertNull,
    assertChildOf,
    assertNoChildren,
    testBiker,
    Pass,
    Fail,
} from "./main.mjs";

// Testing our assertions

let tests = [
    function testAssertions() {
        let pass = assert(true, "test passes");
        let fail = assert(false, "test fails");

        if (pass instanceof Pass && fail instanceof Fail) {
            return new Pass();
        } else {
            return new Fail("Basic assertions are not working");
        }
    },

    function testEq() {
        return assertEq("t", "t");
    },

    function testNotEq() {
        return assertNotEq("t", "r");
    },

    function testException() {
        return assertException(() => {
            throw new Error("test");
        });
    },

    function testNaN() {
        return assertNaN("test");
    },

    function testInstance() {
        class Test {}
        return assertInstance(new Test(), Test);
    },

    function testFinite() {
        return assertFinite(1);
    },

    function testInfinite() {
        return assertInfinite(1 / 0);
    },

    function testType() {
        return assertType("test", "string");
    },

    function testNotNull() {
        return assertNotNull("test");
    },

    function testNull() {
        return assertNull(null);
    },

    function testJsonOutput() {
        let jtests = [
            function jPass() {
                return new Pass();
            },

            function jFail() {
                return new Fail("Json test");
            },
        ];

        let json = testBiker(jtests, "json");
        let expected =
            '[{"msg":"Pass","name":"jPass"},{"msg":"Fail: Json test","name":"jFail"}]';
        return assertEq(json, expected);
    },
];

testBiker(tests);
