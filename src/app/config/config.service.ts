import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ConfigService {
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      alert(`An error occurred:, ${error.message}`);
    }else   if (error.status === 500) {
        alert(`An error occurred:, ${error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      alert(
        `Backend returned code ${error.status}, body was: ${error.message}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
