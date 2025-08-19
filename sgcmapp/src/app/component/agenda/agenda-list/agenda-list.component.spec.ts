import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockAtendimentos from '../../../../assets/json/atendimentos.json';
import { routes } from '../../../app.routes';
import { AtendimentoService } from '../../../service/atendimento.service';
import { TestUtils } from '../../../utils/test-utils';
import { AgendaListComponent } from './agenda-list.component';
import { Atendimento } from '../../../model/atendimento';

describe('AgendaListComponent', () => {
  let component: AgendaListComponent;
  let fixture: ComponentFixture<AgendaListComponent>;
  let service: AtendimentoService;

  const serviceMock = {
    consultar: jasmine.createSpy('consultar').and.callFake((termoBusca?: string, status?: string[]) => {
      return of(mockAtendimentos.filter(a => status?.includes(a.status)));
    }),
    remover: jasmine.createSpy('remover').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AgendaListComponent,
        RouterModule.forRoot(routes)],
      providers: [
        { provide: AtendimentoService, useValue: serviceMock }
      ]
    })
    .compileComponents();

    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-07-01'));
    
    fixture = TestBed.createComponent(AgendaListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AtendimentoService);
    fixture.detectChanges();
  });

  afterEach(function() {
      jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método "consultar" do serviço ao iniciar', () => {
    expect(service.consultar).toHaveBeenCalled();
  });

  it('deve exibir os nomes dos pacientes', () => {
    fixture.detectChanges();
    let linhas = fixture.nativeElement.querySelectorAll('table > tbody > tr') as HTMLTableRowElement[];
    expect(linhas.length).toBe(10);
    linhas.forEach(linha => {
      let nome = linha?.cells[2]?.textContent?.trim() || '';
      expect(mockAtendimentos.map(a => a.paciente.nome).includes(nome)).toBeTrue();
    });
  });

  it('deve exibir mensagem de nenhum registro encontrado', () => {
    component.registros = [];
    fixture.detectChanges();
    let mensagem = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(mensagem.textContent).toContain('Nenhum registro encontrado');
  });

  it('deve chamar o método "remover" do componente ao clicar em "Cancelar"', () => {
    spyOn(window, 'confirm').and.returnValue(true);    
    spyOn(component, 'remover').and.callThrough();
    let botoes = fixture.nativeElement.querySelectorAll('a.botao.excluir') as HTMLAnchorElement[];
    botoes.forEach(botao => {
      botao.click();
      expect(component.remover).toHaveBeenCalled();
    });
  });

  it('deve chamar o método "remover" do serviço ao cancelar um agendamento', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const id = 1;
    component.remover(id);
    expect(service.remover).toHaveBeenCalledWith(id);
  });

  it('deve ter uma rota definida para o componente', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, AgendaListComponent);
    expect(rota).toBeDefined();
  });
});
