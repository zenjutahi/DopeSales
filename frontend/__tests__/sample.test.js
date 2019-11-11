describe("Sample test 101", () => {
  it("Works as expected", () => {
    const age = 44;
    expect(1).toEqual(1);
    expect(age).toEqual(44);
  });

  it("Handles range just fine", () => {
    expect(22).toBeGreaterThan(1);
  });

  it("Makes a list of dog names ", () => {
    const dogs = ["snikers", "fanta"];
    expect(dogs).toEqual(dogs);
    expect(dogs).toContain("fanta");
  });
});
