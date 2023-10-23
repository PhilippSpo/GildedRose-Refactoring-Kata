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
      if (this.isSulfuras(this.items[i])) {
        continue;
      }
      this.updateItemQuality(this.items[i]);
      this.decreaseItemSellIn(this.items[i]);
      this.updateItemQualityAfterDecreasingSellIn(this.items[i]);
    }

    return this.items;
  }

  private isSulfuras(item: Item) {
    return item.name == "Sulfuras, Hand of Ragnaros";
  }

  private updateItemQuality(item: Item) {
    if (
      item.name == "Aged Brie" ||
      item.name == "Backstage passes to a TAFKAL80ETC concert"
    ) {
      this.updateValueGainingItemQuality(item);
    } else {
      this.decreaseRegularItemQuality(item);
    }
  }
  private decreaseRegularItemQuality(item: Item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }
  private updateValueGainingItemQuality(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sellIn < 11) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        if (item.sellIn < 6) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
  }

  private decreaseItemSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
  }

  private updateItemQualityAfterDecreasingSellIn(item: Item) {
    if (item.sellIn < 0) {
      this.updateItemQualityForNegativeSellIn(item);
    }
  }

  private updateItemQualityForNegativeSellIn(item: Item) {
    if (item.name == "Aged Brie") {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    } else if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      item.quality = item.quality - item.quality;
    } else {
      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
    }
  }
}
