import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { Unidade } from '../../../model/unidade';
import { ICrudList } from '../../i-crud-list';
import { UnidadeService } from '../../../service/unidade.service';

@Component({
  selector: 'app-unidade-list',
  imports: [CommonModule, RouterModule, BarraComandosComponent],
  templateUrl: './unidade-list.component.html',
  styles: ``
})

export class UnidadeListComponent implements ICrudList<Unidade>, OnInit {
  
  private servico = inject(UnidadeService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Unidade[] = [];

consultar(termoBusca?: string): void {
  this.servico.consultar(termoBusca).subscribe(
    resposta => {
      console.log('Resposta da API:', resposta);
      this.registros = resposta;
      if (resposta.length === 0) alert('Nenhum registro encontrado!');
    }
  );
}

  remover(id: number): void {
    if (confirm('Confirma a remoção do cadastro?')) {
          this.servico.remover(id).subscribe({
            complete: () => this.consultar()
          });
      }
  }

}
