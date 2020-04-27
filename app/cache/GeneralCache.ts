import NodeCache from 'node-cache';

class GeneralCache {
  static cache = new NodeCache();

  static addToCache(key: string, value: any) {
    GeneralCache.cache.set(key, value);
  }

  static getValue(key: string) {
    GeneralCache.cache.get(key);
  }
}

export default GeneralCache;
