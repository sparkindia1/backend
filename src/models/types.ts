import { Types } from 'mongoose';

export enum Role {
  ADMIN = 'ADMIN',
  BUYER = 'BUYER',
  SELLER = 'SELLER',
}

export enum Status {
  CREATED = 'CREATED',
  RECEIVED = 'RECEIVED',
  PACKED = 'PACKED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface User {
  name: string;
  phone: string;
  password: string;
  email: string;
  role: Role;
  isDeleted: boolean;
  isVerified: boolean;
  lastOtp?: number;
  buyerProfile?: Types.ObjectId;
  sellerProfile?: Types.ObjectId;
  warnings: Warnings[];
}

export type PartialUser = Pick<User, 'email' | 'role' | 'phone' | 'name'> & {
  _id: Types.ObjectId;
};

export interface Warnings {
  reason: string;
  severity: number;
  date: Date;
}

export interface BuyerProfile {
  user: Types.ObjectId;
}

export interface SellerProfile {
  user: Types.ObjectId;
  companyName: string;
  companyUsername: string;
  businessEmail: string;
  businessPhone: string;
  pincode: number;
  city: string;
  state: string;
  address?: string;
  gstNumber?: string;
  panNumber?: string;
  udhyogAadharNumber?: string;
  startupIndiaRegistrationNumber?: string;
  companyIncorporationCertificate?: string;
  businessLogo: string;
  isVerifiedSeller: boolean;
  products: Types.ObjectId[];
}

export interface Category {
  name: string;
  description?: string;
  products: Types.ObjectId[];
}

export interface ProductPrice {
  cost: number; // in rupees
  levelIndex: number; // 1 for level 1 (base), 2 for level 2 (...and so on) etc.
  levelLimit: string; // 0-10, 10-20, 20-30, 30-40, etc
}

export interface Product {
  name: string;
  description?: string;
  price: ProductPrice[];
  bannerImage: string;
  otherImages: string[];
  stock: number;
  isDeleted: boolean;
  isVerified: boolean;
  isTrending: boolean;
  owner: Types.ObjectId;
  categories: Types.ObjectId[];
  reviews: Types.ObjectId[];
  lastOtp?: number;
}

export interface Review {
  product: string | Product;
  user: string | User;
  rating: number;
  comment: string;
}

export interface Order {
  user: Types.ObjectId;
  products: Types.ObjectId[];
  shippingAddress: string;
  paymentMethod: string;
  itemCharges: number;
  taxCharges: number;
  shippingCharges: number;
  otherCharges: number;
  status?: Status;
  lastOtp?: number;
}
