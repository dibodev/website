<template>
  <div class="flex flex-col items-center justify-center gap-3 p-4">
    <form>
      availableLocales: {{ availableLocales }}
      <select v-model="locale">
        <option value="en">
          en
        </option>
        <option value="fr">
          fr
        </option>
      </select>
      <p>{{ $t('city') }}</p>
    </form>

    <NuxtLink
      v-for="availableLocale in availableLocales"
      :key="availableLocale.code"
      :to="switchLocalePath(availableLocale.code)"
    >
      dispo: {{ availableLocale.code }}
    </NuxtLink>

    => link
    <NuxtLink :to="localePath('index')">
      {{ $t('welcome') }}
    </NuxtLink>
    switchLocalePath: {{ switchLocalePath('en') }}
    <NuxtLink :to="switchLocalePath('en')">
      English
    </NuxtLink>
    <NuxtLink :to="switchLocalePath('fr')">
      Français
    </NuxtLink>
    <NuxtLink :to="localePath('index', 'en')">
      Homepage in English
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const availableLocales = computed(() => {
  return (locales.value as {code: string}[]).filter(i => i.code !== locale.value)
})
</script>
