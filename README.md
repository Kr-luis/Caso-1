# Almacenamiento y Auntenticacion de Email en Firebase 🌍

> **Miembros**: Eduardo Caza y Mateo Alejandro Trabajo Grupal

Nos basamos en el link de ayuda para replicar el proyecto [Enlace de Guia](https://devdactic.com/ionic-firebase-auth-upload)

Contenido : Una aplicacion hecha con Ionic y Angular que esta usando la auntenticacion de correos de firebase y el cloud storage de firebase

> **Descarga la apk**: [Descargar archivo](https://github.com/Eduardo-Caza/Trabajo-Grupal-CG/blob/main/Trabajo-Grupal-CG.apk)

---

## Capturas de Pantalla 📸

### Enlace del funcionamiento en Youtube 

[Ver el video en YouTube](https://youtu.be/zonE0aNJBCc)


### Interfaz Principal

![image](https://github.com/user-attachments/assets/98312bb3-64af-42d5-9297-9b30bf5b3105)

### Auntenticacion


![image3](https://github.com/user-attachments/assets/c9bb035f-828c-4e1c-863b-1d92210f4e3f)

### Cloud Storage

![Ejemplo](https://github.com/user-attachments/assets/bb4f9829-b378-4e96-ae62-108ce5bb9b4d)

---

## Pasos a Seguir para configurar el Proyecto en Ionic 💻

1. Para crear el proyecto en IONIC usaremos el siguiente comando
   ```bash
   ionic start APLICACION blank --type=angular
2. Dentro de nuestro proyecto de ionic
   ```bash
   ionic g page login
   ionic g service services/auth
   ionic g service services/avatar
3. Y de paso instalamos los respectivos capacitadores 
   ```bash
   npm i @capacitor/camera
   npm i @ionic/pwa-elements
4. Y integramos firebase en nuestro proyecto 
   ```bash
   ng add @angular/fire
5. Posterior a eso seria seguir los pasos que estan en el link y hacer unas respectivas correciones:
![Ejemplo](https://github.com/user-attachments/assets/dd8908bb-ecb5-45c5-a3fb-c82cdbd86396)

## Pasos a Seguir para construir nuestra apk en android o en IOS💻

1. Añadimos el capacitor de android y de IOS
   ```bash
   ionic cap add android
   ionic cap add ios
2. Luego de añadir los capacitores construimos nuestra app
   ```bash
   ionic build
3. Comprobamos en android studio abrimos la apk
   ```bash
   ionic cap open android
4. O miramos en nuestro ordenador con ionic serve
   ```bash
   ionic serve
5. Ejecucion del Programa:
![android studio](https://github.com/user-attachments/assets/84d052dd-1e7b-4524-b1e5-4168d7f873c6)
