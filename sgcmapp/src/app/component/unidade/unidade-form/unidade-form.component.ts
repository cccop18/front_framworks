import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Unidade } from '../../../model/unidade';
import { ICrudForm } from '../../i-crud-form';
import { UnidadeService } from '../../../service/unidade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidade-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './unidade-form.component.html',
  styles: ``
})
export class UnidadeFormComponent implements ICrudForm<Unidade>, OnInit {
  private servico = inject(UnidadeService);
  private roteador = inject(Router);
  registro: Unidade = <Unidade>{};
  mensagem: string = '';

  ngOnInit(): void {}

  salvar(): void {
    this.servico.salvar(this.registro).subscribe({
      complete: () => {
        this.mensagem = 'Registro salvo com sucesso!';
        setTimeout(() => this.roteador.navigate(['/config/unidade-list']), 1500);
      }
    });
  }
}
