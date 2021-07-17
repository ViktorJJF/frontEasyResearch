<template>
  <div>
    <v-card>
      <v-container>
        <h1>Taxonomía de Bloom</h1>
        <p>
          Se refiere a la capacidad de recordar hechos específicos y universales, métodos y procesos,
          esquemas, estructuras o marcos de referencia sin elaboración de ninguna especie, puesto que
          cualquier cambio ya implica un proceso de nivel superior.
        </p>
        <v-img :src="imgSrc" aspect-ratio="1.7" contain></v-img>
        <h1>Tips para terminar la tesis</h1>

        <ol>
          <li>
            <h3>No le des más vueltas y delimita tu tema de tesis:</h3>
          </li>
          <p>Pude que se te ocurran muchas ideas nuevas e interpretaciones del tema de tu tesis, pero si no delimitas el tema lo más pronto posible, terminarás nadando en un mar de nuevas posibilidades que solo retrasarán más tu trabajo. Así que pídele ayuda a tu asesor de tesis para delimitar el tema lo más pronto posible.</p>
          <li>
            <h3>No esperes a tener grandes ideas para iniciar:</h3>
          </li>
          <p>No esperes a tener ideas innovadoras y creativas antes de iniciar, es mejor ponerse a la marcha primero, las grandes ideas llegarán en el camino y podrá emplearlas en el mejor momento.</p>
          <li>
            <h3>No es necesario empezar por la introducción:</h3>
          </li>
          <p>No es necesario empezar por el párrafo de inicio, ya que posiblemente nos tardemos mucho encontrando la introducción perfecta. Cuando hayas desarrollado todo el cuerpo de la investigación, te será más fácil escribir una introducción interesante que despierte la curiosidad del lector.</p>
          <li>
            <h3>Empieza un plan de búsqueda de fuentes de información:</h3>
          </li>
          <p>La fase de investigación puede ser muy extensa si no se tienes claro por dónde empezar. Es recomendable tomar un tiempo para realizar un plan de búsqueda, consultando en páginas online los lugares por donde podrías empezar y terminar, asegurando que tus visitas a bibliotecas o entrevistas con especialistas no tengan pierde.</p>
        </ol>
        <h1>A tener en cuenta si eres de ingeniería</h1>
        <p>Si eres de ingenieria, el alumno quiere crear, lo cual implica analizar, diseñar e implementar (tambien le ponen desarrollar)</p>
        <p>
          Tu creas, pero desarrollando la investigación con otro tesista y dándole enfoques para la tesis (Por ejemplo uno enfoca su tesis en el diseño y el otro enfoca su tesis
          en la implementación)
          <ul>
            <li>o bien creas</li>
            <li>o bien evaluas, las cosas ya estan hechas. Por ejemplo la seguridad de los sistemas informáticos, la seguridad, etc. (Tesis descriptiva)</li>
          </ul>
        </p>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc:
        "https://leexonline.com/wp-content/uploads/Taxonomia-de-Bloom-web.jpg"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>