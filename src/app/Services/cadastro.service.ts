import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private readonly API: string = `http://localhost:3000/usuarios`;

  constructor(private httpClient: HttpClient) { }

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.API, usuario);
  }
}
