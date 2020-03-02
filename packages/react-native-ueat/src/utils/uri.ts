import version from './version';
import { RestaurantConfig } from '../types';

export function generateRestaurantURL({
  apiKey,
  culture,
  isMarketplace
}: RestaurantConfig) {
  const action = isMarketplace ? 'marketplace' : 'integration';

  return `https://order.ueat.io/${action}/${apiKey}/${culture}?mobileapp&version=${version}`;
}
