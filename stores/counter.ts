export const useCounter = defineStore('counter', {
  state: () => ({
    n: 2,
    incrementedTimes: 0,
    decrementedTimes: 0,
    numbers: [] as number[]
  }),

  getters: {
    double: state => state.n * 2
  },

  actions: {
    increment (amount = 1) {
      this.incrementedTimes++
      this.n += amount
    },

    changeMe () {
    },

    decrementToZero () {
      if (this.n <= 0) { return }

      while (this.n > 0) {
        this.$patch((state) => {
          state.n--
          state.decrementedTimes++
        })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounter, import.meta.hot))
}
