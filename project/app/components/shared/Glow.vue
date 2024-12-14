<template>
  <div class="relative inline-flex group">
    <div
      class="absolute opacity-0 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg transition-all duration-300 group-hover:opacity-70 group-hover:-inset-1"
    />
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
