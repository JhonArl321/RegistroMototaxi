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

  firestore = inject(Firestore);

  // Guardar mototaxi
  async guardarMototaxi(data: UsuarioMototaxi) {

    const referencia = collection(this.firestore, 'mototaxis');

    return await addDoc(referencia, data);

  }

  // Generar código automático
  generarCodigo(): string {

    const numero = Math.floor(100 + Math.random() * 900);

    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const letra1 = letras[Math.floor(Math.random() * 26)];
    const letra2 = letras[Math.floor(Math.random() * 26)];
    const letra3 = letras[Math.floor(Math.random() * 26)];

    return `M ${numero} ${letra1}${letra2}${letra3}`;

  }

  async obtenerMototaxis(): Promise<UsuarioMototaxi[]> {

    // 1. Revisar cache
    const cache =

      typeof localStorage !== 'undefined'

        ? localStorage.getItem('mototaxis')

        : null;

    // 2. Si existe cache devolverlo rápido
    if (cache) {

      console.log('DATOS DESDE CACHE');

      // Actualizar Firebase en segundo plano
      this.actualizarCache().catch(console.error);

      return JSON.parse(cache);

    }

    // 3. Si no existe cache consultar Firebase
    return await this.actualizarCache();
  }

  //actualizar cahe
  async actualizarCache(): Promise<UsuarioMototaxi[]> {

    const mototaxisRef = collection(
      this.firestore,
      'mototaxis'
    );

    const snapshot = await getDocs(
      mototaxisRef
    );

    const datos: UsuarioMototaxi[] = snapshot.docs.map(doc => ({

      id: doc.id,

      ...(doc.data() as Omit<UsuarioMototaxi, 'id'>)

    }));

    if (typeof localStorage !== 'undefined') {

      localStorage.setItem(
        'mototaxis',
        JSON.stringify(datos)
      );

    }

    return datos;

  }

  // TOTAL MOTOTAXIS
  async totalMototaxis() {

    const mototaxis: UsuarioMototaxi[] =
      await this.obtenerMototaxis();

    return mototaxis.length;

  }

  // TOTAL CON SEGURO
  async totalConSeguro() {

    const mototaxis: UsuarioMototaxi[] =
      await this.obtenerMototaxis();

    return mototaxis.filter(
      m => m.seguroVida === "Si"
    ).length;

  }

  // TOTAL SIN SEGURO
  async totalSinSeguro() {

    const mototaxis: UsuarioMototaxi[] =
      await this.obtenerMototaxis();

    console.log(mototaxis);

    return mototaxis.filter(
      m => m.seguroVida === "No"
    ).length;

  }

  // ELIMINAR MOTOTAXI
  async eliminarMototaxi(id: string) {

    const documento = doc(
      this.firestore,
      `mototaxis/${id}`
    );

    await deleteDoc(documento);

  }

  async obtenerPorId(id: string): Promise<UsuarioMototaxi> {

    const docRef = doc(
      this.firestore,
      'mototaxis',
      id
    );

    const respuesta = await getDoc(docRef);

    return {
      id: respuesta.id,
      ...respuesta.data()
    } as UsuarioMototaxi;

  }

  async actualizarMototaxi(
    id: string,
    data: Partial<UsuarioMototaxi>
  ) {

    const documento = doc(
      this.firestore,
      `mototaxis/${id}`
    );

    await updateDoc(
      documento,
      data
    );

  }

}