import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import ICacheProvider from '../models/ICacheProvider';

@Injectable()
export class RedisCacheProvider implements ICacheProvider {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  public async recover<T>(key: string): Promise<T | undefined> {
    return this.cache.get<T>(key);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.cache.set(key, JSON.stringify(value));
  }

  public async invalidate(key: string): Promise<void> {
    return this.cache.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys: string[] = await this.cache.store.keys(`${prefix}:*`);
    console.log('KEYS:', keys);

    keys.forEach((key) => this.invalidate(key));
  }
}
