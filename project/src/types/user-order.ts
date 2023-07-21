import { Coupon } from '../consts';

export type UserOrder = {
    'camerasIds': number[];
    'coupon': Coupon | null;
  }
