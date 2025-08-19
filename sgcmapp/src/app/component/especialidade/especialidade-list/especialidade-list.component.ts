import { Component, OnInit } from '@angular/core';
import { EspecialidadeService } from '../../../service/especialidade.service';
import { Especialidade } from '../../../model/especialidade';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';

@Component({
  selector: 'app-especialidade-list',
  standalone: true,
  imports: [BarraComandosComponent],
  templateUrl: './especialidade-list.component.html',
  styles: ``
})
export class EspecialidadeListComponent implements OnInit {
  registros: Especialidade[] = [];

  constructor(private service: EspecialidadeService) {}

  ngOnInit(): void {
    this.service.consultar().subscribe(lista => {
      this.registros = lista;
    });
  }

  remover(id: number): void {
    if (confirm('Confirma a exclusão?')) {
      this.service.remover(id).subscribe(() => {
        alert('Registro excluído com sucesso!');
        this.service.consultar().subscribe(lista => {
          this.registros = lista;
        });
      });
    }
  }
}
