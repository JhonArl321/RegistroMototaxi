import { Injectable } from '@angular/core';

import {

  Auth,
  signInWithPopup,

  GoogleAuthProvider,
  GithubAuthProvider,

  signOut,
  onAuthStateChanged,
  User,

  // Persistencia sesión
  browserLocalPersistence,
  setPersistence,

  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile

} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  // Usuario autenticado en Firebase
  currentUser: User | null = null;

  // Datos básicos del usuario
  username = '';
  userPhoto = '';
  userEmail = '';

  constructor(private auth: Auth) {

    // Mantener la sesión activa aunque se cierre el navegador
    setPersistence(
      this.auth,
      browserLocalPersistence
    );

    // Cargar datos guardados localmente
    this.cargarUsuarioGuardado();

    // Escuchar cambios de autenticación
    onAuthStateChanged(this.auth, (usuario) => {

      if (usuario) {

        // Actualizar información del usuario
        this.actualizarDatosUsuario(usuario);

        // Guardar datos en localStorage
        this.guardarUsuarioLocal();

      } else {

        // Limpiar datos al cerrar sesión
        this.limpiarDatosUsuario();

      }

    });

  }

  // Recupera los datos almacenados en localStorage
  private cargarUsuarioGuardado(): void {

    const usuarioGuardado =
      localStorage.getItem('usuario');

    if (!usuarioGuardado) return;

    const usuario =
      JSON.parse(usuarioGuardado);

    this.username =
      usuario.username || '';

    this.userPhoto =
      usuario.userPhoto || '';

    this.userEmail =
      usuario.userEmail || '';

  }

  // Actualiza los datos del usuario autenticado
  private actualizarDatosUsuario(
    usuario: User
  ): void {

    this.currentUser = usuario;

    // GitHub utiliza screenName y Google displayName
    this.username =
      (usuario as any)
      .reloadUserInfo?.screenName ||
      usuario.displayName ||
      '';

    this.userPhoto =
      usuario.photoURL || '';

    this.userEmail =
      usuario.email || '';

  }

  // Guarda los datos del usuario en localStorage
  private guardarUsuarioLocal(): void {

    localStorage.setItem(
      'usuario',
      JSON.stringify({
        username: this.username,
        userPhoto: this.userPhoto,
        userEmail: this.userEmail
      })
    );

  }

  // Limpia los datos del usuario y elimina la caché local
  private limpiarDatosUsuario(): void {

    this.currentUser = null;
    this.username = '';
    this.userPhoto = '';
    this.userEmail = '';

    localStorage.removeItem(
      'usuario'
    );

  }

  // Iniciar sesión con Google
  loginGoogle() {

    return signInWithPopup(
      this.auth,
      new GoogleAuthProvider()
    );

  }

  // Iniciar sesión con GitHub
  loginGithub() {

    return signInWithPopup(
      this.auth,
      new GithubAuthProvider()
    );

  }

  // Registrar un nuevo usuario
  async registrarUsuario(
    nombre: string,
    email: string,
    password: string
  ) {

    const respuesta =
      await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

    // Asignar nombre al perfil
    await updateProfile(
      respuesta.user,
      {
        displayName: nombre
      }
    );

  }

  // Iniciar sesión con correo y contraseña
  loginUsuario(
    email: string,
    password: string
  ) {

    return signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

  }

  // Cerrar sesión
  logout() {

    this.limpiarDatosUsuario();

    return signOut(
      this.auth
    );

  }

}