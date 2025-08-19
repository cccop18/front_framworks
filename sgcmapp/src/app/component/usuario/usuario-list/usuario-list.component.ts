import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { Usuario } from '../../../model/usuario';
import { ICrudList } from '../../i-crud-list';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-usuario-list',
  imports: [CommonModule, RouterModule, BarraComandosComponent],
  templateUrl: './usuario-list.component.html',
  styles: ``
})

export class UsuarioListComponent implements ICrudList<Usuario>, OnInit {
  
  private servico = inject(UsuarioService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Usuario[] = [];

  consultar(termoBusca?: string): void {
    this.servico.consultar(termoBusca).subscribe(
      resposta => {
      this.registros = resposta;
      if (resposta.length === 0) alert('Nenhum registro encontrado!');
    });
  }

  remover(id: number): void {
    if (confirm('Confirma a remoção do cadastro?')) {
      this.servico.remover(id).subscribe({
        complete: () => this.consultar()
      });
    }
  }
}
