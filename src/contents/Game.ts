import type { Label } from "./games";

export interface Game {
  id: string;
  slug: string;
  name: string;
  title: string;
  desc: string;
  cardBgColor: string;
  icon: ImageMetadata;
  cover: ImageMetadata; 
  card: ImageMetadata;
  heroImageBg: ImageMetadata;
  heroImageBgColor: string;
  heroImageFg: ImageMetadata;
  heroImageMobile: ImageMetadata;
  shareImage?: string; // 专门用于社交分享的图片URL
  status: number;
  updated_at?: number;
  rtp: number;
  category: string;
  releaseDate: number;
  screenshots: ImageMetadata[];
  features: Label[];
  weight: number;
  game_code: string;
}
