const app = Vue.createApp({
  data() {
    return {
      title: "final eampire",
      author: 'brandon',
      age: 45,
      stores: [
        "london", "brampton", "exeter", "oakville"
      ]
    }
  },
  methods: {
    changeTitle() {

    }
  }
});

app.mount('#app');