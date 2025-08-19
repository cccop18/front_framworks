import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockConvenios from '../../../../assets/json/especialidades.json';
import { routes } from '../../../app.routes';
import { EspecialidadeService } from '../../../service/especialidade.service';
import { EspecialidadeListComponent } from './especialidade-list.component';
import { TestUtils } from '../../../utils/test-utils';

describe('EspecialidadeListComponent', () => {
  let component: EspecialidadeListComponent;
  let fixture: ComponentFixture<EspecialidadeListComponent>;
  let service: EspecialidadeService;

  const serviceMock = {
    consultar: jasmine.createSpy('consultar').and.returnValue(of(mockConvenios)),
    remover: jasmine.createSpy('remover').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EspecialidadeListComponent,
        RouterModule.forRoot(routes)],
      providers: [
        { provide: EspecialidadeService, useValue: serviceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspecialidadeListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EspecialidadeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método "consultar" do serviço ao iniciar', () => {
    expect(service.consultar).toHaveBeenCalled();
  });

  it('deve exibir os nomes das especialidades', () => {
    fixture.detectChanges();
    let linhas = fixture.nativeElement.querySelectorAll('table > tbody > tr');
    linhas.forEach((linha: any, index: any) => {
      const colunaPaciente = linha.cells[1];
      const textoCelula = colunaPaciente.textContent.trim();
      expect(textoCelula).toEqual(mockConvenios[index].nome);
    });
  });

  it('deve exibir o total de registros', () => {
    fixture.detectChanges();
    let totalRegistros = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(totalRegistros.textContent).toContain(mockConvenios.length);
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
      expect(component.remover).toHaveBeenCalledWith(mockConvenios[index].id);
    });
  });

  it('deve chamar o método "remover" do serviço ao remover um registro', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const id = 1;
    component.remover(id);
    expect(service.remover).toHaveBeenCalledWith(id);
  });

  it('deve ter uma rota definida para o componente', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, EspecialidadeListComponent);
    expect(rota).toBeDefined();
  });

  it('deve ter uma rota que inicia com "config"', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, EspecialidadeListComponent);
    expect(rota).toContain('config');
  });

  it('deve exibir o BarraComandosComponent', () => {
    let barraComandos = fixture.nativeElement.querySelector('app-barra-comandos');
    expect(barraComandos).toBeTruthy();
  });
});
