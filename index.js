const Counter = {
    data() {
      return{
        tareas: [],
        tareasTerminadas: [],
        descripcion : "",
        busqueda: "",
      }
    },
    mounted() {
        if (localStorage.tareas) {
          this.tareas = JSON.parse(localStorage.tareas)
        }
        this.tareasTerminadas = this.tareas
    },
    methods: {
      fechaActual(indice){
        f = new Date(this.tareas[indice].fecha_creacion);
        fechaActual = new Date().getTime() - f.getTime()
        return Math.round(fechaActual/60000)
      },
      actualiza_localstorage(){
        localStorage.tareas = JSON.stringify(this.tareas)
      },
      buscar(){
        this.tareasTerminadas = this.tareas.filter(tarea => tarea.descripcion.includes(this.busqueda))
      },
      insertar_tarea(){
        nuevaTarea = {descripcion: this.descripcion, fecha_creacion: new Date(), prioridad:0, completado: false}
        this.tareas.unshift(nuevaTarea)
        this.actualiza_localstorage()
        this.descripcion = ""
      },
      borrar(posicion){
        this.tareas.splice(posicion,1)
        this.actualiza_localstorage()
      },
      cambiar_estado(posicion){
        this.tareas[posicion].completado = !this.tareas[posicion].completado
        this.actualiza_localstorage()
      },
      borrarCompletadas(){
        this.tareas = this.tareas.filter(tarea => tarea.completado==false)
        this.tareasTerminadas = this.tareasTerminadas.filter(tarea => tarea.completado==false)
        this.actualiza_localstorage()
      },
      mostrarTerminadas(){
        this.tareasTerminadas = this.tareas.filter(tarea => tarea.completado == true)
        this.actualiza_localstorage()
      },
      mostrarSinTerminar(){
        this.tareasTerminadas = this.tareas.filter(tarea => tarea.completado == false)
        this.actualiza_localstorage()
      },
      mostrarTodas(){
        this.tareasTerminadas = this.tareas
        this.actualiza_localstorage()
      },
      
      prioridadAlta(posicion){
        this.tareas[posicion].prioridad = 0
        tarea = this.tareas.splice(posicion,1)   
        this.tareas.unshift(tarea[0])
        this.actualiza_localstorage()
      },
      prioridadMedia(posicion){
        this.tareas[posicion].prioridad = 1
        this.ordenar()
        this.actualiza_localstorage()
      },
      prioridadBaja(posicion){
        this.tareas[posicion].prioridad = 2
        tarea = this.tareas.splice(posicion,1)
        this.tareas.push(tarea[0])
        this.actualiza_localstorage()
      },
      ordenar(){
        this.tareasTerminadas.sort((a,b)=>{return a.prioridad-b.prioridad});
      }
      
    },
    computed: {
      tareaTerminada(){
        terminadas = 0
        for(tarea of this.tareas){
          if(tarea.completado == true)
            terminadas++
        }
        return terminadas
      }
    }
  }

  window.onload = () =>{
  Vue.createApp(Counter).mount('#app')}