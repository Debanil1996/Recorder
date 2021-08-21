import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { }
  public async setItem(storageKey: string, value: any) {
    let returnValue = await this.storage.set(storageKey, value);
    return returnValue;
  }

  public async get(storageKey: string) {
    let storedValue = await this.storage.get(storageKey);
    return storedValue;
  }

  public async clearStore() {
    const ret = await this.storage.clear();
    return ret;
  }


  public  async keys() {
    const keys = await this.storage.keys();
    return keys;
  }

  public async remove(key: string) {
    let returnValue = await this.storage.remove(key);
    return returnValue;
  }
}
