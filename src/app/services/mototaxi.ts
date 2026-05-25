import { Injectable, inject} from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  getDocs
 
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class MototaxiService {

  firestore = inject(Firestore);
  // Guardar mototaxi
  async guardarMototaxi(data: any) {

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


  async obtenerMototaxis() {

    // Referencia colección
    const mototaxisRef = collection(
      this.firestore,
      'mototaxis'
    );

    // Obtener documentos
    const snapshot = await getDocs(mototaxisRef);

    // Retornar arreglo
    return snapshot.docs.map(doc => ({

      id: doc.id,

      ...doc.data()

    }));

  }


  // TOTAL MOTOTAXIS
  async totalMototaxis() {

    const mototaxis: any[] =
      await this.obtenerMototaxis();

    return mototaxis.length;

  }

  // TOTAL CON SEGURO
  async totalConSeguro() {

    const mototaxis: any[] =
      await this.obtenerMototaxis();

    return mototaxis.filter(
      m => m.seguroVida === "Si"
    ).length;

  }

  // TOTAL SIN SEGURO
  async totalSinSeguro() {

    const mototaxis: any[] =
      await this.obtenerMototaxis();
      console.log(mototaxis)

    return mototaxis.filter(
      m => m.seguroVida === "No"
    ).length;

   
  }

}