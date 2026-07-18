import voiceReviewRitika from '@/assets/audio/voice_review_ritika.mp3';
import voiceReviewSimran from '@/assets/audio/voice_review_simran.mp3';

export type TextReview = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
};

export type ImageReview = {
  id: string;
  name: string;
  location: string;
  imageSrc: string;
  caption: string;
  rating: number;
};

export type VideoReview = {
  id: string;
  name: string;
  location: string;
  thumbnail: string;
  instagramUrl: string;
  caption: string;
};

export type VoiceReview = {
  id: string;
  name: string;
  location: string;
  rating: number;
  audioSrc: string;
  duration: string;
  caption: string;
};

export const TEXT_REVIEWS: TextReview[] = [
  { id: 'tr-1', name: 'Priya S.', location: 'Agra, UP', rating: 5, text: 'Absolutely wonderful experience! The beautician arrived on time and was very professional. Highly recommended for home services in Agra.' },
  { id: 'tr-2', name: 'Neha G.', location: 'Agra, UP', rating: 5, text: 'The Rica wax was practically painless. Very hygienic setup, they bring everything needed. Will book again.' },
  { id: 'tr-3', name: 'Anjali M.', location: 'Agra, UP', rating: 5, text: 'Got the Korean Mani Pedi done and it was heavenly. So relaxing to get spa-quality service in my own living room.' },
  { id: 'tr-4', name: 'Kritika R.', location: 'Agra, UP', rating: 5, text: 'Booking was so easy, and the staff is very polite. The glow facial gave me amazing results right before my event.' },
  { id: 'tr-5', name: 'Simran K.', location: 'Agra, UP', rating: 5, text: "Best home salon service in Agra! I love that I don't have to deal with traffic just to get my eyebrows threaded." },
  { id: 'tr-6', name: 'Megha V.', location: 'Agra, UP', rating: 5, text: 'Very affordable for the premium quality they provide. Their sanitization process is top-notch.' },
  { id: 'tr-7', name: 'Pooja T.', location: 'Agra, UP', rating: 5, text: 'The Hydra Glow Body Polishing was a game changer before my sister\'s wedding. My skin has never felt this soft!' },
  { id: 'tr-8', name: 'Ishita B.', location: 'Agra, UP', rating: 4, text: 'Great service overall, the beautician was skilled and friendly. Would love a few more evening slots though.' },
  { id: 'tr-9', name: 'Rashi D.', location: 'Agra, UP', rating: 5, text: 'Booked the Bridal Shine package for my engagement — everything from waxing to facial was flawless. Worth every rupee.' },
];

export const IMAGE_REVIEWS: ImageReview[] = [
  {
    id: 'ir-1',
    name: 'Pallavi S.',
    location: 'Agra, UP',
    imageSrc: '/images/reviews/01-review.jpeg',
    caption: 'Loved the premium kit and hygienic setup during my home facial session.',
    rating: 5,
  },
  {
    id: 'ir-2',
    name: 'Nisha K.',
    location: 'Agra, UP',
    imageSrc: '/images/reviews/02-review.jpeg',
    caption: 'My bridal glow prep felt so luxurious right in my own home.',
    rating: 5,
  },
  {
    id: 'ir-3',
    name: 'Aditi R.',
    location: 'Agra, UP',
    imageSrc: '/attached_assets/generated_images/korean-mani.jpg',
    caption: 'The manicure and pedicure setup was elegant, relaxing, and spotless.',
    rating: 5,
  },
];

export const VIDEO_REVIEWS: VideoReview[] = [
  {
    id: 'vr-1',
    name: 'Ritika M.',
    location: 'Agra, UP',
    thumbnail: '/attached_assets/generated_images/facial.jpg',
    instagramUrl: 'https://instagram.com/women_sglow_agra',
    caption: 'Sharing my Hydra Glow facial experience — my skin feels amazing!',
  },
  {
    id: 'vr-2',
    name: 'Sneha P.',
    location: 'Agra, UP',
    thumbnail: '/attached_assets/generated_images/korean-mani.jpg',
    instagramUrl: 'https://instagram.com/women_sglow_agra',
    caption: 'A quick video of my Korean Mani-Pedi session at home.',
  },
  {
    id: 'vr-3',
    name: 'Anushka R.',
    location: 'Agra, UP',
    thumbnail: '/attached_assets/generated_images/bridal.jpg',
    instagramUrl: 'https://instagram.com/women_sglow_agra',
    caption: 'My bridal glow package review, start to finish!',
  },
];

export const VOICE_REVIEWS: VoiceReview[] = [
  {
    id: 'vc-1',
    name: 'Ritika S.',
    location: 'Agra, UP',
    rating: 5,
    audioSrc: voiceReviewRitika,
    duration: '0:18',
    caption: 'On the Korean facial experience',
  },
  {
    id: 'vc-2',
    name: 'Simran K.',
    location: 'Agra, UP',
    rating: 5,
    audioSrc: voiceReviewSimran,
    duration: '0:20',
    caption: 'On trying a home salon for the first time',
  },
];
