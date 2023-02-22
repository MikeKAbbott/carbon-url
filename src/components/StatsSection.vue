<template>
  <div
    v-for="(stat, index) in stats"
    :key="`stat_${index}`"
  >
    <StatsCard
      class="mb-4"
      :item="stat"
    />
    <Divider
      v-if="index < stats.length - 1"
      class="mb-4"
    />
  </div>
</template>

<script>
import Divider from '@/components/Divider';
import StatsCard from '@/components/StatsCard';

export default {
  name: 'StatsSection',

  components: {
    Divider,
    StatsCard,
  },

  props: {
    stats: {
      required: true,
      type: Array
    },
  }
}
</script>