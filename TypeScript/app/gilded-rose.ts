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
  static changeSellIn(item: Item, changeBy: number) {
    item.sellIn = item.sellIn + changeBy;
  }

  static changeItemQuality(item: Item, changeBy: number) {
    if (changeBy === 0) return;
    item.quality = Math.max(Math.min(item.quality + changeBy, 50), 0);
  }

  static hasSellByDatePassed(item: Item) {
    return ItemHelper.shouldSellWithinDays(item, 0);
  }

  static shouldSellWithinDays(item: Item, days: number) {
    return item.sellIn < days;
  }
}

interface ItemBehavior {
  updateQuality(item: Item): number;
  updateItemSellIn(): number;
}

class RegularItemBehavior implements ItemBehavior {
  updateQuality(item: Item): number {
    if (ItemHelper.hasSellByDatePassed(item)) {
      return -2;
    }
    return -1;
  }
  updateItemSellIn(): number {
    return -1;
  }
}

class AgedBrieItemBehavior implements ItemBehavior {
  updateQuality(item: Item): number {
    if (ItemHelper.hasSellByDatePassed(item)) {
      return 2;
    }
    return 1;
  }
  updateItemSellIn(): number {
    return -1;
  }
}

class BackstagePassItemBehavior implements ItemBehavior {
  updateQuality(item: Item): number {
    if (ItemHelper.hasSellByDatePassed(item)) {
      return -item.quality;
    }
    return this.increaseQuality(item);
  }
  updateItemSellIn(): number {
    return -1;
  }
  private increaseQuality(item: Item): number {
    if (ItemHelper.shouldSellWithinDays(item, 5)) {
      return 3;
    }
    if (ItemHelper.shouldSellWithinDays(item, 10)) {
      return 2;
    }
    return 1;
  }
}
class SulfurasItemBehavior implements ItemBehavior {
  updateQuality(): number {
    return 0;
  }
  updateItemSellIn(): number {
    return 0;
  }
}

class ConjuredItemBehavior implements ItemBehavior {
  updateQuality(item: Item): number {
    if (ItemHelper.hasSellByDatePassed(item)) {
      return -4;
    }
    return -2;
  }
  updateItemSellIn(): number {
    return -1;
  }
}

const createItemBehavior = (item: Item): ItemBehavior => {
  if (item.name == "Sulfuras, Hand of Ragnaros")
    return new SulfurasItemBehavior();
  if (item.name == "Aged Brie") return new AgedBrieItemBehavior();
  if (item.name == "Backstage passes to a TAFKAL80ETC concert")
    return new BackstagePassItemBehavior();
  if (item.name == "Conjured") return new ConjuredItemBehavior();
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

      ItemHelper.changeSellIn(this.items[i], itemBehavior.updateItemSellIn());
      ItemHelper.changeItemQuality(
        this.items[i],
        itemBehavior.updateQuality(this.items[i])
      );
    }

    return this.items;
  }
}
