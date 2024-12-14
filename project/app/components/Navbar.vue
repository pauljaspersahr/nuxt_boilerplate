<template>
  <nav class="hidden lg:flex">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            :class="navigationMenuTriggerStyle()"
            v-for="navigationItem in navigationItems"
            :key="navigationItem.title"
            :title="navigationItem.title"
            :href="navigationItem.href"
          >
            {{ navigationItem.title }}
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
import { navigationItems } from '~/config/navigation';
</script>
