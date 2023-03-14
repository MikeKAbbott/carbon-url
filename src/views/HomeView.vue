<template>
  <div
    class="home-view grid"
  >
    <HeaderSection
      :tab-url="tabUrl"
    />
    <div
      v-if="!isLoading"
      class="px-4"
    >
      <OverallSection
        :item="carbonData"
      />
      <Divider
        class="mb-4" 
      />
      <StatsSection
        :stats="stats"
      />
    </div>
    <div
      v-else
      class="break-all grid place-items-center text-center px-4"
    >
      {{ hasError ? 'Could Not Load Stats For' : 'Fetching Stats For' }}:
      <div>
        {{ tabUrl }}
      </div>
      <ProgressCircle
        v-if="isLoading"
        class="mt-2"
      />
    </div>   
  </div>
</template>

<script>
import CarbonWebsite from '@/api/CarbonWebsite';
import Divider from '@/components/Divider';
import HeaderSection from '@/components/HeaderSection';
import OverallSection from '@/components/OverallSection';
import ProgressCircle from '@/components/ProgressCircle';
import StatsSection from '@/components/StatsSection';

export default {
  name: 'HomeView',

  components: {
    Divider,
    HeaderSection,
    OverallSection,
    ProgressCircle,
    StatsSection,
  },

  data() {
    return {
      carbonData: null,
      hasError: null,
      isLoading: false,
      tabUrl: null,
    }
  },

  async created() {
    this.isLoading = true;
  
    await chrome.tabs.query({currentWindow: true, active: true}, async (tabs) => {
      this.tabUrl = new URL(tabs[0].url);

      try {
        this.carbonData = await new CarbonWebsite().get(this.tabUrl);
      } catch (e) {
        this.hasError = true;
      } finally {
        this.isLoading = false;
      }
    });
  },

  computed: {
    /** @type {array} */
    stats() {
      if (this.carbonData == null) {
        return [];
      }

      const { gridCo2, renewableCo2 } = this.carbonData;

      const renewablePercentage = (renewableCo2 + gridCo2 / renewableCo2) * 10;
      const gridPercentage = (renewableCo2 + gridCo2 / gridCo2) * 10;

      return [
        {
          grade: this.carbonData.cleanerThanGrade(),
          progress: `${this.carbonData.cleanerThan}%`,
          text: `Cleaner Than ${this.carbonData.cleanerThan}% Of Tested Websites`,
          tooltip: 'Graded on the percentage of tested resources this is cleaner than based of the co2 value',
        },
        {
          grade: this.carbonData.energyGrade(),
          progress: `${this.carbonData.energyUsage * 1000}%`,
          text: `It Took ${this.carbonData.energyUsage} Kilowatts To Load This Page`,
          tooltip: 'Graded on the amount of energy transferred on each page load in KW',
        },
        {
          grade: this.carbonData.renewableGrade(),
          progress: `${renewablePercentage}%`,
          text: `${renewableCo2}g (CO2) Of This Page Is From Renewable Energy`,
          tooltip: 'Graded on the amount of CO2 transferred on each page load in grams coming from a renewable resource',
        },
        {
          grade: this.carbonData.gridGrade(),
          progress: `${gridPercentage}%`,
          text: `${gridCo2}g (CO2) Of This Page Is From A National Grid`,
          tooltip: 'Graded on the amount of CO2 transferred on each page load in grams coming from a national grid',
        },
      ];
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Outfit&display=swap');
.home-view {

  font-family: 'Outfit', sans-serif;
  letter-spacing: 2px;
}
</style>