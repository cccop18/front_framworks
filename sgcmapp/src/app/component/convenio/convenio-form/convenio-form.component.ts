import { Component, inject, OnInit } from '@angular/core';
import { Convenio } from '../../../model/convenio';
import { ICrudForm } from '../../i-crud-form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConvenioService } from '../../../service/convenio.service';

@Component({
  selector: 'app-convenio-form',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './convenio-form.component.html',
  styles: ``
})

export class ConvenioFormComponent implements ICrudForm<Convenio>, OnInit {

  private servico = inject(ConvenioService);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  registro: Convenio = <Convenio>{};

  ngOnInit(): void {    
    const id = this.rota.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.consultarPorId(+id).subscribe({
        next: resposta => this.registro = resposta
      });
    }
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
        this.roteador.navigate(['/convenio-list']);
      }
    });
  }
}
