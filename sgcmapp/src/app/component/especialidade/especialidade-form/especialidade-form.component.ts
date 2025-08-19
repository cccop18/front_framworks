import { Component, OnInit } from '@angular/core';
import { Especialidade } from '../../../model/especialidade';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EspecialidadeService } from '../../../service/especialidade.service';

@Component({
  selector: 'app-especialidade-form',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './especialidade-form.component.html',
  styles: ``
})
export class EspecialidadeFormComponent implements OnInit {
  registro: Especialidade = {} as Especialidade;

  constructor(
    private service: EspecialidadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.consultarPorId(Number(id)).subscribe(reg => {
        this.registro = reg;
      });
    }
  }

  salvar(): void {
    this.service.salvar(this.registro).subscribe(() => {
      alert('Registro salvo com sucesso!');
      this.router.navigate(['/config/especialidade-list']);
    });
  }
}
