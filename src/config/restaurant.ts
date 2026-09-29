/**
 * Royal Gazebo Restaurant - Centralized Configuration
 * Verified business information, contact details, URLs, and brand parameters.
 */

export const RESTAURANT_INFO = {
  name: "Royal Gazebo Restaurant",
  tagline: "A Royal Taste in Every Bite",
  eyebrow: "A ROYAL DINING EXPERIENCE",
  description:
    "Discover authentic flavours, inviting ambience, and memorable dining moments at Royal Gazebo, Mangaluru.",
  
  // Location & Address
  mall: "Mischief Mall, Ground Floor",
  street: "K S Rao Road, near Joy Alukas and Zudio",
  city: "Mangaluru",
  state: "Karnataka",
  postalCode: "575001",
  country: "India",
  fullAddress: "Mischief Mall, Ground Floor, K S Rao Road, near Joy Alukas and Zudio, Mangaluru, Karnataka 575001",
  shortLocation: "Mischief Mall · Mangaluru",

  // Contact
  phoneDisplay: "+91 87921 32211",
  phoneRaw: "+918792132211",
  phoneTel: "tel:+918792132211",
  
  // WhatsApp Integration
  whatsappNumber: "918792132211",
  whatsappPrefilledMessage: "Hello Royal Gazebo, I would like to know more about your home delivery options and menu.",
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappPrefilledMessage)}`;
  },

  // Social & Map Links
  instagramUrl: "https://www.instagram.com/royalgazebo_restaurant/",
  instagramHandle: "@royalgazebo_restaurant",
  googleMapsUrl: "https://maps.app.goo.gl/HykDN4r8gKAVFCdp8",
  
  // Google Map Embed (Centred at Mischief Mall, K S Rao Road, Mangaluru)
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.704205561005!2d74.84279767507452!3d12.868778687437703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4b7f837c35%3A0x7d0ea4689cf6d5cf!2sMischief%20Mall!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

  // Pricing & Positioning
  priceRange: "₹200–₹400 per person",
  timingsNotice: "Contact us for current dining & delivery timings",

  // Key Amenities & Highlights
  highlights: [
    {
      title: "Authentic Flavours",
      description: "Discover a variety of satisfying dishes and authentic flavours crafted with passion.",
      badge: "Authentic Recipes",
    },
    {
      title: "A Warm Ambience",
      description: "Enjoy a welcoming atmosphere for everyday meals, family gatherings, and special moments.",
      badge: "Royal Setting",
    },
    {
      title: "Convenient Dining",
      description: "Visit us at Mischief Mall with ample parking or explore our prompt home delivery options.",
      badge: "Parking & Delivery",
    },
  ],

  // Supplied Review Reference Data
  reviewsData: {
    title: "Rated by Diners Across Multiple Platforms",
    subtitle: "Real dining satisfaction from food lovers across Mangaluru.",
    note: "Ratings compiled from verified public platform records.",
    platforms: [
      {
        name: "Zomato",
        rating: 4.2,
        maxRating: 5.0,
        count: "44 reviews",
        badge: "Top Rated",
        color: "#E23744",
      },
      {
        name: "Swiggy",
        rating: 4.0,
        maxRating: 5.0,
        count: "643 reviews",
        badge: "Customer Favorite",
        color: "#FC8019",
      },
      {
        name: "Justdial",
        rating: 3.9,
        maxRating: 5.0,
        count: "254 votes",
        badge: "Verified Local",
        color: "#F4B24D",
      },
    ],
  },
};

/**
 * 14. MENU - EXTERNAL PAGE ONLY
 * Centralized configuration variable.
 * Must point to an external menu URL.
 */
export const MENU_URL: string = "REPLACE_WITH_ACTUAL_EXTERNAL_MENU_URL";

export const isMenuUrlConfigured = (): boolean => {
  return MENU_URL !== "REPLACE_WITH_ACTUAL_EXTERNAL_MENU_URL" && (MENU_URL as string).trim().length > 0;
};
