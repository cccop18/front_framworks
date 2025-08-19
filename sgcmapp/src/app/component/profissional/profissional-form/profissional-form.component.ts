import { Component, inject, OnInit } from '@angular/core';
import { Profissional } from '../../../model/profissional';
import { ICrudForm } from '../../i-crud-form';
import { ProfissionalService } from '../../../service/profissional.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { FormsModule } from '@angular/forms';
import { UnidadeService } from '../../../service/unidade.service';
import { EspecialidadeService } from '../../../service/especialidade.service';
import { Especialidade } from '../../../model/especialidade';
import { Unidade } from '../../../model/unidade';

@Component({
  selector: 'app-profissional-form',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './profissional-form.component.html',
  styles: ``
})

export class ProfissionalFormComponent implements ICrudForm<Profissional>, OnInit {

  private servico = inject(ProfissionalService);
  private servicoUnidade = inject(UnidadeService);
  private servicoEspecialidade = inject(EspecialidadeService);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  registro: Profissional = <Profissional>{};

  ngOnInit(): void {
    this.servicoUnidade.consultar().subscribe({
      next: resposta => this.unidades = resposta
    });

    this.servicoEspecialidade.consultar().subscribe({
      next: resposta => this.especialidades = resposta
    });

    const id = this.rota.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.consultarPorId(+id).subscribe({
        next: resposta => this.registro = resposta
      });
    }
  }

  unidades: Unidade[] = [];
  especialidades: Especialidade[] = [];

  compareById = (a: any, b: any) => {
    return a && b && a.id == b.id || !a && !b;
  }

  salvar(): void {
    this.servico.salvar(this.registro).subscribe({
      next: id => {
        if (id != null) {
          alert(`ID gerado: ${id}`);
        }
      },
      complete: () => {
        alert('Operação realizada com sucesso.');
        this.roteador.navigate(['/profissional-list']);
      }
    });
  }
}
