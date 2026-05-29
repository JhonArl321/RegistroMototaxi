import { Injectable, inject } from '@angular/core';
import { UsuarioMototaxi } from '../models/usuario-mototaxi';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class MototaxiService {

  private readonly COLLECTION = 'mototaxis';
  private readonly CACHE_KEY = 'mototaxis';

  firestore = inject(Firestore);

  // Guardar mototaxi
  async guardarMototaxi(
    data: UsuarioMototaxi
  ) {

    const referencia = collection(
      this.firestore,
      this.COLLECTION
    );

    return addDoc(
      referencia,
      data
    );

  }

  // Generar código automático
  generarCodigo(): string {

    const numero =
      Math.floor(100 + Math.random() * 900);

    const letras =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const letra1 =
      letras[Math.floor(Math.random() * 26)];

    const letra2 =
      letras[Math.floor(Math.random() * 26)];

    const letra3 =
      letras[Math.floor(Math.random() * 26)];

    return `M ${numero} ${letra1}${letra2}${letra3}`;

  }

  // Obtener mototaxis
  async obtenerMototaxis(): Promise<UsuarioMototaxi[]> {

    const cache =
      localStorage.getItem(
        this.CACHE_KEY
      );

    if (cache) {

      this.actualizarCache()
        .catch(console.error);

      return JSON.parse(cache);

    }

    return this.actualizarCache();

  }

  // Actualizar cache desde Firebase
  async actualizarCache():
    Promise<UsuarioMototaxi[]> {

    const referencia = collection(
      this.firestore,
      this.COLLECTION
    );

    const snapshot =
      await getDocs(referencia);

    const datos: UsuarioMototaxi[] =
      snapshot.docs.map(doc => ({

        id: doc.id,

        ...(doc.data() as Omit<
          UsuarioMototaxi,
          'id'
        >)

      }));

    localStorage.setItem(
      this.CACHE_KEY,
      JSON.stringify(datos)
    );

    return datos;

  }

  // Total de mototaxis
  async totalMototaxis() {

    const mototaxis =
      await this.obtenerMototaxis();

    return mototaxis.length;

  }

  // Total con seguro
  async totalConSeguro() {

    const mototaxis =
      await this.obtenerMototaxis();

    return mototaxis.filter(
      m => m.seguroVida === 'Si'
    ).length;

  }

  // Total sin seguro
  async totalSinSeguro() {

    const mototaxis =
      await this.obtenerMototaxis();

    return mototaxis.filter(
      m => m.seguroVida === 'No'
    ).length;

  }

  // Eliminar mototaxi
  async eliminarMototaxi(
    id: string
  ) {

    const documento = doc(
      this.firestore,
      `${this.COLLECTION}/${id}`
    );

    await deleteDoc(documento);

  }

  // Buscar por id
  async obtenerPorId(
    id: string
  ): Promise<UsuarioMototaxi> {

    const documento = doc(
      this.firestore,
      this.COLLECTION,
      id
    );

    const respuesta =
      await getDoc(documento);

    return {

      id: respuesta.id,

      ...respuesta.data()

    } as UsuarioMototaxi;

  }

  // Actualizar mototaxi
  async actualizarMototaxi(
    id: string,
    data: Partial<UsuarioMototaxi>
  ) {

    const documento = doc(
      this.firestore,
      `${this.COLLECTION}/${id}`
    );

    await updateDoc(
      documento,
      data
    );

  }

}