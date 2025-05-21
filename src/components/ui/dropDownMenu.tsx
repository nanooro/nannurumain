import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
export default function DropdownMenu({ className }) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
            <NavigationMenuLink href="/articleList">Articles</NavigationMenuLink>
            <NavigationMenuLink href="/about">About</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
