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
<!--          <div class="navigation-group font-marc md:block hidden">-->
<!--            <a href="">Team</a>-->
<!--          </div>-->
<!--          <div class="navigation-group font-marc md:block hidden">-->
<!--            <a href="">Presse</a>-->
<!--          </div>-->
          <div class="bg-white hover:bg-dd cursor-pointer h-12 w-12  flex items-center justify-center rounded-full " @click="scroll">
            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.83265 12.5968L0.343249 3.1073C-0.114417 2.64963 -0.114417 1.90764 0.343249 1.45003L1.45004 0.343238C1.90692 -0.113646 2.6474 -0.114526 3.10536 0.341285L10.6613 7.86184L18.2172 0.341285C18.6752 -0.114526 19.4157 -0.113646 19.8725 0.343238L20.9793 1.45003C21.437 1.90769 21.437 2.64968 20.9793 3.1073L11.49 12.5968C11.0323 13.0544 10.2903 13.0544 9.83265 12.5968Z" fill="#333333"/>
            </svg>
          </div>
<!--          <div class="navigation-group font-marc md:block hidden">-->
<!--            <a href="">Mission</a>-->
<!--          </div>-->
<!--          <div class="navigation-group font-marc md:block hidden">-->
<!--            <a href="">Stadt</a>-->
<!--          </div>-->
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="fixed-nav fixed z-50 top-0 w-full bg-white py-1" v-if="fixedHeader">
        <div class="flex justify-between container mx-auto px-12">
          <div class="font-marc font-bold items-center flex">
            <button class="btn font-bold uppercase" @click="goToAbout">
              About
            </button>
          </div>
          <div ref="title" class="hidden lg:block ml-16">
            <h1 class="text-center ">People in Dresden</h1>
          </div>
          <div class="flex items-center justify-end">
            <div class="font-marc mr-3">
              <button @click="filterOpen=!filterOpen"
                      class="btn rounded uppercase font-bold h-" 
                      :class="filterOpen?'btn-dd':''">
                <!-- <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.<path d="M96 32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32zM448 464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192H448V464z"/></svg> -->
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z"/></svg>
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
          <div class="bg-gray-100 filter-container mt-2 md:mt-0" v-if="filterOpen">
            <div class="border-t-8 border-dd mx-auto container px-12 py-6 h-full bg-white">
              <div class="mb-6">
                <I18n :en="'1534 Entries'" :de="'1534 Einträge'"/>
              </div>
              <div class="year-filter mb-6">
                <div class="flex items-center">
                  <h2 class="font-bold uppercase mr-3">
                    <I18n :en="'Year'" :de="'Jahr'"/>
                  </h2>
                  <a class="text-dd text-sm cursor-pointer" 
                      v-if="yearsFilter.length > 0"
                      @click="yearsFilter = []">
                    <I18n :en="'Remove filter'" :de="'Jahresfilter löschen'"/>    
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
                    <I18n :en="'Month'" :de="'Monat'"/>    
                  </h2>
                  <a class="text-dd text-sm cursor-pointer"
                     v-if="monthsFilter.length > 0"
                     @click="monthsFilter = []">
                    <I18n :en="'Remove filter'" :de="'Monatsfilter löschen'"/>    
                  </a>
                </div>                
                <div class="month-buttons">
                  <button class="btn" 
                          v-for="(month, index) in months" :key="index"
                          :class="{
                            'rounded-l': index===0, 
                            'rounded-r': index===months.length-1,
                            'btn-dd': monthsFilter.includes(month) 
                          }"
                          @click="toggleMonth(month)">
                    {{lang==='en'?monthsEN[month]:monthsDE[month]}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        <!-- </transition> -->
      </div>
    </transition>
    <div class="container mx-auto px-12" ref="container">
      <vue-masonry-wall :items="items" :options="options" @append="append">
        <template v-slot:default="{item}">
          <interview-card :interview="item" @click="openModal(item)"/>
        </template>
      </vue-masonry-wall>
    </div>
    <router-view/>
  </div>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall";
import {InterviewService} from "@/service/InterviewService";
import InterviewCard from "@/components/InterviewCard";
import I18n from "@/components/I18n";

const interviewService = new InterviewService();

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
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        backgroundSize: 'cover',
        // backgroundAttachment: 'fixed',
        display: 'block'
      },
      banner: true,
      fixedHeader: false,
      headerObserver: undefined,
      // sidebarOpen: false,
      options: {
        width: 400,
        padding: {
          default: 35,
          1: 30
        },
      },
      items: [],
      running: true, // initial value is 'true', this prevents a call from masonry component before mounted is called
      filterOpen: false,
      yearsFilter: [],
      monthsFilter: [],
      years: [2022, 2021, 2020, 2019, 2018, 2017, 2016],
      months: [0,1,2,3,4,5,6,7,8,9,10,11],
      monthsEN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsDE: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    }
  },
  computed: {
    lang() {
      return this.$store.state.lang
    }
  },
  mounted() {
    console.log("Mounted app")
    this.running = false;
    this.append();
    this.observeHeader();
    document.addEventListener('keyup', (e) => {
      if (e.code === "Escape" && this.$router.currentRoute.name !== "Home") {
        this.$router.push('/');
      }
    });
    this.$plausible.trackPageview();
  },
  methods: {
    append() {
      console.log("Append")
      if (this.running) return;
      this.running = true;
      var start = this.items.length;
      interviewService.getInterviews(start / 25, 25).then(interviews => {
        for (let i = 0; i < interviews.length; i++) {
          this.items.push(interviews[i])
        }
        this.running = false;
      });
    },
    openModal(interview) {
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
      if(this.yearsFilter.includes(year)) {
        const yearIndex = this.yearsFilter.findIndex(y => y === year);
        this.yearsFilter.splice(yearIndex, 1)
      } else {
        this.yearsFilter.push(year);
      }
    },
    toggleMonth(month) {
      if(this.monthsFilter.includes(month)) {
        const monthIndex = this.monthsFilter.findIndex(m => m === month);
        this.monthsFilter.splice(monthIndex, 1)
      } else {
        this.monthsFilter.push(month)
      }
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
</style>
