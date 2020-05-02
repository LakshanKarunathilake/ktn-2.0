import NodeCache from 'node-cache';

class GeneralCache {
  static cache: NodeCache;

  static addToCache(key: string, value: any) {
    if (GeneralCache.cache === undefined) {
      GeneralCache.cache = new NodeCache();
    }
    GeneralCache.cache.set(key, value);
  }

  static getValue(key: string) {
    return GeneralCache.cache.get(key);
  }
}

export default GeneralCache;
