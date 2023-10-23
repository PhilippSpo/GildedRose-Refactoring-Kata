import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  describe("normal items", () => {
    it("should lower the quality by one", () => {
      const gildedRose = new GildedRose([new Item("foo", 5, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(4);
    });
    it("Once the sell by date has passed, Quality degrades by two", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
    it("should not allow the quality to get negative", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
  describe("aged brie", () => {
    it("increases quality the older it gets", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 5, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(6);
    });
    it("increases quality also when sell in date is passed", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(7);
    });
    it("doesn't increase the quality above 50", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 5, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(50);
    });
    it("doesn't increase the quality above 50 when sell date is passed", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(50);
    });
  });
  describe("sulfuras", () => {
    it("doesn't lower its sellIn value and doesn't decrease in quality", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 5, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(5);
      expect(items[0].quality).toBe(80);
    });
    it("doesn't lower its sellIn value and doesn't decrease in quality even when sell in value is negative", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", -5, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-5);
      expect(items[0].quality).toBe(80);
    });
  });
  describe("backstage passes", () => {
    it("increases quality by 1 when there are more than 10 days to sell", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 12, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(11);
      expect(items[0].quality).toBe(6);
    });
    it("increases quality by 2 when there are less than 10 days to sell", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(7);
    });
    it("doesn't increase quality above 50 when there are less than 10 days to sell", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(50);
    });
    it("increases quality by 3 when there are less than 5 days to sell", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(8);
    });
    it("doesn't increase quality above 50 when there are less than 5 days to sell", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(50);
    });
    it("doesn't increase quality above 50 when there are less than 5 days to sell and the quality is 49", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(50);
    });
    it("drops quality to 0 when the concert has taken place", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
  describe("Conjured", () => {
    it("should lower the quality by two", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 5, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(3);
    });
    it("Once the sell by date has passed, Quality degrades by four", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 0, 4)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
    it("should not allow the quality to get negative", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  })
});
