import { MenuItem } from "../types";
export const RoutePaths = Object.freeze({
  ATTRIBUTE_TYPES_LISTING_SCREEN: "(dashboard)/attribute-types",
  RELATIONSHIP_TYPES_LISTING_SCREEN: "(dashboard)/relationship-types",
  AMENITIES_LISTING_SCREEN: "(dashboard)/amenities",
  CATEGORIES_LISTING_SCREEN: "(dashboard)/categories",
  PRIVILEGES_LISTING_SCREEN: "(dashboard)/privileges",
  ROLES_LISTING_SCREEN: "(dashboard)/roles",
  STAFF_ROLES_SCREEN: "(dashboard)/staff",
  RESOURCES_LIST_SCREEN: "(dashboard)/resources",
  APP_SERVICES_SCREEN: "(dashboard)/app-services",
  ADDRESS_BOOK_SCREEN: "(dashboard)/address-book",
  ORGANIZATION_PROPERTIES_SCREEN: "properties",
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
    route: RoutePaths.ORGANIZATION_PROPERTIES_SCREEN,
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
    name: "Unknown",
    icon: { family: "FontAwesome5", name: "users" },
    route: "", // RoutePaths.AMENITIES_LISTING_SCREEN,
    color: "turquoise",
  },
  {
    name: "Roles",
    icon: { family: "FontAwesome6", name: "user-shield" },
    route: RoutePaths.ROLES_LISTING_SCREEN,
    color: "magenta",
  },
  {
    name: "Priviledges",
    icon: { family: "MaterialCommunityIcons", name: "security" },
    route: RoutePaths.PRIVILEGES_LISTING_SCREEN,
    color: "#09b9e8",
  },
  {
    name: "Staff",
    icon: { family: "FontAwesome6", name: "users-gear" },
    route: RoutePaths.STAFF_ROLES_SCREEN,
    color: "orange",
  },
  {
    name: "Address book",
    icon: { family: "FontAwesome", name: "address-book" },
    route: RoutePaths.ADDRESS_BOOK_SCREEN,
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
    route: RoutePaths.RESOURCES_LIST_SCREEN,
    color: "#38b6ff",
  },
];
