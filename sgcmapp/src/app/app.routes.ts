import { Routes } from '@angular/router';
import { AgendaFormComponent } from './component/agenda/agenda-form/agenda-form.component';
import { AgendaListComponent } from './component/agenda/agenda-list/agenda-list.component';
import { AtendimentoComponent } from './component/atendimento/atendimento.component';
import { ConvenioListComponent } from './component/convenio/convenio-list/convenio-list.component';
import { ConvenioFormComponent } from './component/convenio/convenio-form/convenio-form.component';
import { EspecialidadeListComponent } from './component/especialidade/especialidade-list/especialidade-list.component';
import { EspecialidadeFormComponent } from './component/especialidade/especialidade-form/especialidade-form.component';
import { PacienteListComponent } from './component/paciente/paciente-list/paciente-list.component';
import { PacienteFormComponent } from './component/paciente/paciente-form/paciente-form.component';
import { ProfissionalListComponent } from './component/profissional/profissional-list/profissional-list.component';
import { ProfissionalFormComponent } from './component/profissional/profissional-form/profissional-form.component';
import { UnidadeListComponent } from './component/unidade/unidade-list/unidade-list.component';
import { UnidadeFormComponent } from './component/unidade/unidade-form/unidade-form.component';
import { UsuarioListComponent } from './component/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './component/usuario/usuario-form/usuario-form.component';

export const routes: Routes = [
  { path: 'agenda-list', component: AgendaListComponent },
  { path: 'agenda-form', component: AgendaFormComponent },
  { path: 'atendimento', component: AtendimentoComponent },
  { path: 'convenio-list', component: ConvenioListComponent },
  { path: 'convenio-form', component: ConvenioFormComponent},
  { path: 'config/especialidade-list', component: EspecialidadeListComponent},
  { path: 'config/especialidade-form', component: EspecialidadeFormComponent},
  { path: 'paciente-list', component: PacienteListComponent},
  { path: 'paciente-form', component: PacienteFormComponent},
  { path: 'profissional-list', component: ProfissionalListComponent},
  { path: 'profissional-form', component: ProfissionalFormComponent},
  { path: 'config/unidade-list', component: UnidadeListComponent},
  { path: 'config/unidade-form', component: UnidadeFormComponent},
  { path: 'config/usuario-list', component: UsuarioListComponent},
  { path: 'config/usuario-form', component: UsuarioFormComponent}

];
