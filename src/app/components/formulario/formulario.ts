import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  Firestore,
  collection,
  addDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.html',
})

export class FormularioComponent {

  firestore = inject(Firestore);

  nombres = '';
  apellidos = '';
  dpi = '';
  domicilio = '';
  modelo = '';
  color = '';
  seguroVida = '';
  codigo = this.generarCodigo();

  async guardarMototaxi() {

  try {

    const referencia = collection(this.firestore, 'mototaxis');

    await addDoc(referencia, {

      nombres: this.nombres,
      apellidos: this.apellidos,
      dpi: this.dpi,
      domicilio: this.domicilio,
      modelo: this.modelo,
      color: this.color,
      seguroVida: this.seguroVida,
      codigo: this.codigo

    });

    console.log("Mototaxi registrado");

    // Limpiar formulario
    this.nombres = '';
    this.apellidos = '';
    this.dpi = '';
    this.domicilio = '';
    this.modelo = '';
    this.color = '';
    this.seguroVida = '';

    // Nuevo código automático
    this.codigo = this.generarCodigo();

    return;

  } catch (error) {

    console.log(error);

  }

}

  generarCodigo(): string {

    const numero = Math.floor(100 + Math.random() * 900);

    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const letra1 = letras[Math.floor(Math.random() * 26)];
    const letra2 = letras[Math.floor(Math.random() * 26)];
    const letra3 = letras[Math.floor(Math.random() * 26)];

    return `M ${numero} ${letra1}${letra2}${letra3}`;



  }

}