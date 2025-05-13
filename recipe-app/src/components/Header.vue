<template>
    <header class="bg-[#F3E4D7] text-[#3B2F2F] px-6 py-4 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <RouterLink to="/" class="font-bold text-2xl tracking-wide">
          Grandma's Kitchen
        </RouterLink>
        <nav class="space-x-6 hidden md:block">
          <RouterLink to="/" class="hover:underline">Home</RouterLink>
         
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router'
  </script>
  