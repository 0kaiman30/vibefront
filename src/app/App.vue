<script setup lang="ts">
import AppHeader from "@/widgets/Header/ui/AppHeader.vue";
import AppFooter from "@/widgets/Footer/ui/AppFooter.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const showFooter = computed(() => route.path !== "/chat");
</script>

<template>
  <AppHeader />
  <router-view />
  <AppFooter v-if="showFooter" />
</template>
