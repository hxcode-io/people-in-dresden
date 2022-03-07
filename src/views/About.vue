<template>
  <transition name="fade">
    <div class="modal fixed max-h-full h-full w-full top-0 left-0 bg-gray-100 z-50 overflow-y-scroll">
      <div class="flex justify-end items-center p-4 absolute right-2 top-2">
        <div class="modal-close cursor-pointer z-50" @click="closeModal">
          <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
            <path d="M8 8L40 40" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 40L40 8" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="container min-h-full w-full bg-white mx-auto" style="max-width: 1280px">
        <div class="px-8 md:px-24 xl:px-44 py-0 text-gray-700 border-t-8 border-dd" style="line-height: 32px;">
          <div class="whitespace-pre-line" v-if="lang === 'de'">
            <p>
              People in Dresden entstand in den ersten Monaten der Pegida-Bewegung (Patriotische Europäer gegen die Islamisierung des Abendlandes) im Jahr 2015. Die Mitglieder von International Friends, einer Facebook-Gruppe von Expats und Deutschen, die sich auch im realen Leben trafen, wollten eine Antwort auf die von ihnen als aggressiv empfundene fremdenfeindliche Atmosphäre in der Stadt finden. Sophie Logan (eine amerikanische Austauschstudentin) schlug das Format von Humans of New York vor - Interviews und Fotos von (neuen und alten) Dresdnern, die auf Facebook gepostet werden. Wie die Posts von Humans of New York sollten die Interviews den Leser jeden Tag mit einer anderen Person bekannt machen. Diese Porträts, sowohl in New York als auch in Dresden, öffneten ein Fenster in das Leben einer Person, die der Leser sonst nie kennenlernen würde, und machten so die Fremden, die wir jeden Tag sehen, menschlicher und schufen ein größeres Gefühl der Empathie mit unseren Mitbürgern.
            </p>
            <p>
              Dass Empathie in Dresden eine besondere politische Dimension hat, wurde kurz darauf während der sogenannten Flüchtlingskrise deutlich. Als Tausende von Asylsuchenden aus islamischen Kriegsländern wie Syrien, Afghanistan und dem Irak nach Europa strömten, spaltete sich die Bevölkerung Dresdens in diejenigen, die die Neuankömmlinge als Invasoren - wie Pegida sie sich ausmalte - und diejenigen, die sie als hilfsbedürftige Menschen ansahen. Im Jahr 2015 sprach Sophie zusammen mit dem Fotografen Robert Löbel und verschiedenen Mitgliedern von International Friends mit Menschen auf Anti-Pegida-Kundgebungen, in Flüchtlingslagern und auf den Straßen Dresdens und fotografierte sie.
            </p>
            <p>
              Als Sophie in die USA zurückkehrte, übernahm Sasa Mendez die Rolle der Hauptinterviewerin, und Jessica Buskirk stieß später als Interviewerin und Übersetzerin zum Team. Als Sasa 2019 beschloss, sich aus dem Projekt zurückzuziehen, übernahm Jessica alle Interviewaufgaben. Sechs Jahre lang dokumentierte "Menschen in Dresden" die Organisationen und Initiativen, die Flüchtlinge willkommen hießen, sprach aber auch gelegentlich mit Pegida-Mitgliedern. Das Projekt konzentrierte sich aber nicht nur auf die Ankunft von Flüchtlingen. Jedes Gespräch wurde als Versuch verstanden, den Gesprächspartner als Individuum kennen zu lernen. Bestimmte Themen kehrten jedoch immer wieder. Fremdenfeindlichkeit tauchte in den Gesprächen mit den Ausländern häufig auf, aber auch die Vorzüge Dresdens als mittelgroße Stadt mit Naturnähe und einem lebendigen Kulturleben. Künstler und Sozialarbeiter beklagten sich gleichermaßen über den Mangel an Ressourcen für ihre Projekte. Studenten erzählten uns von ihren Plänen für die Zukunft. Deutsche der älteren Generation reflektierten über ihre Erfahrungen mit der Wiedervereinigung und darüber, wie sich ihr Leben zum Guten oder Schlechten verändert hat.
            </p>
            <p>
              Manchmal wurden wir eingeladen, Organisationen oder Veranstaltungen zu besuchen, aber im Großen und Ganzen suchten wir uns die Menschen, mit denen wir sprachen, nicht aus. In der Regel gingen wir mit einem Aufnahmegerät und einer Kamera auf die Straße und baten die Menschen um ein Interview. "Hallo, wir sind von People in Dresden. Wir interviewen Menschen in Dresden und stellen jeden Tag ein Interview mit einem Bild ins Internet." Die meisten der Menschen, die sich bereit erklärten, mit uns zu sprechen, kamen aus anderen Orten - in Deutschland und aus dem Ausland - und wollten über ihre Erfahrungen mit und in der Stadt berichten. Einerseits war dies symptomatisch für Dresden als eine Stadt im Wandel, die Neuankömmlinge aus der ganzen Welt willkommen heißt. Andererseits deutet es auf eine Grundstimmung des Misstrauens unter den Dresdnern hin. Aus welchen Gründen auch immer - dem Rechtsdrall der Bürger, die die Medien als "Lügenpresse" betrachten, dem postkommunistischen Zynismus gegenüber sozialen Aktivitäten im öffentlichen Raum oder einfach einer tief sitzenden Miesepetrigkeit - war Dresden nicht der einfachste Ort, um ein Projekt wie das unsere zu verwirklichen.  Umso erfreulicher ist die Tatsache, dass wir in der Lage waren, bis zur Pandemie jeden Tag ein Interview zu veröffentlichen und die Verbindungen und Beziehungen in der Stadt zu knüpfen, die wir aufgebaut haben. Wir hoffen, dass unsere Arbeit in diesen Jahren als Oral History eines Moments in der Geschichte Dresdens und Deutschlands dienen kann und den Lesern einige der wunderbaren Menschen vorstellt, die wir getroffen haben.
            </p>
            <p>
              Website ist realisiert und gesponsert von <a href="https://hxcode.io" target="_blank">HxCode</a>
            </p>
          </div>
          <div class="whitespace-pre-line" v-else>
            <p>
              People in Dresden originated during the first months of the Pegida movement (Patriotic Europeans Against the Islamization of the Occident) in 2015. Members of International Friends, a Facebook group of ex-pats and Germans that also met up in real life, wanted to formulate a response to what they perceived as an aggressively xenophobic atmosphere in the city, and Sophie Logan (an American exchange student) suggested the format of Humans of New York – interviews and photos of Dresdeners (both new and old) posted on Facebook. Like the posts of Humans of New York, the interviews were intended to introduce the reader to a different individual each day. These portraits, in New York and in Dresden, opened a window into the life of a person whom the reader would never meet, thereby humanizing the strangers we see every day and creating a greater sense of empathy with our fellow city residents.
            </p>
            <p>
              The fact that empathy had an especially political dimension in Dresden became clear later that year during the so-called refugee crisis. As thousands of asylum-seekers streamed into Europe from war-torn Islamic countries like Syria, Afghanistan, and Iraq, the population of Dresden was split between those who saw the new arrivals as invaders – as Pegida envisioned them – and those who saw them as people in need of help. In 2015, Sophie, together with photographer Robert Löbel and various members of International Friends, talked to and photographed people at anti-Pegida rallies, refugee camps, and on the streets of Dresden.
            </p>
            <p>
              When Sophie returned to the US, Sasa Mendez took over as the main interviewer, and Jessica Buskirk later joined the team as interviewer and translator. When Sasa decided to withdraw from the project in 2019, Jessica took over all of the interviewing duties. Over the course of six years, People in Dresden documented the organizations and initiatives that welcomed refugees, but also spoke to Pegida members on occasion. The project did not just focus on the arrival of refugees, however. Every conversation was approached as an attempt to get to know the interviewee as an individual. Certain themes returned again and again, however. Xenophobia often surfaced in conversations with foreigners but so did Dresden’s advantages as a medium-sized city with proximity to nature and a lively cultural life. Artists and social workers alike complained about the lack of resources for their projects. Students told us about their plans for the future. Germans of an older generation reflected on their experience of the reunification and how their lives changed for the better or worse.
            </p>
            <p>
              Sometimes, we were invited to visit organizations or events, but by and large we didn’t choose the people to whom we talked. Usually, we went out on the street, with a recording device and a camera and asked people for an interivew. “Hi, we are from People in Dresden. We interview people in Dresden and post an interview with a picture on the internet each day.” Most of the people who agreed to talk to us were from other places in Germany and beyond, who wanted to reflect on their experience of and in the city. On the one hand, this was symptomatic of Dresden as a city in flux, welcoming new arrivals from the around the globe. On the other, it is suggestive of a basic atmosphere of mistrust among the natives of Dresden. For whatever reason – the rightward bent of the citizens who see the media as “Lügenpresse” or post-Communist cynicism about social activities in the public space or just a deep-seated grouchiness – Dresden was not the easiest place to carry out a project like ours.  So, the fact that we were able to post an interview every day until the pandemic and were able to make the connections and forge the relationships in the city we did is all the more edifying. We hope that our work during these years can serve as an oral history of a moment in Dresden’s, and Germany’s, history, in addition to introducing readers to some of the wonderful people we met.
            </p>
            <p>
              Website is realized and sponsored by <a href="https://hxcode.io" target="_blank">HxCode</a>
            </p>
          </div>
          <div class="pb-20 flex justify-between items-center text-gray-400">
              <span class="cursor-pointer" @click="closeModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
              </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
export default {
  beforeRouteLeave(to, from, next) {
    document.body.classList.remove('overflow-hidden');
    next();
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },
  methods: {
    closeModal() {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
