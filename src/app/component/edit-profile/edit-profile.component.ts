import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {NgIf} from '@angular/common'; // Suponiendo que tienes un servicio de autenticación


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})

export class EditProfileComponent {
  profile = {
    name: '',
    email: '',
    studentId: ''
  };

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  notification: string = '';
  error: string = '';
  isPasswordModalOpen = false;  // Controla la visibilidad del modal

  constructor(private http: HttpClient, private authService: AuthService) {
    // Obtener los datos del usuario autenticado
    const user = this.authService.getUser();
    this.profile.name = user.name;
    this.profile.email = user.email;
    this.profile.studentId = user.studentId;
  }

  submitProfile() {
    const { name } = this.profile;

    if (!name) {
      this.error = 'El nombre completo es obligatorio.';
      this.notification = '';
      return;
    }

    const updateUrl = '/api/estudiante/cambiar-nombre-estudiante';

    this.http.post(updateUrl, { name }).subscribe({
      next: () => {
        this.notification = 'Nombre de usuario actualizado exitosamente.';
        this.error = '';
      },
      error: () => {
        this.error = 'Hubo un problema al guardar los cambios.';
        this.notification = '';
      }
    });
  }

  openChangePasswordModal() {
    this.isPasswordModalOpen = true;
  }

  closeChangePasswordModal() {
    this.isPasswordModalOpen = false;
    this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  changePassword() {
    const { currentPassword, newPassword, confirmPassword } = this.passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      this.error = 'Por favor, complete todos los campos de contraseña.';
      return;
    }

    if (newPassword !== confirmPassword) {
      this.error = 'La nueva contraseña y la confirmación no coinciden.';
      return;
    }

    const changePasswordUrl = '/api/estudiante/cambiar-password';  // Ajusta la URL según el rol

    // Enviar la solicitud de cambio de contraseña al backend
    this.http.post(changePasswordUrl, { id: this.profile.studentId, nuevaPassword: newPassword }).subscribe({
      next: () => {
        this.notification = 'Contraseña actualizada exitosamente.';
        this.error = '';
        this.closeChangePasswordModal();
      },
      error: () => {
        this.error = 'Hubo un problema al cambiar la contraseña.';
        this.notification = '';
      }
    });
  }
}
