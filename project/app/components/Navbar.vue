<template>
  <nav class="hidden lg:flex">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            v-for="navigationItem in navigationItems"
            :key="navigationItem.title"
            :title="navigationItem.title"
            :href="navigationItem.href"
            as-child
          >
            <Button class="mx-0.5" variant="ghostOutline" size="lg">{{
              navigationItem.title
            }}</Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </nav>
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { navigationItems } from '~/config/navigation';
</script>
