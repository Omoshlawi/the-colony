import { MenuItem } from "../types";
export const RoutePaths = Object.freeze({
  ATTRIBUTE_TYPES_LISTING_SCREEN: "(dashboard)/attribute-types",
  RELATIONSHIP_TYPES_LISTING_SCREEN: "(dashboard)/relationship-types",
  AMENITIES_LISTING_SCREEN: "(dashboard)/amenities",
  CATEGORIES_LISTING_SCREEN: "(dashboard)/categories",
});

export const dashboardMenuitems: MenuItem[] = [
  {
    name: "Attributes Types",
    icon: { family: "MaterialCommunityIcons", name: "file-tree" },
    route: RoutePaths.ATTRIBUTE_TYPES_LISTING_SCREEN,
  },
  {
    name: "Relationship Types",
    icon: { family: "FontAwesome6", name: "sitemap" },
    route: RoutePaths.RELATIONSHIP_TYPES_LISTING_SCREEN,
  },
  {
    name: "Categories",
    icon: { family: "MaterialIcons", name: "category" },
    route: RoutePaths.CATEGORIES_LISTING_SCREEN,
  },
  {
    name: "Amenities",
    icon: { family: "MaterialCommunityIcons", name: "tournament" },
    route: RoutePaths.AMENITIES_LISTING_SCREEN,
  },
  // {
  //   name: "Properties",
  //   icon: { family: "MaterialIcons", name: "apartment" },
  //   route: RoutePaths.AMENITIES_LISTING_SCREEN,
  // },
];
