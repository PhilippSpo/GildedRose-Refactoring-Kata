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
  decreasesSellIn(): boolean;
}

class RegularItemBehavior implements ItemBehavior {
  updateQuality(item: Item, gildedRose: GildedRose): void {
    gildedRose.decreaseRegularItemQuality(item);
  }
  decreasesSellIn(): boolean {
    return true;
  }
}

class AgedBrieItemBehavior implements ItemBehavior {
  updateQuality(item: Item, gildedRose: GildedRose): void {
    gildedRose.increaseItemQuality(item);
  }
  decreasesSellIn(): boolean {
    return true;
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
  decreasesSellIn(): boolean {
    return true;
  }
}
class SulfurasItemBehavior implements ItemBehavior {
  updateQuality(item: Item, gildedRose: GildedRose): void {}
  decreasesSellIn(): boolean {
    return false;
  }
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
      this.decreaseItemSellIn(this.items[i], itemBehavior);
      this.updateItemQualityAfterDecreasingSellIn(this.items[i], itemBehavior);
    }

    return this.items;
  }

  private decreaseItemSellIn(item: Item, itemBehavior: ItemBehavior) {
    if (itemBehavior.decreasesSellIn()) {
      item.sellIn = item.sellIn - 1;
    }
  }

  private updateItemQualityAfterDecreasingSellIn(item: Item, itemBehavior: ItemBehavior) {
    if (item.sellIn < 0) {
      itemBehavior.updateQuality(item, this);
    }
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
