import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockProfissionais from '../../../../assets/json/profissionais.json';
import { routes } from '../../../app.routes';
import { ProfissionalService } from '../../../service/profissional.service';
import { TestUtils } from '../../../utils/test-utils';
import { ProfissionalListComponent } from './profissional-list.component';

describe('ProfissionalListComponent', () => {
  let component: ProfissionalListComponent;
  let fixture: ComponentFixture<ProfissionalListComponent>;
  let service: ProfissionalService;

  const serviceMock = {
    consultar: jasmine.createSpy('consultar').and.returnValue(of(mockProfissionais)),
    remover: jasmine.createSpy('remover').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfissionalListComponent,
        RouterModule.forRoot(routes)],
      providers: [
        { provide: ProfissionalService, useValue: serviceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfissionalListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProfissionalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método "consultar" do serviço ao iniciar', () => {
    expect(service.consultar).toHaveBeenCalled();
  });

  it('deve exibir os nomes dos profissionais', () => {
    fixture.detectChanges();
    let linhas = fixture.nativeElement.querySelectorAll('table > tbody > tr');
    linhas.forEach((linha: any, index: any) => {
      const colunaPaciente = linha.cells[1];
      const textoCelula = colunaPaciente.textContent.trim();
      expect(textoCelula).toEqual(mockProfissionais[index].nome);
    });
  });

  it('deve exibir o total de registros', () => {
    fixture.detectChanges();
    let totalRegistros = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(totalRegistros.textContent).toContain(mockProfissionais.length);
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
      expect(component.remover).toHaveBeenCalledWith(mockProfissionais[index].id);
    });
  });

  it('deve chamar o método "remover" do serviço ao remover um registro', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const id = 1;
    component.remover(id);
    expect(service.remover).toHaveBeenCalledWith(id);
  });

  it('deve ter uma rota definida para o componente', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, ProfissionalListComponent);
    expect(rota).toBeDefined();
  });

  it('deve exibir o BarraComandosComponent', () => {
    let barraComandos = fixture.nativeElement.querySelector('app-barra-comandos');
    expect(barraComandos).toBeTruthy();
  });
});
