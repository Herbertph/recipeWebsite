<template>
    <header class="bg-[#F3E4D7] text-[#3B2F2F] px-6 py-4 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center justify-between relative">
        
        <RouterLink
  to="/"
  class="font-bold text-xl md:text-2xl tracking-wide absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 whitespace-nowrap"
>
  Grandma's Kitchen
</RouterLink>
  
        <nav class="space-x-6 hidden md:block ml-auto">
          <RouterLink to="/" class="hover:underline">Home</RouterLink>
        </nav>
        
      </div>
    </header>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  </script>
  