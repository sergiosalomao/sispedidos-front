<template>
  <div class="row q-mb-lg">
    <div class="col-md-12">
      <div class="text-h6">{{title}}</div>
      <div class="text-subtitle1">{{subtitle}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TitleComponent',
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
};
</script>
