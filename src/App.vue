<template>
  <div>
    <div v-if="banner" class="mb-16 border-b-8 border-dd" :style="bannerStyle">
      <div class="overlay bg-black z-10 absolute top-0 opacity-20 h-full w-full -mt-2"></div>
      <div class="header-content absolute top-0 w-full h-full z-20">
        <div class="header-logo flex flex-col justify-center items-center h-full -mt-12">
          <div class="w-full bg-black bg-opacity-60">
            <div class="text-white font-marc text-center header-title" ref="headerTitle">
              People in Dresden
            </div>
            <div class="flex justify-center mb-8">
              <div class="bg-gray-200 rounded font-marc text-center px-12 py-1 mt-6 header-subtitle">
                Stories from the city of Dresden
              </div>
            </div>
          </div>
        </div>
        <div class="header-navigation flex justify-center items-center absolute bottom-5 w-full">
          <div class="bg-white hover:bg-dd cursor-pointer h-12 w-12  flex items-center justify-center rounded-full " @click="scroll">
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.83265 12.5968L0.343249 3.1073C-0.114417 2.64963 -0.114417 1.90764 0.343249 1.45003L1.45004 0.343238C1.90692 -0.113646 2.6474 -0.114526 3.10536 0.341285L10.6613 7.86184L18.2172 0.341285C18.6752 -0.114526 19.4157 -0.113646 19.8725 0.343238L20.9793 1.45003C21.437 1.90769 21.437 2.64968 20.9793 3.1073L11.49 12.5968C11.0323 13.0544 10.2903 13.0544 9.83265 12.5968Z" fill="#333333"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="fixed-nav fixed z-50 top-0 w-full bg-white" v-if="fixedHeader">

        <div class="flex justify-between container mx-auto sm:px-12 px-6 sm:py-0 py-2">
          <div class="font-marc font-bold items-center flex md:w-1/3">
            <button class="btn font-bold uppercase" @click="goToAbout">
              About
            </button>
          </div>
          <div ref="title" class="hidden lg:block md:w-1/3">
            <h1 class="text-center ">People in Dresden</h1>
          </div>
          <div class="flex items-center justify-end md:w-1/3">
            <div class="mr-3">
              <button @click="filterOpen =! filterOpen"
                      class="btn rounded uppercase font-bold flex items-center" 
                      :class="filterOpen ? 'btn-dd' : ''">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z"/></svg>
                <span class="pl-1" v-if="yearsFilter.length > 0 || monthsFilter.length > 0">
                  ({{yearsFilter.length + monthsFilter.length}})
                </span>
              </button>
            </div>
            <div class="language font-marc">
              <button class="btn rounded-l transition-all font-bold" :class="lang === 'en' ? 'btn-dd' : ''" @click="switchEnglish">
                EN
              </button>
              <button class="btn rounded-r transition-all font-bold" :class="lang === 'de' ? 'btn-dd' : ''" @click="switchGerman">
                DE
              </button>
            </div>
          </div>
        </div>
        <!-- <transition name="fade" mode="in-out"> -->
          <div class="bg-gray-100 filter-container" v-if="filterOpen">
            <div class="border-t-8 border-dd mx-auto container px-12 py-6 h-full bg-white">
              <div class="mb-6">
                <span>{{ ids.length }}</span>
                <i18n :en="' Entries'" :de="' Einträge'"/>
              </div>
              <div class="year-filter mb-6">
                <div class="flex items-center">
                  <h2 class="font-bold uppercase mr-3">
                    <i18n :en="'Year'" :de="'Jahr'"/>
                  </h2>
                  <a class="text-dd text-sm cursor-pointer" 
                      v-if="yearsFilter.length > 0"
                      @click="resetYears">
                    <i18n :en="'Remove filter'" :de="'Jahresfilter löschen'"/>
                  </a>
                </div>
                <div class="year-buttons">
                  <button class="btn" 
                          v-for="(year, index) in years" :key="index"
                          :class="{
                            'rounded-l': index===0, 
                            'rounded-r': index===years.length-1,
                            'btn-dd': yearsFilter.includes(year) 
                          }"
                          @click="toggleYear(year)">
                    {{year}}
                  </button>
                </div>
              </div>
              <div class="month-filter">
                <div class="flex items-center">
                  <h2 class="font-bold uppercase mr-3">
                    <i18n :en="'Month'" :de="'Monat'"/>
                  </h2>
                  <a class="text-dd text-sm cursor-pointer"
                     v-if="monthsFilter.length > 0"
                     @click="resetMonths">
                    <i18n :en="'Remove filter'" :de="'Monatsfilter löschen'"/>
                  </a>
                </div>                
                <div class="month-buttons">
                  <button class="btn" 
                          v-for="(month, index) in months" :key="index"
                          :class="{
                            'rounded-l': index === 0,
                            'rounded-r': index === months.length-1,
                            'btn-dd': monthsFilter.includes(month) 
                          }"
                          @click="toggleMonth(month)">
                    {{lang === 'en' ? monthsEN[month] : monthsDE[month]}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        <!-- </transition> -->
      </div>
    </transition>
    <div class="container puffer mx-auto px-12" ref="container">
      <vue-masonry-wall v-if="showMasonry" :key="masonryKey" :items="items" :options="options" @append="append">
        <template v-slot:default="{item}">
          <interview-card :interview="item" @click="openModal(item)"/>
        </template>
      </vue-masonry-wall>
      <div class="pt-32 flex justify-center text-xl" v-if="items.length === 0">
        <i18n en="No Entries available" de="Keine Einträge vorhanden" />
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall";
import InterviewCard from "@/components/InterviewCard";
import I18n from "@/components/I18n";

export default {
  name: 'Home',
  components: {
    VueMasonryWall, InterviewCard, I18n
  },
  data() {
    return {
      bannerStyle: {
        'height': '100vh',
        backgroundImage: `url('./kulturpalast.jpeg')`,
        backgroundSize: 'cover',
        display: 'block'
      },
      banner: true,
      fixedHeader: false,
      headerObserver: undefined,
      options: {
        width: 400,
        padding: {
          default: 35,
          1: 30
        },
      },
      showMasonry: false,
      masonryKey: 0,
      running: true, // initial value is 'true', this prevents a call from masonry component before mounted is called
      filterOpen: false,
      years: [2022, 2021, 2020, 2019, 2018, 2017, 2016],
      months: [0,1,2,3,4,5,6,7,8,9,10,11],
      monthsEN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsDE: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    }
  },
  computed: {
    lang() { return this.$store.state.lang },
    yearsFilter() { return this.$store.state.yearsFilter },
    monthsFilter() { return this.$store.state.monthsFilter },
    ids() { return this.$store.state.ids },
    idsDirty() { return this.$store.state.idsDirty },
    items() { return this.$store.state.items }
  },
  watch: {
    filterOpen(newVal) {
      if (newVal) {
        document.documentElement.classList.add('overflow-hidden')
      } else {
        document.documentElement.classList.remove('overflow-hidden')
      }
    },
    yearsFilter() { this.applyFilter(); },
    monthsFilter() { this.applyFilter(); }
  },
  mounted() {
    console.log("Mounted app")
    this.showMasonry = true;
    this.running = false;
    this.append();
    this.observeHeader();
    document.addEventListener('keyup', (e) => {
      if (e.code === "Escape") {
        if (this.$router.currentRoute.name !== "Home") {
          this.$router.push('/');
          return;
        }
        if (this.filterOpen) {
          this.filterOpen = false;
        }
      }
    });
    this.$plausible.trackPageview();
    setInterval(() => {
      this.$store.dispatch('tick');
    }, 100)
  },
  methods: {
    append() {
      this.$store.dispatch('append');
    },
    openModal(interview) {
      if (this.filterOpen) this.filterOpen = false;
      console.log("Open modal ", interview)
      document.body.classList.add('overflow-hidden')
      this.$router.push('/interview/' + interview.id);
      this.$plausible.trackPageview();
    },
    goToAbout() {
      console.log("Go to about")
      document.body.classList.add('overflow-hidden')
      this.$router.push('/about');
      this.$plausible.trackPageview();
    },
    switchGerman() {
      this.$store.commit('switchGerman')
    },
    switchEnglish() {
      this.$store.commit('switchEnglish')
    },
    scroll() {
      const element = this.$refs["container"];
      element.scrollIntoView({behavior: "smooth"});
    },
    toggleFixedHeader(value) {
      this.fixedHeader = value;
    },
    observeHeader() {
      this.headerObserver = new IntersectionObserver(
          (entry) => {
            this.toggleFixedHeader(!entry[0].isIntersecting)
          }, {rootMargin: '50%', threshold: .1}
      )
      this.headerObserver.observe(this.$refs['headerTitle']);
    },
    toggleYear(year) {
      this.$store.commit('toggleYear', year);
    },
    toggleMonth(month) {
      this.$store.commit('toggleMonth', month);
    },
    resetYears() {
      this.$store.commit('resetYears');
    },
    resetMonths() {
      this.$store.commit('resetMonths');
    },
    applyFilter() {
      console.log("applyFilter")
      this.showMasonry = false;
      this.masonryKey = this.masonryKey + 1; // New key means recreate the vue component
      this.scroll();
      this.showMasonry = true;
    }
  }
}
</script>

<style lang="scss">

.btn {
  @apply py-2 px-4 bg-gray-100 h-10;
}
.btn:hover:not(.btn-dd) {
  @apply bg-gray-300;
}
.btn-dd {
  @apply bg-dd text-black;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.navigation-group {
  font-size: 36px;
  color: white;
  @apply py-2 px-4 rounded hover:text-dd;
}

.header-title {
  font-size: 100px;
  line-height: 7rem;
}

.header-subtitle {
  font-size: 36px;
}

.filter-container {
  height: 75vh;
}

@media (max-width: 1024px) {
  .header-title {
    font-size: 60px;
    line-height: 5rem;
  }
  .header-subtitle {
    font-size: 24px;
  }
}
@media (max-width: 640px) {
  .header-title {
    font-size: 40px;
    line-height: 3rem;
  }
  .header-subtitle {
    font-size: 18px;
  }
  .filter-container {
    height: 100vh;
  }
}

.year-buttons, .month-buttons {
  .btn {
    margin-bottom: 2px;
  }
}

.puffer {
  min-height: 120vh;
}
</style>
