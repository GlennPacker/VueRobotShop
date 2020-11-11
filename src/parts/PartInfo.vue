<template>
  <div v-if="part">
    <h1>{{ part.title }}</h1>
    <div class="description">
      {{part.description}}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import robotPartLoaderMixin from './robotPartLoaderMixin';

export default {
  name: 'PartInfo',
  mixins: [robotPartLoaderMixin],
  props: {
    partType: { type: String },
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },
  },
  computed: {
    part() {
      const { partType, id, parts } = this;
      return parts && parts[partType].find(part => part.id === +id);
    },
  },
};
</script>
