# redux-and-angular

# ReduxApp

# REDUX
**Es un patrón para el manejo de la infocmación**
***Permite mantener la información del estado de una aplicación en un solo lugar***
 1. Conocer el estado de la aplicación
 2. Como se encuentra determinada variable en la aplicación
 3. Quien cambio esa variable
 4. Como cambio la información
 5. En que momento cambio la información

## IDEAS A TENER EN CUENTA CON EL PATRÓN REDUX

**Toda la data de la aplicación se encuentra en una estructura previamente DEFINIDA**
**Toda la información se encontrara almacenada en un único lugar llamado STORE**
**El STORE jamas se mdofica de forma directa**
**Cualquier interacción del usuario o código dispara acciones que describen qué sucedió**
**El valor actual de la aplicación se llama estado - STATE**
**Un nuevo estado es creado, en base a la combinación del viejo estado y a una accion por función llamada REDUCER**

### STORE - STATE
**El STORE: Contiene todo la información de la aplicación. Y es un objeto que tienes las siguientes responsabilidades.**

*Responsabilidades del STORE*
1. Contiene el estado actual de la aplicación
2. Permite la lectura del estado via: [getState()]
3. Permite crear un nuevo estado utilizando: [dispatch(ACTION)]
4. Permite notificar los cambios via: [subcribe()]

*Reglas del STATE*
1. El STATE es de solo lectura
2. Nunca se mutará el state de forma directa
3. Hay funciones que estan prohíbidas de JavaScript. Como por ejemplo el [push] o manipular directamente el [oldState]


### ACTION
**Es la única fuente de información que se enía por interacciones de usuario o programa. Por lo general, se busa que las acciones sean lo más simple posibles.**

***Las acciones tienen unicamente dos propiedades.***
1. [type] que nos describe que es lo que quiere hacer o cual es la acción que se debe realizar. (Es obligatorio enviarlo)
2. [payload] Es opcional, es la menor cantidad posible de información para realizar la acción.

### REDUCER
**Es una función pura que únicamente recibe 2 argumentos y  siempre debe retorna un estado**
1. [oldState] es el estado actual de la aplicación
2. [action] es un objeto plano que indica qué hay que hacer 


### EFFECTS
**Los efectos una de sus funciones principales es escuchar acciones, acciones despachadas por ngrx/store**

**Simplificar la lógica en los componentes, para que queden lo mas sencillos posibles**

**Tambien se pueden comunicar fuera del ecosistema de angular (Http, Sockets o tareas asíncronas)**

***NO TODAS LAS ACCIONES DISPARAN EFECTOS***