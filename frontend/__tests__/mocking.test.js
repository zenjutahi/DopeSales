function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    // simulating an API
    setTimeout(() => resolve(this.foods), 5000);
  });
};

describe("mocking learning", () => {
  it("mocks a reg function", () => {
    const fetchDogs = jest.fn();
    fetchDogs("fantah");
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith("fantah");
    fetchDogs();
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it("can create a person", () => {
    const me = new Person("jef", ["meat", "candy"]);
    expect(me.name).toBe("jef");
  });

  it("can fetch foods", async () => {
    const me = new Person("jef", ["meat", "candy"]);
    // mock the fetchFavFoods function
    me.fetchFavFoods = jest.fn().mockResolvedValue(["sishi", "meat"]);
    const favFoods = await me.fetchFavFoods();
    console.log(favFoods);
    expect(favFoods).toContain("meat");
  });
});
