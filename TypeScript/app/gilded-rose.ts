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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.isSulfuras(this.items[i])) {
        this.updateItemQuality(this.items[i]);
        this.decreaseItemSellIn(this.items[i]);
        this.updateItemQualityAfterDecreasingSellIn(this.items[i]);
      }
    }

    return this.items;
  }

  private isSulfuras(item: Item) {
    return item.name == "Sulfuras, Hand of Ragnaros";
  }

  private updateItemQuality(item: Item) {
    if (item.name == "Aged Brie") {
      this.increaseItemQuality(item);
    } else if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      this.updateBackstagePassesItemQuality(item);
    } else {
      this.decreaseRegularItemQuality(item);
    }
  }

  private decreaseItemSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  private updateItemQualityAfterDecreasingSellIn(item: Item) {
    if (item.sellIn < 0) {
      this.updateItemQuality(item);
    }
  }

  private updateBackstagePassesItemQuality(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      this.increaseItemQuality(item);
      if (item.sellIn < 11) {
        this.increaseItemQuality(item);
      }
      if (item.sellIn < 6) {
        this.increaseItemQuality(item);
      }
    }
  }

  private increaseItemQuality(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  private decreaseRegularItemQuality(item: Item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }
}
