<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { Paciente } from '../../../model/paciente';
import { ICrudList } from '../../i-crud-list';
>>>>>>> 7be07365c23949f63e55cf239e1703f8a3437292
import { PacienteService } from '../../../service/paciente.service';
import { Paciente } from '../../../model/paciente';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [BarraComandosComponent],
  templateUrl: './paciente-list.component.html',
  styles: ``
})
<<<<<<< HEAD
export class PacienteListComponent implements OnInit {
  registros: Paciente[] = [];

  constructor(private service: PacienteService) {}

  ngOnInit(): void {
    this.service.consultar().subscribe(lista => {
      this.registros = lista;
    });
  }

  excluir(id: number): void {
    if (confirm('Confirma a exclusão?')) {
      this.service.excluir(id).subscribe(() => {
        alert('Registro excluído com sucesso!');
        this.service.consultar().subscribe(lista => {
          this.registros = lista;
        });
      });
    }
=======

export class PacienteListComponent implements ICrudList<Paciente>, OnInit {

  private servico = inject(PacienteService);

  ngOnInit(): void {
    this.consultar();
  }

  registros: Paciente[] = [];

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
>>>>>>> 7be07365c23949f63e55cf239e1703f8a3437292
  }
}
