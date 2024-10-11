import Repository from './repository.js';
import SecondaryRepository from './secondaryRepository.js';

class Service {
  constructor() {
    this.primaryRepository = new Repository();
    this.secondaryRepository = new SecondaryRepository();
  }

  getAllItems() {
    return this.primaryRepository.getAllItems();
  }

  getItemById(id) {
    let item = this.primaryRepository.getItemById(id);
    if (!item) {
      item = this.secondaryRepository.getItemById(id);
    }
    if (!item) {
      throw new Error('Item tidak ditemukan di kedua repository');
    }
    return item;
  }

  addItem(name) {
    const newItem = { id: this.primaryRepository.data.length + 1, name };
    return this.primaryRepository.addItem(newItem);
  }
}

export default Service;
