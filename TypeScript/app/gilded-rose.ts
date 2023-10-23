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

class ItemUpdater {
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
}

interface ItemBehavior {
  updateQuality(item: Item): void;
  decreaseItemSellIn(item: Item): void;
  updateItemQualityAfterDecreasingSellIn(item: Item): void;
}

class RegularItemBehavior implements ItemBehavior {
  updateQuality(item: Item): void {
    ItemUpdater.decreaseRegularItemQuality(item);
  }
  decreaseItemSellIn(item: Item): void {
    ItemUpdater.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(item: Item): void {
    if (item.sellIn < 0) {
      this.updateQuality(item);
    }
  }
}

class AgedBrieItemBehavior implements ItemBehavior {
  updateQuality(item: Item): void {
    ItemUpdater.increaseItemQuality(item);
  }
  decreaseItemSellIn(item: Item): void {
    ItemUpdater.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(item: Item): void {
    if (item.sellIn < 0) {
      this.updateQuality(item);
    }
  }
}

class BackstagePassItemBehavior implements ItemBehavior {
  updateQuality(item: Item): void {
    if (item.sellIn < 0) {
      ItemUpdater.unsetQuality(item);
    } else {
      ItemUpdater.increaseItemQuality(item);
      if (item.sellIn < 11) {
        ItemUpdater.increaseItemQuality(item);
      }
      if (item.sellIn < 6) {
        ItemUpdater.increaseItemQuality(item);
      }
    }
  }
  decreaseItemSellIn(item: Item): void {
    ItemUpdater.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(item: Item): void {
    if (item.sellIn < 0) {
      this.updateQuality(item);
    }
  }
}
class SulfurasItemBehavior implements ItemBehavior {
  updateQuality(item: Item): void {}
  decreaseItemSellIn(): void {}
  updateItemQualityAfterDecreasingSellIn(item: Item): void {}
}

const createItemBehavior = (item: Item): ItemBehavior => {
  if (item.name == "Sulfuras, Hand of Ragnaros")
    return new SulfurasItemBehavior();
  if (item.name == "Aged Brie") return new AgedBrieItemBehavior();
  if (item.name == "Backstage passes to a TAFKAL80ETC concert")
    return new BackstagePassItemBehavior();
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
