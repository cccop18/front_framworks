import { Component, inject, OnInit } from '@angular/core';
import { Profissional } from '../../../model/profissional';
import { ICrudList } from '../../i-crud-list';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { ProfissionalService } from '../../../service/profissional.service';

@Component({
  selector: 'app-profissional-list',
  imports: [CommonModule, RouterLink, BarraComandosComponent],
  templateUrl: './profissional-list.component.html',
  styles: ``
})

export class ProfissionalListComponent implements ICrudList<Profissional>, OnInit {

  private servico = inject(ProfissionalService);

  ngOnInit(): void {
    this.consultar();
  }
  
  registros: Profissional[] = [];

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
