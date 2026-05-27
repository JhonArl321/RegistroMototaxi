import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



// Service
import { MototaxiService } from '../../services/mototaxi';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.html',
})

export class FormularioComponent {

  // Inyección del service
  motoService = inject(MototaxiService);
  router = inject(Router)
 

  // Variables conectadas al formulario
  nombres = '';
  apellidos = '';
  dpi = '';
  domicilio = '';
  modelo = '';
  color = '';
  seguroVida = '';

  // Código automático
  codigo = this.motoService.generarCodigo();

  // Método guardar
  async guardarMototaxi(formulario: NgForm) {

    // Limpieza de espacios
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

      // Guardar usando el service
      await this.motoService.guardarMototaxi({

        nombres: nombresLimpio,
        apellidos: apellidosLimpio,
        dpi: dpiLimpio,
        domicilio: domicilioLimpio,
        modelo: this.modelo,
        color: colorLimpio,
        seguroVida: this.seguroVida,
        codigo: this.codigo

      });

      // Mensaje éxito
      Swal.fire({
        icon: 'success',
        title: 'Mototaxi registrado',
        text: 'La información fue guardada correctamente',
        confirmButtonColor: '#4f46e5'
      });

      // Limpiar formulario
      formulario.resetForm();

      // Nuevo código automático
      this.codigo = this.motoService.generarCodigo();

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el mototaxi'
      });

    }

  }

  cancelar(){
    this.router.navigate(['/dashboard'])
   
  }

}