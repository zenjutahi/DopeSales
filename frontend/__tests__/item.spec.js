import ItemComponent from "../components/Item";
import { shallow } from "enzyme";

const fakeItem = {
  id: "adcde1234",
  title: "A Cool Item",
  price: 6500,
  description: "This item is so cool it drives me crazy",
  image: "item.jpg",
  largeImage: "item-large.jpg"
};

describe("<Item/>", () => {
  const wrapper = shallow(<ItemComponent item={fakeItem} />);
  it("renders the image properly", () => {
    // const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const img = wrapper.find("img");
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it("renders and displays title and price properly", () => {
    // const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const priceTag = wrapper.find("PriceTag");
    const title = wrapper.find("Title a");
    expect(priceTag.children().text()).toBe("$65");
    expect(title.text()).toBe(fakeItem.title);
  });

  it("renders out the buttons properly", () => {
    // const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const buttonList = wrapper.find(".buttonList");
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find("Link")).toBeTruthy();
    expect(buttonList.find("AddToCart")).toHaveLength(1);
  });
});
