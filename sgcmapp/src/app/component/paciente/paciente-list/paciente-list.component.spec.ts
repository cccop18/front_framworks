import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockPacientes from '../../../../assets/json/pacientes.json';
import { routes } from '../../../app.routes';
import { PacienteService } from '../../../service/paciente.service';
import { TestUtils } from '../../../utils/test-utils';
import { PacienteListComponent } from './paciente-list.component';

describe('PacienteListComponent', () => {
  let component: PacienteListComponent;
  let fixture: ComponentFixture<PacienteListComponent>;
  let service: PacienteService;

  const serviceMock = {
    consultar: jasmine.createSpy('consultar').and.returnValue(of(mockPacientes)),
    remover: jasmine.createSpy('remover').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PacienteListComponent,
        RouterModule.forRoot(routes)],
      providers: [
        { provide: PacienteService, useValue: serviceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacienteListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PacienteService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método "consultar" do serviço ao iniciar', () => {
    expect(service.consultar).toHaveBeenCalled();
  });

  it('deve exibir os nomes dos pacientes', () => {
    fixture.detectChanges();
    let linhas = fixture.nativeElement.querySelectorAll('table > tbody > tr');
    expect(linhas.length).toBe(mockPacientes.length);
    linhas.forEach((linha: any, index: any) => {
      const colunaPaciente = linha.cells[1];
      const textoCelula = colunaPaciente.textContent.trim();
      expect(textoCelula).toEqual(mockPacientes[index].nome);
    });
  });

  it('deve exibir o total de registros', () => {
    fixture.detectChanges();
    let totalRegistros = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(totalRegistros.textContent).toContain(mockPacientes.length);
  });

  it('deve exibir mensagem de nenhum registro encontrado', () => {
    component.registros = [];
    fixture.detectChanges();
    let mensagem = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(mensagem.textContent).toContain('Nenhum registro encontrado');
  });

  it('deve chamar o método "remover" do componente ao clicar em "Excluir"', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'remover').and.callThrough();
    let botoes = fixture.nativeElement.querySelectorAll('a.botao.excluir') as HTMLAnchorElement[];
    botoes.forEach((botao, index) => {
      botao.click();
      expect(component.remover).toHaveBeenCalledWith(mockPacientes[index].id);
    });
  });

  it('deve chamar o método "remover" do serviço ao remover um registro', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const id = 1;
    component.remover(id);
    expect(service.remover).toHaveBeenCalledWith(id);
  });

  it('deve ter uma rota definida para o componente', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, PacienteListComponent);
    expect(rota).toBeDefined();
  });

  it('deve exibir o BarraComandosComponent', () => {
    let barraComandos = fixture.nativeElement.querySelector('app-barra-comandos');
    expect(barraComandos).toBeTruthy();
  });
});
