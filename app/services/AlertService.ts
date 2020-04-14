import swal from 'sweetalert';

class AlertService {
  static successMessage(title: string, description: string) {
    swal(title, description, 'success');
  }

  static errorMessage(title: string, description: string) {
    swal(title, description, 'error');
  }
}

export default AlertService;
