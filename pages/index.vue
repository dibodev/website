<template>
  <div>
    url: {{ app.url }}
    <Landing />
    <div class="flex flex-col items-center justify-center gap-3 p-4">
      <MyComponent />
      <a
        href="/"
        class="gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
        data-v-bc8852ab=""
      >Go back home</a>
      <TextField />
      <form>
        <select v-model="locale">
          <option value="en">
            en
          </option>
          <option value="fr">
            fr
          </option>
        </select>
        <p>{{ $t('welcome') }}</p>
        <p>{{ $t('change_language') }}</p>
      </form>
      <ButtonLink to="/pinia">
        Pinia
      </ButtonLink>
      <ButtonLink to="/i18n">
        I18N
      </ButtonLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import TextField from '~/components/fields/TextField.vue'
import Landing from '~/components/sections/Landing.vue'
import ButtonLink from '~/components/ui/ButtonLink.vue'

const { locale } = useI18n()
const app = useAppConfig()
</script>
