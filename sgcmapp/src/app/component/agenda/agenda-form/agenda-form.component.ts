import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Atendimento } from '../../../model/atendimento';
import { Convenio } from '../../../model/convenio';
import { Paciente } from '../../../model/paciente';
import { Profissional } from '../../../model/profissional';
import { AtendimentoService } from '../../../service/atendimento.service';
import { ConvenioService } from '../../../service/convenio.service';
import { PacienteService } from '../../../service/paciente.service';
import { ProfissionalService } from '../../../service/profissional.service';
import { ICrudForm } from '../../i-crud-form';

@Component({
  selector: 'app-agenda-form',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './agenda-form.component.html',
  styles: ``
})
export class AgendaFormComponent implements ICrudForm<Atendimento>, OnInit {

  private servico = inject(AtendimentoService);
  private servicoConvenio = inject(ConvenioService);
  private servicoPaciente = inject(PacienteService);
  private servicoProfissional = inject(ProfissionalService);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  ngOnInit(): void {
    this.servicoConvenio.consultarAtivos().subscribe({
      next: resposta => this.convenios = resposta
    });

    this.servicoPaciente.consultar().subscribe({
      next: resposta => this.pacientes = resposta
    });

    this.servicoProfissional.consultar().subscribe({
      next: resposta => this.profissionais = resposta
    });

    const id = this.rota.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.consultarPorId(+id).subscribe({
        next: resposta => this.registro = resposta
      });
    }
  }

  registro: Atendimento = <Atendimento>{};
  convenios: Convenio[] = [];
  pacientes: Paciente[] = [];
  profissionais: Profissional[] = [];

  compareById = (a: any, b: any) => {
    return a && b && a.id == b.id || !a && !b;
  }

  salvar(): void {
    this.servico.salvar(this.registro).subscribe({
      next: id => alert(`ID gerado: ${id}`),
      complete: () => {
        alert('Operação realizada com sucesso.');
        this.roteador.navigate(['/agenda-list']);
      }
    });
  }

}
