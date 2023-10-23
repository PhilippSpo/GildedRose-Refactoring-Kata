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

interface ItemBehavior {
  updateQuality(item: Item, gildedRose: GildedRose): void;
  decreaseItemSellIn(item: Item, gildedRose: GildedRose): void;
  updateItemQualityAfterDecreasingSellIn(
    item: Item,
    gildedRose: GildedRose
  ): void;
}

class RegularItemBehavior implements ItemBehavior {
  updateQuality(item: Item, gildedRose: GildedRose): void {
    gildedRose.decreaseRegularItemQuality(item);
  }
  decreaseItemSellIn(item: Item, gildedRose: GildedRose): void {
    gildedRose.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(
    item: Item,
    gildedRose: GildedRose
  ): void {
    if (item.sellIn < 0) {
      this.updateQuality(item, gildedRose);
    }
  }
}

class AgedBrieItemBehavior implements ItemBehavior {
  updateQuality(item: Item, gildedRose: GildedRose): void {
    gildedRose.increaseItemQuality(item);
  }
  decreaseItemSellIn(item: Item, gildedRose: GildedRose): void {
    gildedRose.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(
    item: Item,
    gildedRose: GildedRose
  ): void {
    if (item.sellIn < 0) {
      this.updateQuality(item, gildedRose);
    }
  }
}

class BackstagePassItemBehavior implements ItemBehavior {
  updateQuality(item: Item, gildedRose: GildedRose): void {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      gildedRose.increaseItemQuality(item);
      if (item.sellIn < 11) {
        gildedRose.increaseItemQuality(item);
      }
      if (item.sellIn < 6) {
        gildedRose.increaseItemQuality(item);
      }
    }
  }
  decreaseItemSellIn(item: Item, gildedRose: GildedRose): void {
    gildedRose.decreaseItemSellIn(item);
  }
  updateItemQualityAfterDecreasingSellIn(
    item: Item,
    gildedRose: GildedRose
  ): void {
    if (item.sellIn < 0) {
      this.updateQuality(item, gildedRose);
    }
  }
}
class SulfurasItemBehavior implements ItemBehavior {
  updateQuality(item: Item, gildedRose: GildedRose): void {}
  decreaseItemSellIn(): void {}
  updateItemQualityAfterDecreasingSellIn(
    item: Item,
    gildedRose: GildedRose
  ): void {}
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

      itemBehavior.updateQuality(this.items[i], this);
      itemBehavior.decreaseItemSellIn(this.items[i], this);
      itemBehavior.updateItemQualityAfterDecreasingSellIn(this.items[i], this);
    }

    return this.items;
  }

  decreaseItemSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  increaseItemQuality(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  decreaseRegularItemQuality(item: Item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }
}
