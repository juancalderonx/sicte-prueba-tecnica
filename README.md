# Prueba técnica SICTE
CRUD de empleados/personal. En este repositorio encontraremos tanto el Backend como el Frontend.

## Tecnologías usadas.

Frontend
1. Vue
2. Quasar

Backend
1. NestJS
2. Docker

## Development steps

1. Clonar el proyecto con el comando:
    ```
    git clone https://github.com/juancalderonx/sicte-prueba-tecnica.git
    ```  

2. Ejecute el comando:
    ```
    yarn install
    ```

3. Clone el archivo ```.env.template``` y renombrarlo a ```.env```

4. Cambiar las variables de entorno.

5. Levantar la base de datos con el siguiente comando:
   
    ```
    docker-compose up -d
    ``` 

6. Levantar la aplicación con:
    ```
    yarn start:dev
    ```
    
---

# Modelado de Bases de Datos

La base de datos es muy sencilla, sin embargo, el CRUD en sí, el proyecto en sí se puede llegar a escalar mucho, podemos realmente normalizar mucho más la información de nuestras tablas, pero para mantenerlo sencillo por ahora, se usó un diagrama básico.

![image](https://user-images.githubusercontent.com/93611614/220108735-43ce86d1-9da6-4a01-b516-0d078407d92c.png)

