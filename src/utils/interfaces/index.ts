import { Cuisine, Location, Price, Review } from '@prisma/client';

export interface LoginType {
    email: string;
    password: string;
}

export interface RegisterType {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    city: string;
}

export interface SelectItems {
    id: boolean;
    email: boolean;
    first_name: boolean;
    last_name: boolean;
    phone: boolean;
    city: boolean;
    password: boolean;
    created_at: boolean;
    updated_at: boolean;
  }

export interface RestaurantCardType {
    id: number;
    name: string;
    main_img: string;
    slug: string;
    Cuisine: Cuisine;
    Location: Location;
    price: Price;
    reviews: number;
}

export interface RestaurantDetailsType {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
    Location: Location;
    reviews: Review[];
    open_time: string;
    close_time: string;
}

export interface RestaurantMenuType {
    id: number;
    name: string;
    price: string;
    description: string;
    restaurant_id: number;
}

export interface SearchResultsType {
    reviews: Review[];
    id: number;
    name: string;
    main_img: string;
    slug: string;
    Cuisine: Cuisine | null;
    Location: Location | null;
    price: Price;
}

export interface ValidationRule {
    validator: (value: string) => boolean;
    message: string;
    required?: boolean;
  }

export interface ValidationRules {
    [key: string]: ValidationRule;
  }
