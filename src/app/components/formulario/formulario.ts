import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
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
async guardarMototaxi(formulario: NgForm) {

  // Eliminar espacios vacíos
  const nombresLimpio = this.nombres.trim();
  const apellidosLimpio = this.apellidos.trim();
  const dpiLimpio = this.dpi.trim();
  const domicilioLimpio = this.domicilio.trim();
  const colorLimpio = this.color.trim();

  // Validación
  if (
    !nombresLimpio ||
    !apellidosLimpio ||
    !dpiLimpio ||
    !domicilioLimpio ||
    !this.modelo ||
    !colorLimpio ||
    !this.seguroVida
  ) {

    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Debes completar todos los campos',
      confirmButtonColor: '#4f46e5'
    });

    return;

  }

  try {

    const referencia = collection(this.firestore, 'mototaxis');

    await addDoc(referencia, {

      nombres: nombresLimpio,
      apellidos: apellidosLimpio,
      dpi: dpiLimpio,
      domicilio: domicilioLimpio,
      modelo: this.modelo,
      color: colorLimpio,
      seguroVida: this.seguroVida,
      codigo: this.codigo

    });

    // Mensaje bonito
    Swal.fire({
      icon: 'success',
      title: 'Mototaxi registrado',
      text: 'La información fue guardada correctamente',
      confirmButtonColor: '#4f46e5'
    });

    // Limpiar formulario
    formulario.resetForm();

    // Nuevo código automático
    this.codigo = this.generarCodigo();

  } catch (error) {

    console.log(error);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo registrar el mototaxi'
    });

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