import { MenuItem } from "../types";
export const RoutePaths = Object.freeze({
  ATTRIBUTE_TYPES_LISTING_SCREEN: "(dashboard)/attribute-types",
  RELATIONSHIP_TYPES_LISTING_SCREEN: "(dashboard)/relationship-types",
  AMENITIES_LISTING_SCREEN: "(dashboard)/amenities",
  CATEGORIES_LISTING_SCREEN: "(dashboard)/categories",
});

export const dashboardMenuitems: MenuItem[] = [
  {
    name: "Amenities",
    icon: { family: "MaterialCommunityIcons", name: "tournament" },
    route: RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "#0d6ceb",
  },
  {
    name: "Properties",
    icon: { family: "MaterialIcons", name: "apartment" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "gray",
  },
  {
    name: "Attributes Types",
    icon: { family: "MaterialCommunityIcons", name: "file-tree" },
    route: RoutePaths.ATTRIBUTE_TYPES_LISTING_SCREEN,
    color: "#e80909",
  },
  {
    name: "Relationship Types",
    icon: { family: "FontAwesome6", name: "sitemap" },
    route: RoutePaths.RELATIONSHIP_TYPES_LISTING_SCREEN,
    color: "#09e81f",
  },
  {
    name: "Categories",
    icon: { family: "MaterialIcons", name: "category" },
    route: RoutePaths.CATEGORIES_LISTING_SCREEN,
    color: "#c909e8",
  },

  {
    name: "Staff",
    icon: { family: "FontAwesome5", name: "users" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "orange",
  },
  {
    name: "Roles",
    icon: { family: "FontAwesome6", name: "user-shield" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "magenta",
  },
  {
    name: "Priviledges",
    icon: { family: "MaterialCommunityIcons", name: "security" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "#09b9e8",
  },
  {
    name: "Address book",
    icon: { family: "FontAwesome", name: "address-book" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "brown",
  },
  {
    name: "Reviews",
    icon: { family: "MaterialIcons", name: "reviews" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "pink",
  },
  {
    name: "Orders",
    icon: { family: "FontAwesome", name: "opencart" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "gold",
  },
  {
    name: "Payments",
    icon: { family: "MaterialIcons", name: "payment" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "skyblue",
  },
  {
    name: "Staff roles",
    icon: { family: "FontAwesome6", name: "users-gear" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "turquoise",
  },
  {
    name: "Listings",
    icon: { family: "FontAwesome6", name: "building-circle-check" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "aqua",
  },
  {
    name: "Scheduled visits",
    icon: { family: "Ionicons", name: "calendar" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "#e809df",
  },
  {
    name: "Subscriptions",
    icon: { family: "Foundation", name: "pricetag-multiple" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "#c1ff72",
  },
  {
    name: "Resources",
    icon: { family: "FontAwesome", name: "server" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "#38b6ff",
  },
];
