describe("Business Logic test - WRITE TEST functionality", () => {
  const { writeTest } = require('../../business_logics')();

  it("should be a function", () => {
    expect(typeof writeTest).toBe('function');
  });

  describe("Given a valid workflow path", () => {
    const path = {
      workflowName: "Testing home page",
      pathName: "Login path",
      url: "http://localhost:3000",
      tests: [
        {
          order: 1,
          action: "goto",
          target: "/",
          expectations: [
            {
              expect: "Sign Up",
              type: "text",
              toBe: "present"
            },
            {
              expect: "email",
              type: "field",
              toBe: "present"
            }
          ]
        }
      ]
    };

    it("should return test string", () => {
      const expectedTestString = `describe("")`;

      expect(writeTest(path)).toBe(expectedTestString)
    })
  })
})
