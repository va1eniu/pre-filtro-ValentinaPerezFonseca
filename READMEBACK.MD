## Controladores 

### Obtener

Este controlador se encarga de obtener todos los clientes almacenados en la base de datos y enviarlos como respuesta en formato JSON.

### Agregar 

Endpoint: `POST 

Este controlador permite agregar un nuevo cliente a la base de datos. Se espera que los datos del cliente se proporcionen en el cuerpo de la solicitud en formato JSON.

### Borrar 

Este controlador permite eliminar un cliente de la base de datos según su ID.

### Actualizar 

Este controlador permite actualizar los datos de un cliente existente en la base de datos según su ID. Los nuevos datos deben proporcionarse en el cuerpo de la solicitud en formato JSON.

### Obtener 

Este controlador se encarga de obtener un cliente específico de la base de datos según su ID. Si el cliente no se encuentra, se responde con un código de estado 404.

## Modelo de Datos (models)


## Router

El router define las rutas y los controladores que se utilizan en la aplicación. Las rutas se relacionan con las funciones de los controladores de la siguiente manera:

- GET 
- POST 
- DELETE
- PATCH 
- GET 

## Base de Datos (database)

El archivo `conectarDB.js` contiene la configuración para conectar la aplicación a la base de datos MongoDB. Se utiliza el módulo `mongoose` para gestionar la conexión. La URL de conexión se obtiene de la variable de entorno `MONGO_URI`.

## Iniciar la Aplicación (app.js)

El archivo `app.js` inicia la aplicación. Carga la configuración de variables de entorno desde un archivo `.env`, crea una instancia del servidor y la pone en escucha para manejar las solicitudes entrantes.

Asegúrate de configurar correctamente las variables de entorno en el archivo `.env` antes de ejecutar la aplicación.

