<template>
  <div class="flex flex-col items-center justify-center gap-3 p-4">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      Pinia
    </h1>

    <p data-testid="counter-values">
      Counter: {{ counter.n }}. Double: {{ counter.double }}
    </p>

    <p>Increment the Store:</p>

    <button data-testid="increment" @click="counter.increment()">
      +1
    </button>
    <button @click="counter.increment(10)">
      +10
    </button>
    <button @click="counter.increment(100)">
      +100
    </button>
    <button @click="counter.n++">
      Direct Increment
    </button>
    <button
      @click="
        counter.$patch((state) => {
          state.n++
          state.incrementedTimes++
        })
      "
    >
      Direct patch
    </button>

    <p>Other actions:</p>

    <button @click="counter.decrementToZero()">
      Decrement to zero
    </button>
    <button @click="counter.changeMe()">
      <code>counter.changeMe()</code>
    </button>
    <Select />

    <pre>{{ counter.$state }}</pre>
  </div>
</template>
<script setup lang="ts">
import Select from '~/components/fields/Select.vue'
import { useCounter } from '~/stores/counter'
const counter = useCounter()
</script>
