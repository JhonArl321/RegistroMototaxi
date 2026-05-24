import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

// Funciones necesarias para trabajar con Firestore
import {
  Firestore,
  collection,
  addDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-formulario',
  standalone: true,

  // FormsModule permite usar ngModel y formularios
  imports: [FormsModule],

  templateUrl: './formulario.html',
})

export class FormularioComponent {

  // Inyección de Firestore
  firestore = inject(Firestore);

  // Variables conectadas al formulario
  nombres = '';
  apellidos = '';
  dpi = '';
  domicilio = '';
  modelo = '';
  color = '';
  seguroVida = '';

  // Código automático generado al cargar el formulario
  codigo = this.generarCodigo();

  // Método para guardar el mototaxi
  async guardarMototaxi(formulario: NgForm) {

    // Limpieza de espacios vacíos
    const nombresLimpio = this.nombres.trim();
    const apellidosLimpio = this.apellidos.trim();
    const dpiLimpio = this.dpi.trim();
    const domicilioLimpio = this.domicilio.trim();
    const colorLimpio = this.color.trim();

    // Validación de campos vacíos
    if (
      !nombresLimpio ||
      !apellidosLimpio ||
      !dpiLimpio ||
      !domicilioLimpio ||
      !this.modelo ||
      !colorLimpio ||
      !this.seguroVida
    ) {

      // Mensaje de advertencia
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Debes completar todos los campos',
        confirmButtonColor: '#4f46e5'
      });

      return;

    }

    try {

      // Referencia a la colección de Firestore
      const referencia = collection(this.firestore, 'mototaxis');

      // Guardar documento en Firebase
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

      // Mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Mototaxi registrado',
        text: 'La información fue guardada correctamente',
        confirmButtonColor: '#4f46e5'
      });

      // Limpia visualmente el formulario
      formulario.resetForm();

      // Genera un nuevo código automático
      this.codigo = this.generarCodigo();

    } catch (error) {

      // Mostrar error en consola
      console.log(error);

      // Mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el mototaxi'
      });

    }

  }

  // Genera un código similar a una matrícula
  generarCodigo(): string {

    // Número aleatorio de 3 dígitos
    const numero = Math.floor(100 + Math.random() * 900);

    // Letras disponibles
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Generación aleatoria de letras
    const letra1 = letras[Math.floor(Math.random() * 26)];
    const letra2 = letras[Math.floor(Math.random() * 26)];
    const letra3 = letras[Math.floor(Math.random() * 26)];

    // Retorna el formato final
    return `M ${numero} ${letra1}${letra2}${letra3}`;

  }

}