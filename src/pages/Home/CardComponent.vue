<template>
  <q-card class="my-card col-12">
    <!-- <q-card-section class=" text-white"> -->
       <q-card-section :class="color + ' text-white'">
      <div class="text-h4 text-center">{{information}}</div>
      <div class="text-subtitle1 text-center">{{title}}</div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: 'CardComponent',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    information: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
    },
  },
};
</script>
