class Cart {
  items: Array<string>;

  constructor() {
    this.items = [];
  }

  addToCart(item: string) {
    this.items.push(item);
  }

  removeFromCart(item: string) {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      if (currentItem === item) {
        this.items.splice(i, 1);
      }
    }
  }
}

export default Cart;
