import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Construction Worker App',
      login: 'Login',
      email: 'Email',
      password: 'Password',
      loginWithEmail: 'Login',
      loginWithGoogle: 'Login with Google',
      timeTracking: 'Time Tracking',
      checkIn: 'Check In',
      checkOut: 'Check Out',
      currentLocation: 'Current Location',
      yourLocation: 'Your Location',
      tasks: 'Tasks',
      pending: 'Pending',
      completed: 'Completed',
      profile: 'Profile',
      name: 'Name',
      phone: 'Phone',
      address: 'Address',
      enterName: 'Enter your name',
      enterEmail: 'Enter your email',
      enterPhone: 'Enter your phone number',
      enterAddress: 'Enter your address',
      language: 'Language',
      saveChanges: 'Save Changes',
      uploadReceipt: 'Upload Receipt',
      selectImage: 'Select Image',
      amount: 'Amount',
      description: 'Description',
      submitReceipt: 'Submit Receipt',
      viewTasks: 'View Tasks',
      editProfile: 'Edit Profile',
      todayStats: "Today's Stats",
      hoursWorked: 'Hours Worked',
      tasksCompleted: 'Tasks Completed',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido a la App de Trabajadores de Construcción',
      login: 'Iniciar Sesión',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      loginWithEmail: 'Iniciar Sesión con Correo',
      loginWithGoogle: 'Iniciar Sesión con Google',
      timeTracking: 'Control de Tiempo',
      checkIn: 'Entrada',
      checkOut: 'Salida',
      currentLocation: 'Ubicación Actual',
      yourLocation: 'Tu Ubicación',
      tasks: 'Tareas',
      pending: 'Pendiente',
      completed: 'Completada',
      profile: 'Perfil',
      name: 'Nombre',
      phone: 'Teléfono',
      address: 'Dirección',
      enterName: 'Ingrese su nombre',
      enterEmail: 'Ingrese su correo electrónico',
      enterPhone: 'Ingrese su número de teléfono',
      enterAddress: 'Ingrese su dirección',
      language: 'Idioma',
      saveChanges: 'Guardar Cambios',
      uploadReceipt: 'Subir Recibo',
      selectImage: 'Seleccionar Imagen',
      amount: 'Monto',
      description: 'Descripción',
      submitReceipt: 'Enviar Recibo',
      viewTasks: 'Ver Tareas',
      editProfile: 'Editar Perfil',
      todayStats: 'Estadísticas de Hoy',
      hoursWorked: 'Horas Trabajadas',
      tasksCompleted: 'Tareas Completadas',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

