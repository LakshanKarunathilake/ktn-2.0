import swal from 'sweetalert';

class AlertService {
  static successMessage(title: string, description: string) {
    swal(title, description, 'success');
  }
}

export default AlertService;
