export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ItemHelper {
  static unsetQuality(item: Item) {
    item.quality = 0;
  }
  static decreaseItemSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  static increaseItemQuality(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  static decreaseRegularItemQuality(item: Item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  static hasSellByDatePassed(item: Item) {
    return ItemHelper.shouldSellWithinDays(item, 0);
  }

  static shouldSellWithinDays(item: Item, days: number) {
    return item.sellIn < days;
  }
}

interface ItemBehavior {
  updateQuality(item: Item): void;
  decreaseItemSellIn(item: Item): void;
  updateItemQualityAfterDecreasingSellIn(item: Item): void;
}

class RegularItemBehavior implements ItemBehavior {
  updateQuality(item: Item): void {
    ItemHelper.decreaseRegularItemQuality(item);
  }
  decreaseItemSellIn(item: Item): void {
    ItemHelper.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(item: Item): void {
    if (ItemHelper.hasSellByDatePassed(item)) {
      this.updateQuality(item);
    }
  }
}

class AgedBrieItemBehavior implements ItemBehavior {
  updateQuality(item: Item): void {
    ItemHelper.increaseItemQuality(item);
  }
  decreaseItemSellIn(item: Item): void {
    ItemHelper.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(item: Item): void {
    if (ItemHelper.hasSellByDatePassed(item)) {
      this.updateQuality(item);
    }
  }
}

class BackstagePassItemBehavior implements ItemBehavior {
  updateQuality(item: Item): void {
    if (ItemHelper.hasSellByDatePassed(item)) {
      ItemHelper.unsetQuality(item);
      return;
    }
    this.increaseQuality(item);
  }
  decreaseItemSellIn(item: Item): void {
    ItemHelper.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(item: Item): void {
    if (ItemHelper.hasSellByDatePassed(item)) {
      this.updateQuality(item);
    }
  }
  private increaseQuality(item: Item) {
    ItemHelper.increaseItemQuality(item);
    if (ItemHelper.shouldSellWithinDays(item, 11)) {
      ItemHelper.increaseItemQuality(item);
    }
    if (ItemHelper.shouldSellWithinDays(item, 6)) {
      ItemHelper.increaseItemQuality(item);
    }
  }
}
class SulfurasItemBehavior implements ItemBehavior {
  updateQuality(item: Item): void {}
  decreaseItemSellIn(): void {}
  updateItemQualityAfterDecreasingSellIn(item: Item): void {}
}

class ConjuredItemBehavior implements ItemBehavior {
  updateQuality(item: Item): void {
    ItemHelper.decreaseRegularItemQuality(item);
    ItemHelper.decreaseRegularItemQuality(item);
  }
  decreaseItemSellIn(item: Item): void {
    ItemHelper.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(item: Item): void {
    if (ItemHelper.hasSellByDatePassed(item)) {
      this.updateQuality(item);
    }
  }
}

const createItemBehavior = (item: Item): ItemBehavior => {
  if (item.name == "Sulfuras, Hand of Ragnaros")
    return new SulfurasItemBehavior();
  if (item.name == "Aged Brie") return new AgedBrieItemBehavior();
  if (item.name == "Backstage passes to a TAFKAL80ETC concert")
    return new BackstagePassItemBehavior();
  if (item.name == "Conjured")
    return new ConjuredItemBehavior();
  return new RegularItemBehavior();
};

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const itemBehavior = createItemBehavior(this.items[i]);

      itemBehavior.updateQuality(this.items[i]);
      itemBehavior.decreaseItemSellIn(this.items[i]);
      itemBehavior.updateItemQualityAfterDecreasingSellIn(this.items[i]);
    }

    return this.items;
  }
}
