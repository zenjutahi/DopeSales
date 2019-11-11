import formatMoney from "../lib/formatMoney";

describe("formartMoney Function", () => {
  it("works with fractional dollers", () => {
    expect(formatMoney(1)).toEqual("$0.01");
    expect(formatMoney(10)).toEqual("$0.10");
    expect(formatMoney(9)).toEqual("$0.09");
    expect(formatMoney(40)).toEqual("$0.40");
  });

  it("leaves cents off for whole dollers", () => {
    expect(formatMoney(5000)).toEqual("$50");
    expect(formatMoney(100)).toEqual("$1");
    expect(formatMoney(50000000)).toEqual("$500,000");
  });

  it("works with whole and fractional dollers", () => {
    expect(formatMoney(5013)).toEqual("$50.13");
    expect(formatMoney(1010)).toEqual("$10.10");
    expect(formatMoney(67862392)).toEqual("$678,623.92");
  });
});
