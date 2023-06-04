<template>
  <div>
    <Html :lang="lang" :dir="dir">
      <Head>
        <Title>{{ title }} | {{ app.name }}</Title>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body>
        {{ title }}
        <Navbar />
        <slot />
      </Body>
    </Html>
  </div>
</template>
<script setup lang="ts">
import type { ComputedRef } from 'vue'
import Navbar from '~/components/ui/Navbar.vue'

type Directions = 'ltr' | 'rtl' | 'auto';
interface LocaleObject {
    code: string;
    name?: string;
    dir?: Directions;
    domain?: string;
    file?: string;
    isCatchallLocale?: boolean;
    iso?: string;
}

/* HOOKS */
const { t, localeProperties } = useI18n()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})
const app = useAppConfig()

/* COMPUTED */
const _localeProperties = computed(() => localeProperties.value) as ComputedRef<LocaleObject>
const lang = computed(() => head.value.htmlAttrs?.lang || _localeProperties.value.iso || 'fr')
const dir = computed(() => head.value.htmlAttrs?.dir || _localeProperties.value.dir || 'ltr')
const title = computed(() => t('pages_tiles.home'))
</script>
